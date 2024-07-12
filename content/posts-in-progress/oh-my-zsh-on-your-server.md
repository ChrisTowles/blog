---
title: Oh My Zsh on your server
description: "Reasons I want to use Airflow for a Proof of Concept near Serverless ELT"
date: 2024-07-10
image:
  src: /images/blog/airflow-part-1-blog-image.png
  alt: "A laptop with a data analytics"
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: airflow
---


So recently I've been helping other teams that have a lot of EC2 instances and find my self sshing alot.

after Many weeks of helping out with this I decided to try and make it easier for myself. I've started settting up oh-my-zsh on the servers for my profiles

Starting with.

https://blog.devops.dev/installing-zsh-oh-my-zsh-on-amazon-ec2-amazon-linux-2-ami-88b5fc83109

```bash
 Installing ZSH
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

# And then add them to "~/.zshrc" file
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)


