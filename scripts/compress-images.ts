#!/usr/bin/env -S pnpx tsx
import 'zx/globals';

const files = process.argv.slice(2);

if (files.length === 0) {
  console.log(chalk.green('✅ No PNG files to compress'));
  process.exit(0);
}

async function checkPngquant(): Promise<void> {
  try {
    await $`command -v pngquant`.quiet();
  } catch {
    console.error(chalk.red('❌ pngquant not found. Please install it:'));
    console.error('   sudo apt-get install pngquant -y');
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
    console.log(chalk.yellow(`⚠️  Skipping ${filePath} (file not found)`));
    return false;
  }

  const tempFile = filePath.replace(/\.png$/, '_temp.png');
  const originalSize = fs.statSync(filePath).size;

  console.log(chalk.blue(`🔄 Processing ${path.basename(filePath)}...`));
  console.log(`   Original size: ${formatBytes(originalSize)}`);

  try {
    // speed = 1 slow
    await $`pngquant --speed 1 --strip --output ${tempFile} 256 ${filePath}`.quiet();

    const compressedSize = fs.statSync(tempFile).size;

    if (compressedSize < originalSize) {
      const savings = originalSize - compressedSize;
      const percentSaved = Math.round((savings * 100) / originalSize);

      console.log(
        chalk.green(`   ✅ Compressed: ${formatBytes(compressedSize)} (saved ${percentSaved}%)`),
      );

      await $`mv ${tempFile} ${filePath}`;
      await $`git add ${filePath}`;

      return true;
    } else {
      console.log(chalk.gray('   ⏭️  No size improvement, keeping original'));
      fs.unlinkSync(tempFile);
      return false;
    }
  } catch (ex) {
    console.error(chalk.red(`   ❌ Failed to compress ${path.basename(filePath)}`));
    console.error(ex);
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    return false;
  }
}

async function main() {
  console.log(chalk.yellow('🖼️  Compressing PNG images...'));
  await checkPngquant();

  const pngFiles = files.filter((file) => file.endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log(chalk.green('✅ No PNG files to compress'));
    process.exit(0);
  }

  console.log(chalk.blue(`📦 Found ${pngFiles.length} PNG file(s) to process...`));

  let processedCount = 0;
  let compressedCount = 0;

  for (const file of pngFiles) {
    processedCount++;
    if (await compressImage(file)) {
      compressedCount++;
    }
  }

  console.log(chalk.green(`✅ Processed ${processedCount} files, compressed ${compressedCount}`));
}

main().catch((err) => {
  console.error(chalk.red('❌ Error:'), err);
  process.exit(1);
});
