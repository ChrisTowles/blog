---
title: Why using Conventional commits is useful
description: "Helping everyone to understand the commit history and its purpose"
date: 2024-06-23
image:
  src: /images/blog/conventional-commits.png
  # source: https://www.pexels.com/photo/photography-of-macbook-half-opened-on-white-wooden-surface-633409/
  alt: "A laptop with a dark matter theme"
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: Productivity
---

As a developer, you're probably no stranger to the world of version control systems like Git. But even if you're well-versed in the basics of Git, using [conventional commits](https://www.conventionalcommits.org/) can be a game-changer when it comes to communicating your peers and yourself.

In this post, we'll take a deep dive into what conventional commits are, why they're important, and how to use them effectively. So, let's get started!

## Step 1: What Are Conventional Commits?

A conventional commit is a type of commit message that follows a specific format, making it easy for others (and yourself) to understand the purpose and scope of each change.

### Why Are Conventional Commits Important?

Using conventional commits has several benefits:

- **Better collaboration**: Conventional commits help team members work together more effectively, as everyone knows what to expect from a particular type of commit.
- **Better release management:** When you use conventional commits, it's easier to generate a changelog that reflects the changes in your release.
  - Not a requirement personal and often web of projects, But many OSS projects need to generate a changelog.


## Step 2: Choose Your Commit Type

When writing your commit message, choose one of the following types:

- `fix:` For fixing bugs or resolving issues
 - `fix(item):` calling out which item was fixed
- `feat:` For adding new features or functionality
  - `feat(item):` For calling out which feature
- `docs:` For updating documentation or improving readability
- `chore::` For updating documentation or improving readability


I tend to use [conventional commits](https://www.conventionalcommits.org/) styles for my commits. But not enforced, just manual best effort. However, some repos have strict enforcement to generate the changelog from the commits. I'll dig into that below.


## Step 3: Write Your Commit Message

When writing your commit message, follow these best practices:

- **Be concise:** Keep your commit message short and to the point.
- **Use present tense:** Instead of saying "fixed," say "fix."
- **Include relevant details:** Add context or explanations where necessary.

**Example commit message:** `fix: Update README.md to include new feature`

![](/images/blog/conventional-commit-example-ui-pro.png)

## Step 4: Make It a Habit

At first, it may seem like a lot of work to write a commit message. But you'll find that writing good commit messages becomes easier as you get used doing it. Also, I also recommend committing more often.

I often teach people to think about making commits like save checkpoints in a video game. When you beat a boss, or complete a level, it creates a save point. Do the same with your commits. It makes it much easier to review and track down issues compared to a three-day coding bender where half the repo is changed in a single commit. 




## Strictly enforce conventional commits

Many open source projects use conventional commits, [vite](https://github.com/vitejs/vite/blob/main/.github/commit-convention.md) for example and some even enforce it via tools like [commitlint](https://github.com/conventional-changelog/commitlint). 

This is be great for a couple of reasons. The standard makes it easier to generate release notes and changelog from the commit messages.

In those cases I use the [commitizen](https://github.com/commitizen/cz-cli) tool to enforce the conventional commits.


### Install

```bash
## Install
pnpm install -g commitizen
pnpm install -g cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### Usage

```bash
## Usage
git cz

```

![](/images/blog/conventional-commits.png)

But be sure to review the rules for the repository your contributing too. 

## Conclusion

Using conventional commits doesn't take much time. I've found it makes it easier to come up with commit messages. And it improves your code's readability and enhances collaboration.  It's an easy habit to get into, and you'll find it a requirement for many open source projects.


Might as well start doing it everywhere.