#!/usr/bin/env python3
"""
Find uncommitted blog posts and analyze their image references.
Outputs JSON with issues found and suggested fixes.
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path


def get_uncommitted_markdown_files(content_dir: str) -> list[str]:
    """Get markdown files that are new or modified (uncommitted)."""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            text=True,
            check=True,
        )
    except subprocess.CalledProcessError:
        return []

    files = []
    for line in result.stdout.strip().split("\n"):
        if not line:
            continue
        # Status is first 2 chars, then space, then path
        status = line[:2]
        filepath = line[3:].strip().strip('"')

        # Handle renamed files (R status shows old -> new)
        if " -> " in filepath:
            filepath = filepath.split(" -> ")[1]

        if filepath.endswith(".md") and content_dir in filepath:
            # Check if file exists (not deleted)
            if os.path.exists(filepath):
                files.append(filepath)

    return files


def extract_image_references(md_path: str) -> list[dict]:
    """Extract all image references from markdown file."""
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    images = []
    # Match ![alt](path) pattern
    pattern = r"!\[([^\]]*)\]\(([^)]+)\)"
    for match in re.finditer(pattern, content):
        alt_text = match.group(1)
        img_path = match.group(2)
        line_num = content[: match.start()].count("\n") + 1
        images.append(
            {
                "alt_text": alt_text,
                "path": img_path,
                "line": line_num,
                "match": match.group(0),
            }
        )

    # Also check frontmatter image.src (handles YAML like image:\n  src: /path)
    frontmatter_match = re.search(
        r"^---\s*\n(.*?)\n---", content, re.DOTALL | re.MULTILINE
    )
    if frontmatter_match:
        fm = frontmatter_match.group(1)
        # Match src: followed by actual path (not empty or just whitespace)
        src_match = re.search(r"^\s*src:\s*(/[^\s]+|[^\s:]+\.[a-z]+)", fm, re.MULTILINE)
        if src_match:
            src_value = src_match.group(1).strip()
            images.append(
                {
                    "alt_text": "frontmatter",
                    "path": src_value,
                    "line": content[: frontmatter_match.start()].count("\n")
                    + fm[: src_match.start()].count("\n")
                    + 2,
                    "match": f"src: {src_value}",
                    "is_frontmatter": True,
                }
            )

    return images


def check_image_exists(img_path: str, md_path: str, public_dir: str) -> dict:
    """Check if image exists and return status."""
    md_dir = os.path.dirname(md_path)

    # Determine actual filesystem path
    if img_path.startswith("/"):
        # Absolute path from public dir
        actual_path = os.path.join(public_dir, img_path.lstrip("/"))
    elif img_path.startswith("./"):
        # Explicit relative
        actual_path = os.path.join(md_dir, img_path[2:])
    elif img_path.startswith("http://") or img_path.startswith("https://"):
        # External URL - skip
        return {"exists": True, "type": "external", "path": img_path}
    else:
        # Relative path
        actual_path = os.path.join(md_dir, img_path)

    exists = os.path.exists(actual_path)
    return {
        "exists": exists,
        "type": "local",
        "resolved_path": actual_path,
        "original_path": img_path,
    }


def suggest_fix(img_info: dict, md_path: str, public_images_dir: str) -> dict | None:
    """Suggest fixes for image issues."""
    suggestions = []

    # Issue: Generic filename like image.png
    if re.match(r"^image(-\d+)?\.png$", os.path.basename(img_info["path"])):
        # Extract date and slug from md filename for better naming
        md_name = os.path.basename(md_path)
        date_match = re.match(r"(\d{8})\.?(.+)?\.md$", md_name)
        date_prefix = date_match.group(1) if date_match else ""
        slug = date_match.group(2) if date_match and date_match.group(2) else "post"
        # Clean slug: remove common prefixes, keep short
        slug = slug.replace(".", "-").split("-")[0][:20]

        # Suggest moving to public/images/blog with better name
        old_name = os.path.basename(img_info["path"])
        new_name = f"{date_prefix}-{slug}-{old_name}" if date_prefix else old_name
        new_path = f"/images/blog/{new_name}"

        suggestions.append(
            {
                "type": "rename_and_move",
                "reason": "Generic filename should be descriptive and in /images/blog/",
                "old_path": img_info["path"],
                "new_path": new_path,
                "file_move": {
                    "from": img_info.get("resolved_path", ""),
                    "to": os.path.join(public_images_dir, new_name),
                },
            }
        )

    # Issue: Alt text is generic or empty
    if img_info.get("alt_text") in ["", "alt text", "image"]:
        suggestions.append(
            {"type": "improve_alt_text", "reason": "Alt text should be descriptive"}
        )

    # Issue: Image doesn't exist
    if not img_info.get("exists", True):
        suggestions.append(
            {"type": "missing_image", "reason": f"Image not found: {img_info['path']}"}
        )

    return suggestions if suggestions else None


def analyze_post(
    md_path: str, public_dir: str, public_images_dir: str
) -> dict:
    """Analyze a single post for image issues."""
    images = extract_image_references(md_path)
    issues = []

    for img in images:
        status = check_image_exists(img["path"], md_path, public_dir)
        img.update(status)

        suggestions = suggest_fix(img, md_path, public_images_dir)
        if suggestions:
            issues.append(
                {
                    "image": img,
                    "suggestions": suggestions,
                }
            )

    return {"file": md_path, "total_images": len(images), "issues": issues}


def main():
    parser = argparse.ArgumentParser(description="Fix blog post images")
    parser.add_argument(
        "--content-dir",
        default="packages/blog/content",
        help="Content directory path",
    )
    parser.add_argument(
        "--public-dir",
        default="packages/blog/public",
        help="Public directory path",
    )
    parser.add_argument(
        "--public-images-dir",
        default="packages/blog/public/images/blog",
        help="Public images directory",
    )
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    uncommitted = get_uncommitted_markdown_files(args.content_dir)

    if not uncommitted:
        if args.json:
            print(json.dumps({"files": [], "message": "No uncommitted markdown files"}))
        else:
            print("No uncommitted markdown files found")
        return

    results = []
    for md_path in uncommitted:
        result = analyze_post(md_path, args.public_dir, args.public_images_dir)
        results.append(result)

    if args.json:
        print(json.dumps({"files": results}, indent=2))
    else:
        for r in results:
            print(f"\n{r['file']}: {r['total_images']} images, {len(r['issues'])} issues")
            for issue in r["issues"]:
                img = issue["image"]
                print(f"  Line {img['line']}: {img['match']}")
                for s in issue["suggestions"]:
                    print(f"    -> {s['type']}: {s['reason']}")
                    if s.get("new_path"):
                        print(f"       Suggested: {s['new_path']}")


if __name__ == "__main__":
    main()
