---
title: "I stopped letting AI make the whole handout. Building AI Handout Studio"
description: "How AI Handout Studio, a local app, takes the slides, HTML documents and question sheets an AI agent writes through a JSON contract and templates, and lets a person finish them in the browser. Design decisions and how it was built."
order: 2
draft: true
createdAt: "2026-09-26"
image: "/images/ai-handout-studio/editor-cover.en.png"
---

<!--
Images live in public/images/ai-handout-studio/ (English UI shots end in .en).
"Not shot yet" marks images the author still has to take, with the reason.
-->

## Introduction

<!-- Three-line summary (what, for whom, repository URL), then this as the first screen. -->

![The AI Handout Studio editor: slide list on the left, canvas in the middle, properties on the right](/images/ai-handout-studio/editor-cover.en.png)

*A deck the agent wrote, opened in the browser.*

## What went wrong when I let AI make my handouts

<!-- No image. One code block with an example of the "fix just this part" chat loop. -->

## Why I stopped letting AI make the whole thing

<!-- No image. The rule: if I am faster doing the last step by hand, I do it by hand; only the slow steps go to the AI. -->

## What AI Handout Studio does

### Slides

![A content slide with the heading block selected; position, size and text are edited in the right panel](/images/ai-handout-studio/editor-selected.en.png)

*Select a block and edit its coordinates and text in the panel.*

### HTML documents

![An HTML document read page with summary, table of contents and cards](/images/ai-handout-studio/document-read.en.jpg)

*Specs and research notes become one HTML file, not a deck.*

### Question sheets: the agent asks first

![A question sheet: question, comparison table and answer field on the left, question list and progress on the right](/images/ai-handout-studio/sheet-read.en.jpg)

*The agent asks before it writes. You answer with suggested options and a comparison table in view.*

<!-- Not shot yet: the same sheet at phone width in English. The Japanese article uses sheet-phone.png; reuse it here or take an English one. -->

## How it fits together

![Architecture: the agent reads the skill, the CLI saves JSON, the local server applies template CSS and handles rendering, editing and export](/images/ai-handout-studio/overview.en.png)

*The AI writes only JSON. The app owns the look, the editing and the export.*

## Three design decisions

### One JSON file is the source of truth

![The JSON tab in the editor showing the selected slide as JSON](/images/ai-handout-studio/editor-json.en.png)

*One slide is JSON with text, structure and coordinates only. No colors, no class names.*

<!-- Code block with a deck.json excerpt. The [[要確認]] placeholder rule goes here. -->

### Templates own the look

![The slide template list: the same sample content rendered by every template](/images/ai-handout-studio/templates.en.png)

*Same content, different look. CSS is generated from tokens.json, and the build rejects hard-coded colors.*

### Never skip the place where a person edits

![The parts panel with the ten block types](/images/ai-handout-studio/editor-parts.en.png)

*Select, move, resize, insert, delete and edit text: a person does this on screen.*

<!-- Not shot yet: the overflow check showing a warning. Needs a deck with deliberately long text. -->

## The agent talks to it through a skill and a CLI

<!-- No image. Code blocks: the command table from SKILL.md and the CLI usage. -->

## Exporting to PDF, PNG and PPTX

![The PNG, HTML, PPTX and PDF export buttons at the top of the editor](/images/ai-handout-studio/export-bar.en.png)

<!-- Not shot yet: an exported PPTX open in PowerPoint or Keynote with editable shapes and text. Take it on the author's machine. -->

## How I built it: write the design doc first, let AI agents implement

### Tickets and plans

<!-- Not shot yet: a pull request with before/after screenshots from the public repository. -->

### Setup as a game book

<!-- No image. Code block with the output of `ai-handout-studio doctor`. -->

## What did not work

<!-- No image. Retiring the answer server for question sheets, rebuilding the layout tabs, renaming from deck-studio. -->

## Try it

![The handout list with agent-made handouts as cards](/images/ai-handout-studio/list.en.jpg)

<!-- Three lines: clone and /studio-setup; requirements (Node 24, Claude Code or Codex CLI). -->

## What comes next
