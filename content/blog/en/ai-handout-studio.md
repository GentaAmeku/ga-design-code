---
title: "Give AI-made handouts a place to live: receive them as JSON, finish them in the browser"
description: "How AI Handout Studio, a local app, keeps the slides, HTML documents and question sheets an AI agent writes in one place, takes them through a JSON contract and templates, and lets a person finish and hand them out from the browser. Design decisions and how it was built."
order: 2
draft: true
createdAt: "2026-09-26"
image: "/images/ai-handout-studio/editor-cover.en.png"
---

<!--
Chapters follow the three verbs in the title: give them a place -> receive as JSON -> finish in the browser. Question sheets appear as one kind of handout in the "place" chapter and get their own chapter later.
Images live in public/images/ai-handout-studio/ (English UI shots end in .en). "Not shot yet" marks images the author still has to take, with the reason.
-->

## Introduction

<!-- Three-line summary (what, for whom, repository URL), then this as the first screen. -->

![The AI Handout Studio editor: slide list on the left, canvas in the middle, properties on the right](/images/ai-handout-studio/editor-cover.en.png)

*A deck the agent wrote, opened in the browser.*

## Where do AI-made handouts end up?

<!--
No image. The pain, in three parts.
1. They scatter: every conversation and folder spawns HTML or PPTX files you cannot find later.
2. You cannot fix them: the "fix just this part" chat loop. One code block with an example.
3. They do not match: colors, spacing and the organization name drift between handouts; HTML or PPTX written directly by the AI breaks.
-->

## From "let it make everything" to "give it a place"

<!--
No image. The rule: if I am faster doing the last step by hand, I do it by hand; only the slow steps go to the AI. What the AI gets (text, structure, coordinates) and what it does not (colors, sizes, the final touch).
State plainly: what I decided to build is a place, not a generator.
-->

## A place to live: three kinds of handout in one list

![The handout list with agent-made handouts as cards](/images/ai-handout-studio/list.en.jpg)

*Whatever folder you ask from, the handout lands here. Search and favorites included.*

### Slides

![A content slide with the heading block selected; position, size and text are edited in the right panel](/images/ai-handout-studio/editor-selected.en.png)

*A 1280x720 deck, exported to PDF, PNG or PPTX.*

### HTML documents

![An HTML document read page with summary, table of contents and cards](/images/ai-handout-studio/document-read.en.jpg)

*Specs and research notes become one HTML file, not a deck.*

### Question sheets

![A question sheet: question, comparison table and answer field on the left, question list and progress on the right](/images/ai-handout-studio/sheet-read.en.jpg)

*The sheet the agent asks with before it writes lives in the same place.*

<!-- Three lines here; the "asks before it writes" mechanism is the "Question sheets" chapter below. -->

### Opens on a phone too

![A question sheet at phone width](/images/ai-handout-studio/sheet-phone.png)

*Readable from a phone on the same Wi-Fi. Answer a sheet away from the desk, paste when you are back.*

<!-- Not shot yet: an English phone-width shot. The Japanese one is used for now. -->

## How it fits together

![Architecture: the agent reads the skill, the CLI saves JSON, the local server applies template CSS and handles rendering, editing and export](/images/ai-handout-studio/overview.en.png)

*The AI writes only JSON. The app owns the look, the editing and the export.*

## How it differs from similar tools

<!--
No image. One table: name / what the AI writes / who renders / editing UI / question sheets.
Rows: Presenton (JSON to HTML templates, drag editing, slides only), AWS SDPM (JSON to PPTX, warnings returned to the agent, no UI), Claude Code + Marp (Markdown, no UI), PPTX Skill (HTML to PPTX), AI Handout Studio.
Four differences: agent-first from any folder; slides + HTML documents + question sheets in one place; tokens to CSS with hard-coded colors rejected at build; PPTX rebuilt from DOM coordinates.
One sentence noting Vercel's json-render (Jan 2026) makes the same argument: constrain the LLM to JSON over a component catalog instead of letting it write code.
-->

## Receive it as JSON

