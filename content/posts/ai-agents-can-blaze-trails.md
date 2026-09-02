---
title: AI Agents Can Blaze Trails. But Scale Still Needs Roads.
date: 2026-09-02T09:00:00-03:00
description: Disposable agent-generated code excels at exploration, while persistent software still wins when stable work must scale.
slug: ai-agents-can-blaze-trails
tags:
  - AI agents
  - software engineering
  - architecture
sourceHeading: true
---
# AI Agents Can Blaze Trails. But Scale Still Needs Roads.

A paper recently went viral under a provocative title: [*The End of Software Engineering*](https://arxiv.org/abs/2606.05608v1). Six days later, a second version appeared with a calmer name: [*Agentic Software: How AI Agents Are Restructuring the Software Paradigm*](https://arxiv.org/abs/2606.05608v2).

To the author’s credit, the change was more than cosmetic. The revised paper no longer says software engineering is simply ending. Instead, it describes an expansion into what it calls *Agentic Engineering*. Its central idea remains: agents can generate code at runtime, use it to complete a task, and discard it afterward. Code no longer needs to be the product. Sometimes it is only a temporary tool used to produce a result.

I think this will become extremely common. But I do not see agentic software as the next stage replacing persistent software. I see two different ways of solving different kinds of problems. One is exploration. The other is infrastructure.

## What Disposable Code Actually Means

Imagine that you need a market analysis. An agent can collect data from several sources, write some Python to clean it, compare competitors, calculate metrics, generate charts, and deliver a report. The report is the product. The code is only the path used to reach it.

If this is a one-time decision, that code probably does not need a repository, deployment pipeline, monitoring, documentation, and maintenance plan. If you request another analysis six months later, the market, sources, and questions may be completely different anyway. Generating a new path may be cheaper than maintaining the previous one. This is where disposable code makes perfect sense.

The code still matters. It performs the calculations and produces the result. But its value comes from completing this particular task, not from becoming a permanent application.

## Same Result, Different Scale

Now imagine that hundreds of people request the same market analysis every few seconds. The inputs may differ slightly, but the sources, calculations, and expected output follow mostly stable rules. Every number needs to be reproducible because people are comparing results and making pricing or inventory decisions from them.

The result has not changed. It is still a market analysis. What changed is how many times—and how quickly—we need to produce it.

Asking an agent to rediscover the process for every request would waste time, spend tokens, consume more resources, and introduce unnecessary variation. An agent needs to reason again on every execution. That flexibility is useful when the problem changes, but it becomes overhead when the path remains mostly the same.

Persistent software can optimize that repeated path. It can precompute shared results, cache expensive queries, batch requests, reuse connections, build indexes, eliminate redundant work, and move critical calculations into faster specialized code. Each optimization benefits every future request.

Persistent code costs more to design, test, deploy, and maintain. But once it exists, it can execute millions of times at very low marginal cost. Its optimizations, tests, bug fixes, and operational knowledge are reused by every user and every execution. Disposable code pays part of the exploration and validation cost again each time. Persistent code establishes the path once and amortizes that work over time.

When low variation meets high repetition, persistent software starts to win—not because an agent cannot solve the problem, but because the problem no longer needs to be solved from scratch.

## Explorers and Roads

An explorer can cross unfamiliar terrain, respond to obstacles, and find a path nobody planned beforehand. For a journey that may happen only once, this flexibility is exactly what we want. Building permanent infrastructure would cost more than making the trip.

Agents are becoming very good at this kind of work. Give an agent a goal, some context, and access to tools, and it can improvise a path toward the result. It may generate code, inspect the output, correct its approach, and discard everything when the task is complete.

But if thousands of people need to reach the same destination, sending a new explorer every time stops making sense. We build a road. A road costs more upfront, but every future journey becomes faster, cheaper, and more predictable. Over time, we add bridges, signs, lighting, guardrails, and maintenance.

Persistent code works the same way. It accumulates tests, optimizations, monitoring, bug fixes, and operational knowledge. The path becomes safer and more efficient with every improvement. For the first market analysis, we needed an explorer. For thousands of requests, we need an optimized road.

We build roads not because exploring is impossible, but because repeatedly exploring the same path is wasteful.

## Different Tools for Different Terrain

The explorer and the road are not competing technologies. Explorers use roads wherever roads already exist. They improvise only where existing infrastructure no longer reaches.

Agents work the same way. They already depend on persistent software: models, runtimes, APIs, databases, sandboxes, tools, and protocols. A market intelligence product might use persistent code to collect and normalize data continuously, serving thousands of similar requests efficiently. An agent could then use that infrastructure to answer unusual questions the application never anticipated.

Stable work becomes a road. Novel work remains exploration. If an unusual question starts appearing repeatedly, its stable parts can become another permanent feature. A useful trail becomes a new road, which agents can then use during future journeys.

The paper is probably right that disposable code will become a much larger share of all code produced. When generating code becomes cheap, we will use it for analysis, investigations, migrations, experiments, and one-off automation. Most of that code should disappear after producing its result. That is progress.

But disposable code and persistent software solve different problems. Agents are great when work benefits from runtime adaptation. Persistent code is better when a solution has low variation, runs often enough, serves enough people, or needs serious optimization around time, resources, cost, and reliability.

Agents will let us explore more terrain than ever before. But when enough people need to reach the same destination, we will still build roads.
