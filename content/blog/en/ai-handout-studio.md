---
title: "Give AI-made handouts a place to live: receive them as JSON, finish them in the browser"
description: "How AI Handout Studio, a local app, keeps the slides, HTML documents and question sheets an AI agent writes in one place, takes them through a JSON contract and templates, and lets a person finish and hand them out from the browser. Design decisions and how it was built."
order: 2
draft: true
createdAt: "2026-09-26"
image: "/images/ai-handout-studio/editor-cover.en.png"
---

<!--
Seven chapters. Target: 3,500 to 4,000 words, 9 images, 400 to 600 words per chapter.
Order: the problem -> what I built (a place) -> how it works (JSON, templates, finishing) -> question sheets -> how it differs -> how it was built and how to try it.
Images live in public/images/ai-handout-studio/ (English UI shots end in .en). Reshoots come from the article workspace ~/Documents/ai-handout-studio-shots/en; the author picks what to shoot.
-->

## Introduction

<!-- Mirror the Japanese: the "where did I put it" problem in one paragraph, then the repository URL and this image. -->

https://github.com/GentaAmeku/ai-handout-studio

![The AI Handout Studio editor: slide list on the left, canvas in the middle, properties on the right](/images/ai-handout-studio/editor-cover.en.png)

*A deck the agent wrote, opened in the browser.*

## What goes wrong with AI-made handouts

### 1. They scatter
<!-- Every project folder gets its own HTML or PPTX; asking for an overview lands files in a tmp folder. -->

### 2. Fixes burn tokens
<!-- "Fix just this part" loops: check, ask, check again. -->

### 3. They do not look alike
<!-- Several agents, no design system, no harness: colors and spacing drift from one handout to the next. -->

<!-- These three map onto the next chapter's place, JSON and templates. Say so in one sentence at the start of the next chapter. -->

## What I built: a place, and three kinds of handout

<!-- Instead of letting the AI make everything, give it a place and have it write JSON; the person adjusts look and content in the web UI, including the design template, layout and font sizes. -->

![The handout list with agent-made handouts as cards](/images/ai-handout-studio/list.en.jpg)

*Whatever folder you ask from, the handout lands here. Search and favorites, and it opens on a phone on the same Wi-Fi.*

<!--
One table for the three kinds, no images.
| Kind | Used for | Export |
| Slides | Proposals, study sessions, talks. 1280x720 | PDF, PNG, PPTX |
| HTML documents | Specs, research notes, requirements | One HTML file |
| Question sheets | The agent asks before it writes | Answers copied as Markdown |
One paragraph on the rule: if I am faster doing the last step by hand, I do it by hand; only the slow steps go to the AI. State plainly: this is a place, not a generator.
-->

![Architecture: the agent reads the skill, the CLI saves JSON, the local server applies template CSS and handles rendering, editing and export](/images/ai-handout-studio/overview.en.png)

*The AI writes only JSON. The app owns the look, the editing and the export.*

## How it works: the AI writes JSON, templates own the look, a person finishes

<!-- Three decisions in one chapter, at most three subsections. This is the part people bookmark. -->

### One JSON file is the source of truth

![The JSON tab in the editor showing the selected slide as JSON](/images/ai-handout-studio/editor-json.en.png)

*One slide is JSON with text, structure and coordinates only. No colors, no class names.*

<!--
Code block: one block from deck.json. The [[TBD]] rule: never let it invent numbers.
One paragraph, no subsection: the agent talks to it through SKILL.md and a CLI; SKILL.md is the API reference for the agent; the command decides the path of the place so the AI never guesses it; works in Claude Code and Codex.
-->

### Templates own the look

![The slide template list: the same sample content rendered by every template](/images/ai-handout-studio/templates.en.png)

*Same content, different look. CSS is generated from tokens.json, and the build rejects hard-coded colors.*

### A person finishes it in the browser

![A content slide with the heading block selected; position, size and text are edited in the right panel](/images/ai-handout-studio/editor-selected.en.png)

*Select, move, resize, insert, delete and edit text: a person does this on screen. Overflow is measured after rendering, so a wrong coordinate guess by the AI is visible.*

![The PNG, HTML, PPTX and PDF export buttons at the top of the editor](/images/ai-handout-studio/export-bar.en.png)

<!-- PPTX is not a pasted screenshot: the DOM is measured and rebuilt as shapes and text. Two sentences on what survives and what is lost (pseudo-elements, shadows, dashed borders); no table. -->

## Question sheets: the agent asks before it writes

<!--
No subsections, four paragraphs.
1. Why ask: a handout built on guesses is the most expensive to fix. Claude Code's AskUserQuestion is fast for one question but too narrow for several with comparison tables, figures and reasons; I wanted the same in Codex. Rule: one or two quick answers go through chat, anything read side by side goes to a sheet.
2. Questions are JSON, the look is a template. Each question carries what to compare (image below).
3. "Copy answers" turns them into Markdown; paste into the chat and the agent carries on. Why no answer server (one URL, nothing to babysit). Same pattern as Thariq Shihipar's "The Unreasonable Effectiveness of HTML" (Anthropic, 2026-05-20): end a custom UI with "copy as prompt". Do not claim who was first.
4. Pasted answers are kept with the sheet, so reopening it shows what was decided. The decisions in this article were made on a sheet.
-->

![An answered question sheet: comparison table and an info notice under the text, options and the answer field below](/images/ai-handout-studio/sheet-answered.png)

*Each question carries what to compare. Tables, figures and notices sit under the text; the answer field below them.*

![The last question, with a "Copy answers" button where "Next" used to be](/images/ai-handout-studio/sheet-copy.png)

*When you finish, "Copy answers" appears. Paste the Markdown into the chat and the agent carries on.*

<!-- Not shot yet: English versions of these two sheet images (the article workspace has an English sheet: "Before I write the study-session deck"). -->

## How it differs from similar tools

<!--
One table and three sentences. On Zenn the first comment is "how is this different from Presenton?", so answer first.
Columns: name / what the AI writes / who renders / editing UI.
Rows: Presenton (JSON to HTML templates, drag editing, slides only), AWS SDPM (JSON to PPTX, warnings returned to the agent, no UI), Claude Code + Marp (Markdown, no UI), PPTX Skill (HTML to PPTX), AI Handout Studio.
Three differences: agent-first from any folder; slides, HTML documents and question sheets in one place; hard-coded colors rejected at build.
One sentence: Vercel's json-render (Jan 2026) makes the same argument, constrain the LLM to JSON over a component catalog instead of letting it write code.
-->

## How it was built, and how to try it

<!--
Three paragraphs and one code block.
1. Built: design doc first with fixed rules, then tickets and plans implemented by Claude Code and Codex, with before/after screenshots on each PR. Setup is a game book: run doctor, read the section it points to, repeat.
2. What did not work (two or three lines): retired the answer server for sheets in favor of copy; rebuilt the layout tabs; renamed from deck-studio.
3. Try it: clone and /studio-setup (code block). Needs Node 24 and Claude Code or Codex CLI. Next: sharing slides and a phone-sized read page.
-->
