---
title: "From meetings to implementation: Building an AI-driven workflow"
description: "How I delegate meeting transcription, task management, and implementation to AI agents."
order: 1
draft: false
createdAt: "2026-09-18"
updatedAt: "2026-09-18"
image: "/images/ai-driven-workflow.en.png"
---

## Introduction

Recent AI models have improved to the point where they can perform at their best through their own reasoning, without an elaborate external harness.
I therefore introduced a workflow in which AI orchestrates everything from task management to implementation.
This reduces my workload and improves my day-to-day productivity.

## The burden of managing daily work

When managing AI agents such as Orca and Herdr in parallel, tracking progress becomes difficult once work continues across multiple days. I often had to ask each agent how far it had progressed.
Because humans are still responsible for reporting progress, I also had to inspect each worktree myself.

## The workflow I wanted to build

Meetings already contain progress updates. My goal was to transcribe them and let a single AI staff member orchestrate task organization and assignment.

## How the system works

![AI-driven workflow from meetings to implementation](/images/ai-driven-workflow.en.png)

The recording app receives meeting details from the calendar app and sends the transcript to Orca. Orca organizes the tasks and, after human review, requests implementation in each worktree.

### Calendar app

The calendar app runs in the menu bar and connects to Google Calendar.
It sends a notification before each scheduled event and brings a join prompt to the foreground when the meeting starts.
It then passes the meeting title and participant names to the recording app and launches it.

### Recording app

The recording app receives the meeting details and records the conversation. It treats system audio as the other participants and microphone input as my own voice, keeping the two sources separate.
After the meeting, a local model creates the transcript. The app sends its file path to Orca through the Orca CLI, where I can choose a provider such as Claude or Codex.

### Task management app

This is a task management dashboard designed for AI agents to read and update. Its Skill and MCP interfaces allow agents to connect without depending on a specific provider.
Each task has an ID that is also assigned to its corresponding Orca worktree, preventing duplicate work.
The dashboard also has a web interface for human review. Orca's scheduler currently reports a daily inventory of the tasks.

### Orca: Delegating implementation to AI

Orca includes a Skill that exposes its CLI operations, allowing an external agent to create worktrees and start sessions.
The orchestrating AI agent uses these operations to dispatch work and begin each task.

## What remains a human decision

Although I aim to minimize human intervention, the tasks dispatched by the orchestrating AI often still require review.
The model has difficulty determining whether a task continues work from the previous day or represents a new request, especially when coordinating with the task management app.

## What I learned from daily use

As of September 2026, current models are capable of supporting this workflow with sufficient accuracy. However, the orchestration layer needs a strong reasoning model and a reasonably large context window because it must retain responses from multiple agents.
Task management is not yet completely reliable, so this remains the main area for improvement.

## What's next

The overall workflow works, but task management still needs improvement, particularly when identifying tasks from a transcript and reconciling them with the task management app.
I also maintain a separate personal knowledge base, so I am exploring whether its task management features should be combined with this system.
