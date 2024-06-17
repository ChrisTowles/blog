---
title: How would you setup a new Full Stack Architecture thats production ready - Part 1
date: 2022-05-10T16:00:00.000+00:00
lang: en
duration: 20min
---

## How would you setup a new Full Stack Architecture thats Production ready - Part 1

The other week I had two different people ask me the same question.

> How would you setup a new Full Stack Architecture thats Production ready?

This included public website, backend, database, hosting, authenication, everything. It was basicly standing up for a new company and everything that went with it? This interested me because in both cases it was assumed it was a completely new. So no tech debt or existing team skill sets to consider.

What really surprised me about the question where two things:

- I didn’t have a great architecture example to send them too. I mean I know of some really great examples to send them to for pieces of it, say tests, authorization or serverless apis but not the entire thing.
- They wanted more than a proof of concept or a hobby project. This would be the start of a company’s code base. So concerns like CICD, hiring people with the needed skill sets,  account lifecycle, and new developer onboarding to be productive were all a concern.

> IMPORTANT: I should point out to please ask your self if there really is a need for the project or code to exist. Very often you should just use off the shelf solutions. I gave a talk about this at work should add it here as well.

I first started to think of the normal things, as a developer, we all would consider.

- Hosting
- Frontend
- Backend
- Code Language
- Database

But there are a lot of things that are not considered.

- DNS domains
- Email domains
- Cloud providers
- Account lifecycle and Onboarding Process
- Data Security
- CI/CD
- Code review process
- Backups
- Diaster Recovery
- etc.

The list goes on and on and that justs the tip of the iceberg.

I started to list off the things I would for sure choose and tried to explain why. I quickly realized that I was not going to be able to cover any fraction all the things I would consider. I have 20+ years of experence which basicly means that I learned many times the hard way, of what not to do and my options have changed along the way.  So instead i thought i'd explain my approch, my chooices and considerations I make.

I have no idea how many of these topics i'll cover, but i'll update this document as I go.