### One JSON file is the source of truth

![The JSON tab in the editor showing the selected slide as JSON](/images/ai-handout-studio/editor-json.en.png)

*One slide is JSON with text, structure and coordinates only. No colors, no class names.*

<!-- Code block with a deck.json excerpt. The [[要確認]] placeholder rule (never let it invent numbers) goes here. -->

### Templates own the look

![The slide template list: the same sample content rendered by every template](/images/ai-handout-studio/templates.en.png)

*Same content, different look. CSS is generated from tokens.json, and the build rejects hard-coded colors.*

### The agent talks to it through a skill and a CLI

<!-- No image. Code blocks: the command table from SKILL.md and the CLI usage. SKILL.md is the API reference for the agent; works in Claude Code and Codex; the agent never guesses the path of the place, the command decides it. -->

## Finish it in the browser

### Never skip the place where a person edits

![The parts panel with the ten block types](/images/ai-handout-studio/editor-parts.en.png)

*Select, move, resize, insert, delete and edit text: a person does this on screen.*

### Catch overflow mechanically

<!-- Not shot yet: the overflow check showing a warning. Needs a deck with deliberately long text. The check measures after rendering, so a wrong coordinate guess by the AI is visible to the person. -->

### Export to PDF, PNG and PPTX

![The PNG, HTML, PPTX and PDF export buttons at the top of the editor](/images/ai-handout-studio/export-bar.en.png)

<!--
PPTX is not a pasted screenshot: the DOM is measured and rebuilt as shapes and text. Table of what survives and what is lost (pseudo-elements, shadows, dashed borders).
Not shot yet: an exported PPTX open in PowerPoint or Keynote with editable shapes and text. Take it on the author's machine.
-->

## Question sheets: the agent asks before it writes

<!-- The rarest thing in the place, and its entrance (before anything is written). Order: why ask at all (a handout built on guesses is the most expensive to fix) -> where AskUserQuestion fell short -> the JSON -> how answers come back -> kept in the place. -->

### Where AskUserQuestion fell short

<!-- No image. Claude Code's AskUserQuestion is fast for one question at a time, but too narrow for six questions with comparison tables, figures and reasons. I wanted the same thing in Codex too. State the rule: one or two quick answers go through chat or AskUserQuestion; anything that needs reading side by side goes to a sheet. -->

### Questions are JSON, the look is a template

![An answered question sheet: comparison table and an info notice under the text, options and the answer field below](/images/ai-handout-studio/sheet-answered.png)

*Each question carries what to compare. Tables, figures and notices sit under the text; the answer field below them.*

<!-- Code block: one question from questions.json (title / summary / detail / options / recommended / visual.comparison). The page adds the "(recommended)" mark from the recommended field. -->

### Answers come back as Markdown you paste into the chat

![The last question, with a "Copy answers" button where "Next" used to be](/images/ai-handout-studio/sheet-copy.png)

*When you finish, "Copy answers" appears. Paste the Markdown into the chat and the agent carries on.*

<!-- Why there is no answer server: one URL, no process to babysit, the handout list becomes the record. Note that Thariq Shihipar's post "The Unreasonable Effectiveness of HTML" (2026-05-20) recommends ending a custom UI with a "copy as prompt" button; same pattern. Do not claim who was first. -->

### Answers stay in the place too

<!-- No image. Pasted answers are archived with `sheet answers`, so reopening the sheet shows what was decided. The decisions in this very article were made on a sheet. Close by echoing the "place" chapter. -->

## How I built it: write the design doc first, let AI agents implement

### Tickets and plans

<!-- Not shot yet: a pull request with before/after screenshots from the public repository. -->

### Setup as a game book

<!-- No image. Code block with the output of `ai-handout-studio doctor`. -->

## What did not work

<!-- No image. Retiring the answer server for question sheets, rebuilding the layout tabs, renaming from deck-studio. -->

## Try it

<!-- Three lines: clone and /studio-setup; requirements (Node 24, Claude Code or Codex CLI). The list image is already used in the "place" chapter, so none here. -->

## What comes next
