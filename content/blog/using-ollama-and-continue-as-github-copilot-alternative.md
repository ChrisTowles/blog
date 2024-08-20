---
title: Using Ollama and Continue as GitHub Copilot alternative
description: "Guide on how Ollama and Continue can serve as an alternative to GitHub Copilot"
date: 2024-07-23
image:
  src: /images/blog/ollama-and-continue.png
  alt: "A llama looking at a screen with code on it"
 
  # generated:  with fooocus Styles 'Fooocus Enhance', 'SAI Fantasy Art', 'SAI Comic Book'
  # prompt: A llama coding and looking at monitor with code on it
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: AI
    #- Ollama
    #- LLM
    #- AI
---

Unless you've just awoken from a comma, you've likely tried using an LLM in your IDE.

Some hate it and others love it.

You likely use [GitHub Copilot](https://github.com/features/copilot) for your coding needs, and maybe even [Code Whisperer](https://docs.aws.amazon.com/codewhisperer/latest/userguide/whisper-legacy.html) if you're an AWS user. But what if you can't afford it or your company doesn't permit the use of these services? Because to be clear, it's sending a copy of your text and code to them for processing, and they are using your data to train their models.

Anyway, back on topic...

Due to that limitation at work I've been using [Ollama](https://ollama.com/) and [Continue](https://www.continue.dev/) as alternatives to Copilot, which has been working pretty well so far!

## Ollama - Run a Local LLM

If you haven't heard of it, [Ollama](https://ollama.com/) is an open source alternative to GPT models like ChatGPT, but with a focus on privacy and control. It's designed to run locally (or privately) without sending your data to third parties. Woot!

After installing Ollama, you can run a local instance of an LLM and interact with it through your terminal or IDE plugins.

For this guide lets install a for prompting and then one for autocompletion.

### Pull the Models

First of all models are changing constantly, so you need to make sure that your models are up-to-date. And how much GPU and memory you have on your machine.

As of writing this guide, `llama3.1` just came out is and great. But check the following for models:

- <https://ollama.com/library>
- <https://docs.continue.dev/setup/select-model#chat> for the latest models available.

```bash
ollama pull llama3.1:8b
```

For autocompletion, `deepseek-coder-v2` is a great model, but check <https://docs.continue.dev/setup/select-model#autocomplete> to see if there are any updates or new models available.

```bash
ollama pull deepseek-coder-v2:16b
```

![ollama-pull-llama-3-1](/images/blog/ollama-pull-llama-3-1.png)

Once the models are downloaded, you can run them locally:

```bash
ollama run llama3.1:8b
```

Next well wire up VS Code with the continue extension to use the models for autocompletion and prompting.

## Continue - LLM Extension for VS Code

Install Continue Extension from the VS Code marketplace.

<https://marketplace.visualstudio.com/items?itemName=Continue.continue>

Once we'll modify its configuration to use the models we just downloaded.

```bash
code ~/.continue/config.json
```

Add the following two entries into your `~/.continue/config.json` file:

```json
{
  "models": [
    {
      "title": "Llama 3.1:8b",
      "provider": "ollama",
      "model": "llama3.1:8b"
    },
    // .....
  "tabAutocompleteModel": {
    "title": "Starcoder deepseek-coder-v2:16b",
    "provider": "ollama",
    "model": "deepseek-coder-v2:16b"
  },
}

```

> Note: The config file does not support comments, make sure to add the correct JSON format.

Now lets restart VS Code and try out the new configuration!

## Try It Out

On the activity bar, click the Continue icon and at the bottom of the prompt, select the `llama3.1:8b` model from the dropdown menu. Then, try typing a prompt and see if you get better suggestions!

![Continue-extension-prompt-example](/images/blog/Continue-extension-prompt-example-vscode.png)

Now edit any file and start typing to see if the autocompletion works with your `Starcoder deepseek-coder-v2:16b` model!

## Conclusion

Congratulations, you've successfully integrated a custom LLM into VS Code using Continue Extension. This setup is running the LLM locally and for free!
