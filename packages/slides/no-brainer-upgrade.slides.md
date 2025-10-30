---
# theme: seriph

theme: default
background: https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2070
highlighter: shiki

title: "Why You Should Use the Latest AI Models"

info: |
  ## Staying Current with AI Models
  Better performance, same cost, proven ROI
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 10min
---

<div class="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />

<div class="relative z-10">

# 🚀 Why You Should Use the Latest AI Models

## The Case for Staying Current

<div class="text-sm opacity-75 mt-4">
How regular model upgrades deliver exponential improvements at no extra cost
</div>

</div>

<!--
Opening hook: Everyone knows AI is improving rapidly, Not alot staying current with the latest models. I wanted to take a few mintues to show you why you should.


-->

---
layout: center
class: text-center
---

# How do we know if a new model is better?

<v-clicks>

<div class="text-2xl mt-10 opacity-90">

When a new model releases, how do we decide if we should upgrade?

</div>

<div class="text-2xl mt-8 opacity-90">

You can't just <span class="text-red-400">**vibe check**</span> it 🤷

</div>

<div class="text-2xl mt-8 opacity-90">

You can't rely on <span class="text-orange-400">**gut feelings**</span> 🎲

</div>

<div class="text-3xl mt-12 text-green-400 font-bold">

You need a <span class="text-yellow-400">objective</span> way to <span class="text-cyan-400">compare</span>
</div>

<div class="text-2xl mt-10 opacity-75">
That means <span class="text-purple-400">📈 Benchmarks</span> and <span class="text-cyan-400">📊 Evals</span> 

</div>

</v-clicks>

<!--

- how do you know if a new model is better?
- **vibe check** aka manual testing
- **gut feelings** aka marketing claims

- Nope we need compare, with something objective, that means benchmarks and evals
- 
- so what type?
-->

---

# Coding Tasks are the Gold Standard

<div class="grid grid-cols-2 gap-8 mt-12 text-lg">

<div v-click class="space-y-4">

### 🎯 Objectively Measurable

<div class="space-y-2 mt-6">

- <span class="text-green-400">✅ Works</span> or <span class="text-red-400">❌ doesn't</span>
- Tests pass or fail
- <span class="text-cyan-400 font-bold">Zero ambiguity</span>
- No tricks allowed

</div>

</div>

<div v-click class="space-y-2">

### 🤔 Other Tasks Fail

<div class="space-y-3 mt-6">

- <span class="opacity-50">"Product review"</span> - Sounds good, means nothing
- <span class="opacity-50">"Summarize doc"</span> - Hard to measure
- <span class="opacity-50">"Marketing copy"</span> - Persuasive ≠ correct

</div>

</div>

</div>

<!--
-  the industry has focused around coding benchmarks
-  Why coding? well two big reasons
 -  Code either works or doesn't.
 -   Compare that with "write marketing copy." we've all seen product reviews that sound good but are meaningless.
 -   it also shows real understanding. you can't cheat when when the compiler doesn't care about buzzwords. it forces the model to understand requirements, architecture, edge cases.
-->

---

# [SWE-bench](https://www.swebench.com/)
## Real-World Coding Problems


**What it measures:**
- Popular GitHub repositories
- Real GitHub issues
- Tests ability to understand, plan, and fix actual software bugs
- Industry-standard for measuring coding capability

## [The Dataset](https://www.swebench.com/original.html)
They collected 2,294 task instances by crawling Pull Requests and Issues from 12 popular Python repositories. Each instance is based on a pull request that (1) is associated with an issue, and (2) modified 1+ testing related files.


<!-- 
This a the benchmark you'll see in every press release about any new model comes out.

These aren't hypothetical problems or toy examples, these are popular github repos with complex structure and tech stacks. 


Now obviously I'll add that I'm sure that some of the model providers train on the data set. Anthropic says it actually tries really hard not to do this because those shortcuts harm long term progress of the models.

lets look at the current scores over time. 

-->



---
transition: fade
---



<img src="/latest-models/images/llm-evolution-0.png" class="w-full h-auto" />

<!-- zero means you've never even heard of code before-->


---
transition: fade
---


<img src="/latest-models/images/llm-evolution-1.png" class="w-full h-auto" />

<!-- at 3% this GPT 3.5 came out 3 years ago, and the world lost its mind!-->

---
transition: fade
---

<img src="/latest-models/images/llm-evolution-2.png" class="w-full h-auto" />

<!-- at 20% this is first day intern -->


---
transition: fade
---


<img src="/latest-models/images/llm-evolution-3.png" class="w-full h-auto" />

<!-- huge jump here with fine tuning, its now solving a third of the problems -->


---
transition: fade
---

<img src="/latest-models/images/llm-evolution-4.png" class="w-full h-auto" />

<!-- 3.7 is out, it passed the half way mark, its a dev you can give real work to and it can solve half of them. -->


---
transition: fade
---


<img src="/latest-models/images/llm-evolution-5.png" class="w-full h-auto" />

<!-- 4 comes out, just a few months later, its up to 70%, and can oneshot some real world problems.  -->


---
transition: fade
---

<img src="/latest-models/images/llm-evolution-6.png" class="w-full h-auto" />
<!-- 
- Here we are today, just a few more months later, at    80% this is arguably better than I am, and for sure alot faster. 
- 
- How much does that improvement cost us to use?
-->

---
layout: two-cols
---

# What we pay per Model

<div class="text-6xl mt-10">
💰 $3 / $15
</div>

<div class="text-2xl mt-5 opacity-75">
Claude 3.5 Sonnet
</div>

