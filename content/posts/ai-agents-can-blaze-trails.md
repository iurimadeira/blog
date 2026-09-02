---
title: Agents Blaze Trails. Scale Needs Roads.
date: 2026-09-02T09:00:00-03:00
description: Disposable agent-generated code excels at scouting new terrain, while persistent software still wins when stable work must scale.
slug: ai-agents-can-blaze-trails
tags:
  - AI agents
  - software engineering
  - architecture
sourceHeading: true
---
A paper recently went viral under a provocative title: [*The End of Software Engineering*](https://arxiv.org/abs/2606.05608v1). Six days later, a second version appeared with a calmer name: [*Agentic Software: How AI Agents Are Restructuring the Software Paradigm*](https://arxiv.org/abs/2606.05608v2).

To the author’s credit, the change was more than cosmetic. The revised paper no longer says software engineering is ending. Instead, it describes an expansion into what it calls *Agentic Engineering*.

<div class="paradigm-shift" role="img" aria-label="AI to Software to Result versus Agent to Result">
  <strong>AI → Software → Result</strong>
  <span>vs.</span>
  <strong>Agent → Result</strong>
</div>

In the first path, AI helps create a persistent software artifact, which then produces the outcome. In the second, an agent plans and executes the work directly, generating and discarding code whenever useful. Software does not disappear. It becomes part of the agent’s runtime: a means to the result rather than the product handed to the user.

The paper extends this idea into a shift from SaaS to Agent-as-a-Service. Agent-delivered outcomes will certainly grow, but they will not make SaaS obsolete. SaaS is still how we package many of the persistent systems that repeated work depends on. Agents can operate inside those products as well as alongside them.

Agentic software is not the next stage replacing persistent software. The two are suited to different terrain.

## Scouts and Roads

A scout moves on foot through forests and rough terrain, using a compass to navigate where no road exists. When a river, fallen tree, or steep slope blocks the way, the scout changes course and blazes a new trail toward the destination. If the journey may happen only once, adapting along the way costs less than building permanent infrastructure for a single trip.

But if thousands of people need to reach the same destination, sending a new scout every time stops making sense. We build a road along the proven route. It costs more upfront, but every future journey becomes faster, cheaper, and more predictable. Over time, we add bridges, signs, lighting, guardrails, and maintenance.

The scout is the agent at runtime. The terrain is the task and its context. The trail is disposable code created along the way, and the destination is the result delivered to the user.

The road is persistent software. It captures a stable path and improves it through tests, optimizations, monitoring, bug fixes, and operational knowledge. We build roads not because agents cannot blaze trails, but because repeatedly blazing the same trail is wasteful.

## A Matter of Variation and Scale

Imagine that you need a market analysis. An agent can collect data from several sources, write Python to clean it, compare competitors, calculate metrics, generate charts, and deliver a report. The report is the product. The code is only the path used to reach it.

For a one-off analysis, that code probably does not need a repository, deployment pipeline, monitoring, documentation, or maintenance plan. If you request another analysis six months later, the market, sources, and questions may be completely different. Generating a new path may be cheaper than maintaining the previous one.

Now imagine that hundreds of people request the same analysis every few seconds. Inputs differ slightly, but sources, calculations, and expected outputs follow stable rules. Each number must be reproducible because people use the results for pricing or inventory decisions.

The destination is still a market analysis. What changed is the variation in the work and the scale at which it must run. Asking an agent to rediscover the process for every request would spend time, tokens, and compute while introducing unnecessary variation. Flexibility becomes overhead when the path remains mostly the same.

Persistent software can optimize that path. It can precompute shared results, cache expensive queries, batch requests, reuse connections, build indexes, and move critical calculations into faster specialized code. Each improvement benefits every future request.

Persistent code costs more to design, test, deploy, and maintain. Once built, however, it can run millions of times at low marginal cost. Its tests, fixes, optimizations, and operational knowledge are reused. When low variation meets high repetition, persistent software wins. Not because an agent cannot solve the problem, but because the problem no longer needs to be solved from scratch.

## Different Tools for Different Terrain

Stable work becomes a road. Novel work still needs a scout. If an unusual question starts appearing repeatedly, its stable parts can become a permanent feature: a useful trail becomes a new road that agents can use in future journeys.

The paper is probably right that disposable code will become a much larger share of all code produced. As code generation gets cheaper, we will use it for analyses, investigations, migrations, experiments, and one-off automation. Much of that code should disappear after producing its result. That is progress.

But disposable code and persistent software solve different problems. Agents excel when work benefits from runtime adaptation. Persistent code is better when a solution varies little, runs often, serves many people, or needs serious optimization for time, cost, resources, and reliability.

Agents will let us scout more terrain than ever before. But when enough people need to reach the same destination, we will still build roads.
