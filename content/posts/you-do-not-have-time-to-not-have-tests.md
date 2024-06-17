---
title: You do not have time to not have tests
date: 2021-12-17T16:00:00.000+00:00
lang: en
duration: 7 min
---

# {{ $frontmatter.title }}

So first a full disclosure: I was late to get on the testing bandwagon.

It's shamefully obvious now but I had heard about testing for years before I understood its value. I wish had fully incorporated it into my development practices sooner. So maybe I can convince you to do the same.

<!-- more -->

## Life without Tests

You may have thought you didn't have time to write tests. You ship features fast and adding tests would slow you down. And the first week or two of a project you may be right.

But the good news, the project is a success.  Now users want new features and more features. You need need to maintain this project for a long time. Maybe years.

You need to add features, add different code paths and scenarios. How do you ensure that new features work and old features didn't break?

You manually just have to test them. things like:

- Account creation, login, logout, etc.
- User profile, settings, etc.
- User's posts, comments, etc.
- checkout and payment, etc.

But because your project is a success, you can't be breaking things in production. So you have to be very careful. Every new feature affects the whole system. So you have to be very careful. It's slow to test everything for every change, you can refactor or make large changes because the impact is too high to risk breaking things.

## Life with Tests

At The start of the project, decide to write a few tests. Not everything but happy paths. It takes a bit of time but it's worth it. You have confidence that things are likely to work before deploying them.

As you add people and you find bugs, you can add tests and the bugs stay fixed.

Now you deiced that you have some Tech Debt that you need to address but the change impacts the entire system. That's Ok, you can make big changes and your tests will likely ensure that you find the issues instead of your customers. Developers can submit Pull Requests if the tests passed so chances are high it's good to merge. It might not be perfect but it can't so bad that happy paths are likely to work.

## Long Term

Now guess which product will be faster to deliver and make changes on. Which one is it easier to onboard new users?

Add the tests and thank me later.
