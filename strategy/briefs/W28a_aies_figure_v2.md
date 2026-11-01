# Task: the AI-Human Engineering Stack figure, version 2, as SVG and PNG — 2026-11-01

## 1. What and why
Henrique wants a new master figure for the Stack document: his original diagram (agenticengineering.jpg at the repo root) with one addition,
lexical engineering drawn as a shadow level directly underneath Prompt Engineering. Deliver it as a hand-written SVG (editable, the source
of truth) and a PNG export (for the PDF and the web). Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- agenticengineering.jpg (open with the Read tool): reproduce its structure, labels and annotations exactly, in a cleaner hand:
  title "AI-Human Engineering Stack", subtitle "A layered framework of intelligence for effective LLM/agentic workflows."; USER (ellipse,
  bottom-left) and FINAL OUTPUT (ellipse, top); five stepped layers, widest at the bottom, each with its name and question in parentheses
  (Prompt: What to do; Context: What to know while doing; Intent: What to want while doing; Judgment: What to doubt while doing; Coherence:
  What to become while doing); EVALUATION ENGINEERING as a vertical bar on the left spanning all layers ("How to know while doing") with
  arrows into each layer; HARNESS ENGINEERING as a dashed enclosure around layers and bar, labelled top-right ("Where and how to do");
  the blue annotations: "Eval runs through harness", "Each layer is evaluated in a loop autonomously", "Each layer depends on all layers
  beneath it", "User begins with the prompt", "User re-enters each layer if needed depending on evaluation", "User sets up the harness
  initially and may intervene/adjust as needed".
- The Lexical Substrate's own placement (C:\Users\henri\Documents\Hayen Mill\1. Rough Notes\AI\AI-Human Engineering\Lexical-Substrate.md §6):
  a band under the layers, inside the harness, reached by the evaluation loop, drawn with a distinct border because its relation is
  compositional, not sequential.

## 3. The addition
- Directly under PROMPT ENGINEERING, inside the harness, a band labelled "LEXICAL ENGINEERING" with "(How to say it)" and a small second
  line "the substrate: the medium every layer's artifacts are written in". Draw it as a shadow level: same width as the Prompt layer or
  slightly wider, lower contrast (grey fill, dashed or double border), so it reads as beneath the stack rather than as a sixth step.
  The evaluation bar extends down to reach it with one arrow. The user's "begins with the prompt" arrow still points at Prompt.
- Date line "2026-11-01" and licence line "CC BY-SA 4.0 · Henrique Jr. Sanchez" where the original had its date and credit. No pen name.

## 4. Output
- strategy/drafts/figures/aies-stack-v2.svg (hand-written, viewBox about 1000×700, fonts: a serif for the title, monospace for labels as
  in the original, all text as real text not paths; no external fonts; black/grey/one blue for annotations, print-safe on white).
- strategy/drafts/figures/aies-stack-v2.png at 2× (about 2000 px wide) exported with Python Playwright from the SVG, and a 1× version
  aies-stack-v2@1x.png.
- Open the PNG and compare it with the original side by side; fix anything misaligned. Return ≤10 lines: what the figure contains, sizes,
  anything you could not reproduce.

## 5. Constraints
- Budget: 45 minutes. Model: opus. No helpers. Write nothing outside strategy/drafts/figures/. Banned words apply to any text.