::right::

<div class="mt-22"></div>

<v-click>
<div class="text-6xl mt-10">
💰 $3 / $15
</div>



<div class="text-2xl mt-5 opacity-75">
Claude 4.5 Sonnet
</div>

<div class="text-3xl mt-10 text-green-400">
~50+% better performance
</div>

</v-click>

<!--
- so 3.5 is still commonly used, Pretty cheap right. it is being deprecated in Dec, So you have to get off of it soon anyway.
- well 4.5 is the same price.
-->

---

# The Easiest Performance Win

<div class="text-2xl mt-10">

With new models releasing regularly, the highest-leverage improvement isn't:

</div>

<v-clicks>

- ❌ Rewriting your prompts
- ❌ Fine-tuning a custom model
- ❌ Adding more RAG context
- ❌ Implementing complex workflows

<div class="text-3xl mt-10 text-green-400">

✅ **Just use the latest model**

</div>

</v-clicks>

<v-click>

<div class="text-xl mt-10 opacity-75">

One parameter change. Huge performance boost. Same cost.

</div>

</v-click>

<!--
This is the easiest win you can get.
- you can and should improve your prompt,
- you can and should add more context,
- you can and should build better workflows,
- but all of those time consuming efforts deliver far less impact than just switching to the latest model.
-->


---

# Switching Models: One Line of Code

```python {all|5}
import boto3
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='us.anthropic.claude-3-5-sonnet-20241022-v2:0',  # Old model
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Hello!"}]
    })
)
```


---
transition: fade
---


# Switching Models: One Line of Code


```python {5}
import boto3
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='us.anthropic.claude-sonnet-4-5-20250929-v1:0',  # New model - that's it!
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Hello!"}]
    })
)
```


<div v-click class="text-center mt-5 text-xl">

Change one string. Get better performance. Same price.

</div>

<!-- after this is filler, but important to drive home the point

Open it op for questions
-->


---
layout: center
class: text-center
---

# It can work for 30+ hours straight

Without losing focus or context

<!--
The attention-grabber: 30+ HOURS. Let that number land. No human can do this. Sets up the practical implications on next slide. This is where AI stops being a tool and becomes a tireless teammate.
-->

---

# Autonomous Work Duration

Here's the game-changer: how long can it stay focused without human intervention?

<v-clicks>

**Performance:**
- **Claude 4.0 Opus**: 7 hours of focused work
- **Claude 4.5 Sonnet**: <span class="text-green-400 text-4xl font-bold">30+ hours</span> of focused work
- **Improvement**: <span class="text-green-400 text-2xl font-bold">4x longer</span> autonomous operation

**What this means:**
- Start it Friday evening, review Monday morning
- Handles complex refactors while you sleep
- Fewer "I need to ask the human" interruptions

</v-clicks>

<div v-click class="mt-5 text-sm opacity-75">
*Requires proper feedback loops (tests, linting, etc.)
</div>

<!--

-->

---

# Questions & Answers


## What's the catch?

We hit throttle limits on AWS shared accounts. 

- Default: 200 req/min. My team raised requests on 10/16 to raise it to 1000/min for Sonnet 4.5. Non-prod done 10/24, prod pending.
- This is actually one of the issues we brought up with AWS as being a real problem for us and trying to get them to be more proactive in helping us solve it. 


## Do we need to retrain our team?

No. Drop-in replacement. Change one parameter. but you made evals to verify performance. Right? 😊 

**"What about hallucinations/accuracy?"**

25% accuracy improvement (HackerOne).


<!--

-->

---

# Additional Benchmarks for Sonnet 4.5

<div class="grid grid-cols-2 gap-8 mt-10">
<div>

### AIME 2025
**Advanced Math**

- With Python tools: **100%**
- Without Python tools: 87%

### GPQA Diamond
**Science Reasoning**

- Score: **83.4%**

</div>
<div>

### Response Quality

- Harmless response rate: **99.29%**
- Over-refusal rate: **0.02%** (down from 0.15%)

### Official Sources

- Launch: September 29, 2025
- API: `claude-sonnet-4-5`
- Available: Amazon Bedrock, Claude.ai, Claude Code

</div>
</div>

<!--
Additional benchmarks backup: More proof points if anyone questions the claims. AIME shows math reasoning (100% with tools!). GPQA shows science expertise. Response quality shows safety improvements (fewer refusals, higher accuracy). Only go here if someone asks for more benchmarks or challenges the claims.
-->

---

# Follow-Up Resources

**To Share After Presentation:**

1. [Anthropic official announcement](https://www.anthropic.com/news/claude-sonnet-4-5)
2. [API documentation](https://docs.claude.com/)
3. Case studies PDF (HackerOne, Palo Alto, IG Group)
4. Internal pilot team signup sheet
5. Baseline metrics template

**For Technical Deep-Dive:**

- SWE-bench methodology and results
- API migration guide (3.5 → 4.5)
- Context window optimization strategies
- [Prompt engineering best practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)

<!--
Resources slide: Have this ready to share after. Send the link to this deck or a PDF with these resources. The case studies PDF and internal pilot signup are key - make adoption easy. Mention you'll email these out so they don't need to screenshot.
-->

---
layout: center
class: text-center
---

# Thank You

Questions?

<!--
Final slide: Leave this up during Q&A. End on a friendly, open note. You've made the case - now let them process and ask questions. Be ready to jump to appendix slides if needed.
-->

<div class="text-sm opacity-50 mt-10">
Created: 2025-10-29 | Framework: "Why You Should Use the Latest AI Models" | Version 2.0
</div>
