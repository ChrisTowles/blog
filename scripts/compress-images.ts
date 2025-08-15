#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, statSync, unlinkSync } from 'fs'
import { basename } from 'path'

const files = process.argv.slice(2)

if (files.length === 0) {
  console.log('✅ No PNG files to compress')
  process.exit(0)
}

function checkPngquant(): void {
  try {
    execSync('command -v pngquant', { stdio: 'ignore' })
  } catch {
    console.error('❌ pngquant not found. Please install it:')
    console.error('   sudo apt-get install pngquant -y')
    process.exit(1)
  }
}

function getFileSize(filePath: string): number {
  return statSync(filePath).size
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function compressImage(filePath: string): boolean {
  if (!existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filePath} (file not found)`)
    return false
  }

  const tempFile = filePath.replace(/\.png$/, '_temp.png')
  const originalSize = getFileSize(filePath)

  console.log(`🔄 Processing ${basename(filePath)}...`)
  console.log(`   Original size: ${formatBytes(originalSize)}`)

  try {
    // speed = 1 slow
    execSync(`pngquant --speed 1  --strip --output "${tempFile}" 256 "${filePath}"`, {
      stdio: 'ignore'
    })

    const compressedSize = getFileSize(tempFile)

    if (compressedSize < originalSize) {
      const savings = originalSize - compressedSize
      const percentSaved = Math.round((savings * 100) / originalSize)

      console.log(`   ✅ Compressed: ${formatBytes(compressedSize)} (saved ${percentSaved}%)`)

      execSync(`mv "${tempFile}" "${filePath}"`)
      execSync(`git add "${filePath}"`)

      return true
    } else {
      console.log('   ⏭️  No size improvement, keeping original')
      unlinkSync(tempFile)
      return false
    }
  } catch (ex) {
    console.error(`   ❌ Failed to compress ${basename(filePath)}`)
    console.error(ex)
    if (existsSync(tempFile)) {
      unlinkSync(tempFile)
    }
    return false
  }
}

console.log('🖼️  Compressing PNG images...')
checkPngquant()

const pngFiles = files.filter(file => file.endsWith('.png'))

if (pngFiles.length === 0) {
  console.log('✅ No PNG files to compress')
  process.exit(0)
}

console.log(`📦 Found ${pngFiles.length} PNG file(s) to process...`)

let processedCount = 0
let compressedCount = 0

for (const file of pngFiles) {
  processedCount++
  if (compressImage(file)) {
    compressedCount++
  }
}

console.log(`✅ Processed ${processedCount} files, compressed ${compressedCount}`)
