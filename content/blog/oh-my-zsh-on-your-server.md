---
title: Oh My Zsh on your server
description: "Why i'm installing it on servers I ssh into alot."
date: 2024-07-11
image:
  src: /images/blog/improve-server-terminal.png
  alt: "desk with 3 montitors and lots of code open"

  # generated with fooocus Styles:	['Fooocus Enhance', 'SAI Fantasy Art', 'SAI Comic Book']
  # promp: image of computer on desk working on code
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: productivity
---

So recently I've been helping other teams that have a lot of EC2 instances and find my self ssh into them and running common and similar commands a lot! 

On my personal machine I have my terminal using [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) and [Spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt). My `.zshrc` is public here: https://github.com/ChrisTowles/dotfiles. 

And I take for granted all the useful behavior and commands that I use on my personal machine. Autocomplete previous commands, better syntax highlighting, and more.

When I ssh into a server I find my self grepping the history and looking for commands that I use all the time. On top of that the default prompt doesn't have the server name. So its SOOOO easy to be on the wrong server. Are you in `production` or `nonprod`.

I'm wasting time it's only a matter of time I make a change to the wrong and impact users by mistake. 

After many weeks of helping out with this I decided to try and make it easier for myself. I've started setting up `oh-my-zsh` on the servers for my profiles I'm in constantly.

## The Setup

In my case these machines are Amazon Linux 2 and I found a great starting place at [here](
https://blog.devops.dev/installing-zsh-oh-my-zsh-on-amazon-ec2-amazon-linux-2-ami-88b5fc83109)


```bash
# Installing ZSH
sudo yum -y install zsh

# Check ZSH has been installed
zsh --version

# Install "util-linux-user" because "chsh" is not available by default - https://superuser.com/a/1389273/599050
sudo yum -y install util-linux-user

# Change default shell for current user
chsh -s "$(which zsh)" $(whoami)

# Install oh-my-zsh from https://github.com/ohmyzsh/ohmyzsh#basic-installation 
# using unattended means not trying to change the default shell, and it also won't run zsh when the installation has finished.
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# some of the most useful oh my zsh plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# open new shell
sudo su - $(whoami)

```
Now modify the `~/.zshrc` to update the plugins

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

## Update the prompt to include server name

So I want to quickly know what server I'm on you can modify the prompt in `~/.zshrc` by adding this line:

```bash

SERVER_FRIENDLY_NAME=REPLACE_WITH_FRINDLY_SERVER_NAME
# add user and host to ohmyzsh terminal prompt - https://stackoverflow.com/questions/30199068/zsh-prompt-and-hostnameE
autoload -U colors && colors
PS1="%{$fg[green]%}%n%{$reset_color%}@%{$fg[cyan]%}%m %{$fg[yellow]%}%~ %{$reset_color%}%% "

```

But if the default hostname is the ec2 IP? Here is AWS advice on changing prompt without changing the DNS or hostname.

https://docs.aws.amazon.com/linux/al2/ug/set-hostname.html#set-hostname-shell


Here we'll append this to the `~/.zshrc` file.

```bash

SERVER_FRIENDLY_NAME=REPLACE_WITH_FRINDLY_SERVER_NAME
# add user and host to ohmyzsh terminal prompt - https://stackoverflow.com/questions/30199068/zsh-prompt-and-hostnameE
autoload -U colors && colors
PS1="%{$fg[green]%}%n%{$reset_color%}@%{$fg[cyan]%}$SERVER_FRIENDLY_NAME %{$fg[yellow]%}%~ %{$reset_color%}%% "

```

Here is a screenshot of what this looks like.

![](/images/blog/oh-my-zsh-server-friendly-name-in-prompt.png)


## Security

So the reasons for not doing this are mainly security. Any additional piece of code on the machine is another attack vector. So this is a judgment call. What is the impact of oh-my-zsh is compromised against the benefits. Based on the popularity of oh-my-zsh and I'm leaning towards this being safe enough to do in some environments.











