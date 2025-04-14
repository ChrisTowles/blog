---
title: VScode Markdown Pase Image
description: "Vscode extension to make pasting pictures in markdown easier"
image:
  src: /images/blog/vscode-paste-image-markdown-logon.png
  alt: "Logo of chris-towles.markdown-paste-image"

type: vscode-extension

---

## Links

- GitHub - <https://github.com/ChrisTowles/vscode-markdown-paste-image>
- Marketplace - <https://marketplace.visualstudio.com/items?itemName=chris-towles.markdown-paste-image>


## Why?
I write a lot of Markdown! However, one of the few things easier to do in Word Or Google Drive is to include pictures. 

With Markdown, you paste your image from clipboard, but then you have to rename the file, move to correct folder, and then fix the markdown path to it. This extension makes that process a lot easier. It will prompt you for the image name, and then automatically put the image in the correct place. 

This project started after issues with [mushan.vscode-paste-image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image). I looked for an alternative and finding out that it looked like there were half a [dozen copies](https://marketplace.visualstudio.com/search?term=image%20paste%20markdown&target=VSCode&category=Other&sortBy=Relevance) and most were forks, or no longer maintained. None of them had tests!

I decided to use [Anthony Fu](https://github.com/antfu)'s repo for [vscode-smart-clicks](https://github.com/antfu/vscode-smart-clicks) as a starting point. And then build from there to have the features that I wanted.



 
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


## Conclusion

If you haven't looks at what goes into VS Code extensions, you should. It's pretty easy to do, and it's a good way to learn. I use this extension every day and its in all my work repos as well!