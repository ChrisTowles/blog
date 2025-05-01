---
title: Fire tablet and YouTube Kids
description: "Getting YouTube and YouTube Kids to work on Amazon Fire for kids"
date: 2024-07-14
image:
  src: /images/blog/youtube-kids-fire-tablet.png
  alt: "Kids holding fire tablet"

  # generated:  with fooocus Styles 'Fooocus Enhance', 'SAI Fantasy Art', 'SAI Comic Book'
  # prompt: YouTube  kids on amazon fire tablet  kids

authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: android
---



So if you have kids you likely either have android or iOS tablets.

We're all android at my house for tablets and phones. We use Amazon Fire Tables but the Amazon Fire Store is a lacking native YouTube or YouTube kids app. There are apps called that in the Fire App Store, but they're imitations! Go check the and look at the developer page for many apps. They are knockoffs and always have been. And not good ones.

## Problems

I want to limit YouTube when to a better quality of content. I don't care if its YouTube or YouTube kids.

Now if your familiar how the Amazon Kids app works you can create a profile for each kid and set apps on their profiles. The issue is you can allow the generic YouTube, but it doesn't support family profiles.

So we need to get the real Google Play apps to do this. That sounds simple but after many hours of do so It's not so straight forward.

## Solutions that DO NOT WORK or Limited

So lets talk about what doesn't work.

### Sideload an app on main profile

Sideload any app on the main profile and enable in on the kids profile.

So you can sideload apps, (we'll cover google ones, we'll get to that), and even in the Fire Kids app share it to them, once you switch to their profile the app if not installed from the Fire App Store.  You can not see it in the Fire Launcher to select it.

### Sideload YouTube App on Kids Profile

This will work for some apps but not for Google apps, because they require google place service and play store to run.

You can install the Google Play Store and services on the main profile. The best guide I've seen is: [how-to-install-the-google-play-store-on-your-amazon-fire-tablet](https://www.howtogeek.com/232726/how-to-install-the-google-play-store-on-your-amazon-fire-tablet/#if-you-39-re-using-a-fire-7-2022-12th-gen-or-newer)

Even if you follow that guide, it works on the Main Tablet profile but when on the kids profile, its lets you install `com.google.android.gsf.login`, `com.google.android.gsf`, `com.google.android.gms` but fails to install Play Store aka. `com.android.vending` when on child profile.

Also, I'll add that information is as of 2024-07-14 and Amazon tablets 10th and 11th gen. Amazon is notorious for updating them over the wire to disable features on a product you paid for.

So what can we do?

## Best solution So Far

Looking for alternatives, I found mrhaydendp's [Fire Tools](https://github.com/mrhaydendp/Fire-Tools).

Its a nice python tool that will use the ADB tool to modify the tablet. Its not perfect solution but its good enough for me.

The end result will be as such:

- Only the main profile will exist on the tablet.
- It won't have Fire App Store
- We can install Google Play Store and services,
  - followed by YouTube Kids and such.
- We'll hide anything else.

## Fire Tools Instructions

We enable the developer mode, then the instructions at <https://github.com/mrhaydendp/Fire-Tools>

Will use it to remove tons of the Amazon Apps, or as it says, `Debloat`.

> Note I always use [pyenv](https://github.com/pyenv/pyenv) for my python environments.

```bash
# move to a temp folder 

curl -LO https://github.com/mrhaydendp/fire-tools/releases/latest/download/Fire-Tools.zip
unzip Fire-Tools.zip && rm Fire-Tools.zip
cd Fire-Tools
pyenv virtualenv 3.12.4 Fire-Tools

# use a virtual env
pyenv local Fire-Tools
pyenv shell Fire-Tools

# install the requirements in that virtual env
pip install -r requirements.txt
python main.py
```

The UI is pretty self-explanatory.

![fire-tools](./images/blog/fire-tools-ui.png)

I won't cover how to have ADB setup but here are my notes on setting up [Android Studio on Linux](https://github.com/ChrisTowles/dotfiles/blob/main/docs/apps/andriod-studio.md) which pretty awful for 2024, honestly.

Anyway, the tool is pretty amazing.

I ran the following:

- Ran `Debloat`
- Install Google Play Services
- set custom DNS to use Cloudflare
- Installed the `Lawnchair` Launch
  - used that to hide apps like "app store" (not it wouldn't work as the app wasn't registered but still nice to hide.)

## Conclusion

I'll follow up later, but this is a good start. During the summer I take the kids to the pool every day and their mother play's games but, there is still too much tablet time! Here's hoping that at least the quality of videos is better with these hacks!

To all the other parents out there. Best of luck!
