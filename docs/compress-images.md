# Compress images


```bash
# Install Image Optimizers
sudo apt-get install pngquant -y

# Run the following command to optimize all PNG files in your project:
find . -name '*.png' -exec pngquant --ext .png --force 256 {} \;


## Check file sizes
cd public/images
du * | sort -nr

## Compress all PNG files in repo not yet checked in
png-compress() {
  # Get all PNG files not yet committed
  LIST=($(find . -name '*.png' | grep .png))
  for file in $LIST
  do
    echo "-- Processing $file..."
    du -h "$file"
    pngquant "$file" --ext .png --force
    du -h "$file"
  done
}

```
