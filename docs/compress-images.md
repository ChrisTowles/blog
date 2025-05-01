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

    # Check if pngquant is installed
    if ! command -v pngquant &> /dev/null
    then
        echo "pngquant could not be found, please install it first."
        return
    fi
    
    LIST=($(find . -name '*.png' | grep .png))
    # Get all PNG files not yet committed
    # LIST=($(git status -s | cut -c4- | grep .png))
    for file in $LIST
    do
        tempfile=$(echo "$file" | sed 's/\.png/_temp.png/')
        echo "-- Processing $file... and creating $tempfile"
        du -h "$file"
        pngquant "$file" --output "$tempfile" --force
        echo "file: $file size: $(du -b "$tempfile")"
        echo "tempfile: $tempfile size: $(du -b "$tempfile")"
        # Check if the temp file is smaller
        # update for zsh
        if [ $(du -b "$tempfile" | cut -f1) -lt $(du -b "$file" | cut -f1) ]; then
        echo "  -- Replacing $file with $tempfile"
        mv "$tempfile" "$file"
        else
        echo "  -- Keeping original $file"
        rm "$tempfile"
        fi

        du -h "$file"
    done
}

```
