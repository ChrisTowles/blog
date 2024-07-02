---
title: VScode Markdown Pase Image
description: "Vscode extension to make pasting pictures in markdown easier"
image:
  src: /images/blog/vscode-paste-image-markdown-logon.png
  # source: https://www.pexels.com/photo/photography-of-macbook-half-opened-on-white-wooden-surface-633409/
  alt: "screen shot of Right Angle Triangle Solver App"

type: vscode-extension

---

I write alot markdown. And one of the few things easier to do in Word, Or Google Drive is add pictures. 

You paste your image from clipboard but then you have to rename, the file, move to where its hosted, etc....



So I wrote a small extension for VSCode. 

- Github - <https://github.com/ChrisTowles/vscode-markdown-paste-image>
- Marketplace - <https://marketplace.visualstudio.com/items?itemName=chris-towles.markdown-paste-image>
 
## Installation

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install chris-towles.markdown-paste-image
```

## Features

- Paste image from clipboard into Markdown
- Prompts for the file name or uses the selected text as the file name.
- Save clipboard image as PNG file and insert image markdown.
- Configurable to how to name the file and where to save.


## Why

There are other Extensions that had this feature, but they were not maintained, had bugs, or had tons of features I didn't want. So here is a simple extension that does one thing and one thing only and does it with tests! 


