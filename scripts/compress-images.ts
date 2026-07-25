#!/usr/bin/env -S pnpx tsx
import 'zx/globals';
import { consola } from 'consola';

const files = process.argv.slice(2);

if (files.length === 0) {
  consola.success('No PNG files to compress');
  process.exit(0);
}

async function checkPngquant(): Promise<void> {
  try {
    await $`command -v pngquant`.quiet();
  } catch {
    consola.error('pngquant not found. Install it with: sudo apt-get install pngquant -y');
    process.exit(1);
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

async function compressImage(filePath: string): Promise<boolean> {
  if (!fs.existsSync(filePath)) {
    consola.warn(`Skipping ${filePath} (file not found)`);
    return false;
  }

  const tempFile = filePath.replace(/\.png$/, '_temp.png');
  const originalSize = fs.statSync(filePath).size;

  consola.start(`Processing ${path.basename(filePath)} (${formatBytes(originalSize)})`);

  try {
    // speed = 1 slow
    await $`pngquant --speed 1 --strip --output ${tempFile} 256 ${filePath}`.quiet();

    const compressedSize = fs.statSync(tempFile).size;

    if (compressedSize < originalSize) {
      const savings = originalSize - compressedSize;
      const percentSaved = Math.round((savings * 100) / originalSize);

      consola.success(`Compressed to ${formatBytes(compressedSize)} (saved ${percentSaved}%)`);

      await $`mv ${tempFile} ${filePath}`;
      await $`git add ${filePath}`;

      return true;
    } else {
      consola.info('No size improvement, keeping original');
      fs.unlinkSync(tempFile);
      return false;
    }
  } catch (ex) {
    consola.error(`Failed to compress ${path.basename(filePath)}`, ex);
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    return false;
  }
}

async function main() {
  consola.start('Compressing PNG images...');
  await checkPngquant();

  const pngFiles = files.filter((file) => file.endsWith('.png'));

  if (pngFiles.length === 0) {
    consola.success('No PNG files to compress');
    process.exit(0);
  }

  consola.info(`Found ${pngFiles.length} PNG file(s) to process`);

  let processedCount = 0;
  let compressedCount = 0;

  for (const file of pngFiles) {
    processedCount++;
    if (await compressImage(file)) {
      compressedCount++;
    }
  }

  consola.success(`Processed ${processedCount} files, compressed ${compressedCount}`);
}

main().catch((err) => {
  consola.error('Error:', err);
  process.exit(1);
});
