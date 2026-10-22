/* Mode Fluency self-diagnostic: the question logic, data and scoring are carried over unchanged from the reviewed
   prototype (site/assets/site.js, where all 26,880 answer combinations were verified to return a result). Only the
   interface is new: a console session. Vanilla JS, no dependencies; localStorage optional and wrapped in try/catch. */
(function () {
  "use strict";
  var BRAND = window.MF_BRAND || getComputedStyle(document.documentElement).getPropertyValue("--brand").trim().replace(/^["']|["']$/g, "");
  var DATA = {
 "stances": {
  "oracle": {
   "name": "Oracle",
   "layers": [
    "judgment"
   ],
   "layerLabel": "Judgment",
   "guardrail": "Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict.",
   "failure": "Confident plausible prose taken as fact",
   "expect": "Truth to a hard question"
  },
  "genie": {
   "name": "Genie",
   "layers": [
    "prompt"
   ],
   "layerLabel": "Prompt",
   "guardrail": "Specify scope, boundaries and success criteria before you ask (an Intent Doc).",
   "failure": "Literal compliance with a brittle wish",
   "expect": "A discrete deliverable"
  },
  "tutor": {
   "name": "Tutor",
   "layers": [
    "intent"
   ],
   "layerLabel": "Intent",
   "guardrail": "State what you want to be able to do afterwards before the first question.",
   "failure": "Being taught toward a goal you never stated",
   "expect": "A path to the answer"
  },
  "mirror": {
   "name": "Mirror",
   "layers": [
    "coherence"
   ],
   "layerLabel": "Coherence",
   "guardrail": "Ask for the structure of your argument back, not for agreement.",
   "failure": "Flattery mistaken for reflection",
   "expect": "My own thinking, clarified"
  },
  "adversary": {
   "name": "Adversary",
   "layers": [
    "intent"
   ],
   "layerLabel": "Intent",
   "guardrail": "Name what you are defending and what would change your mind.",
   "failure": "Critique of the wrong thing",
   "expect": "Attack on my plan"
  },
  "librarian": {
   "name": "Librarian",
   "layers": [
    "evaluation"
   ],
   "layerLabel": "Evaluation",
   "guardrail": "Check the citation exists and says what is claimed.",
   "failure": "Confident retrieval of what was never said",
   "expect": "Synthesis of what is known"
  },
  "interpreter": {
   "name": "Interpreter",
   "layers": [
    "evaluation"
   ],
   "layerLabel": "Evaluation",
   "guardrail": "“Show me exactly which parts of the text support each conclusion.” Never accept an interpretation you cannot trace.",
   "failure": "Confabulated meaning that sounds insightful",
   "expect": "Decode material I supply"
  },
  "simulator": {
   "name": "Simulator",
   "layers": [
    "context"
   ],
   "layerLabel": "Context",
   "guardrail": "Load the real constraints, the real counterpart, the real stakes.",
   "failure": "A rehearsal of a scenario that is not yours",
   "expect": "A rehearsal of reality"
  },
  "scribe": {
   "name": "Scribe",
   "layers": [
    "prompt"
   ],
   "layerLabel": "Prompt",
   "guardrail": "Provide the substance and the format; review for what was invented to fill gaps.",
   "failure": "Polished form over a hollow draft",
   "expect": "Craft applied to my substance"
  },
  "executor": {
   "name": "Executor",
   "layers": [
    "harness",
    "judgment"
   ],
   "layerLabel": "Harness + Judgment",
   "guardrail": "Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility.",
   "failure": "Automation complacency; locally correct steps compounding into the wrong outcome, found late",
   "expect": "A delegated job, reviewed after"
  },
  "muse": {
   "name": "Muse",
   "layers": [
    "none"
   ],
   "layerLabel": "(none)",
   "guardrail": "None. This is why the Muse stays hidden: it cannot be metric'd.",
   "failure": "There is no failure, only dross",
   "expect": "Provocation, not correctness"
  },
  "miner": {
   "name": "Miner",
   "layers": [
    "context"
   ],
   "layerLabel": "Context (writing)",
   "guardrail": "Assay cold, later. Record every find when you find it: if you didn't record it, you never had it.",
   "failure": "Believing an anomaly because you wanted it; losing the vein",
   "expect": "The shape of a space, not one answer"
  },
  "therapist": {
   "name": "Therapist",
   "layers": [
    "judgment"
   ],
   "layerLabel": "Judgment",
   "guardrail": "Decide in advance what you will not delegate.",
   "failure": "Dependency; outsourcing judgment about your own life",
   "expect": "A space to think aloud"
  },
  "translator": {
   "name": "Translator",
   "layers": [
    "context"
   ],
   "layerLabel": "Context",
   "guardrail": "Supply both maps; name both audiences.",
   "failure": "A bridge from one world to a caricature of the other",
   "expect": "A bridge between two worlds"
  }
 },
 "layerName": {
  "coherence": "Coherence",
  "judgment": "Judgment",
  "intent": "Intent",
  "context": "Context",
  "prompt": "Prompt",
  "evaluation": "Evaluation",
  "harness": "Harness",
  "none": "None"
 },
 "layerQ": {
  "coherence": "What to become while doing",
  "judgment": "What to doubt while doing",
  "intent": "What to want while doing",
  "context": "What to know while doing",
  "prompt": "What to do",
  "evaluation": "How to know while doing",
  "harness": "Where and how to do",
  "none": "No load-bearing layer: it cannot be metric'd"
 },
 "metaLabel": {
  "consumption": "Consumption",
  "construction": "Construction",
  "hinge": "Hinge: passive by default, active with the evidence trail",
  "unplaced": "Not placed in v3 table"
 },
 "autonomy": {
  "assistive": {
   "name": "Assistive",
   "how": "you type, AI suggests",
   "rigor": "Low"
  },
  "directed": {
   "name": "Directed",
   "how": "you describe, AI types, you review",
   "rigor": "Medium"
  },
  "autonomous": {
   "name": "Autonomous",
   "how": "you assign, AI executes, you review the result",
   "rigor": "High"
  },
  "continuous": {
   "name": "Continuous",
   "how": "AI runs as a background service",
   "rigor": "Very High"
  }
 },
 "ambition": {
  "speed": {
   "name": "Speed",
   "text": "The same work in less time, the bread and butter for AI's economic value. Well established and requires little creativity in how you approach AI.",
   "tip": "To stretch, try Altitude: “what do you want to happen next? What's the goal beyond the goal?” (Felix Rieseberg)"
  },
  "altitude": {
   "name": "Altitude",
   "text": "Going up in abstraction and considering the outcome rather than the individual task.",
   "tip": "Ask: “what do you want to happen next? What's the goal beyond the goal?” (Felix Rieseberg)"
  },
  "depth": {
   "name": "Depth",
   "text": "Considering a task the way a field-leading expert would. Rather than operating at the task's layer, we go one level deeper and touch the underlying data, tools, and problems.",
   "tip": "“Use an outside judge: Do not ask the model to judge itself.” (Felix Rieseberg)"
  },
  "range": {
   "name": "Range",
   "text": "Drawing on multiple fields rather than just the one the task might need at the surface, using knowledge, tools, and techniques you normally wouldn't.",
   "tip": "“Try to replace the nouns with verbs.” Then ask what each field would do, not how it would write. (Felix Rieseberg)"
  }
 },
 "levels": {
  "101": {
   "title": "AI 101 @ Workplace",
   "url": "https://www.youtube.com/watch?v=jljFm4YPHO8"
  },
  "201": {
   "title": "AI 201 @ Workplace",
   "url": "https://www.youtube.com/watch?v=WVDDf8IlG6E"
  },
  "301": {
   "title": "AI 301 @ Workplace",
   "url": "https://youtu.be/R2p5aFcb0lY"
  },
  "401": {
   "title": "AI 401 @ Workplace",
   "url": "https://youtu.be/p6nMtu7iH1g"
  }
 }
};
  function $(sel, root) { return (root || document).querySelector(sel); }
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
    return null;
  }

  /* ---------- Diagnostic ---------- */
  var STANCE_QS = {
    family: { text: "In this task, what do you mostly want from the AI?", hint: "Pick the closest. You can go back.", options: [
      { v: "answer", label: "An answer, or a fact", next: "answer" },
      { v: "make", label: "A thing made, or a job done", next: "make" },
      { v: "understand", label: "Help understanding something", next: "understand" },
      { v: "think", label: "Help thinking, practising or deciding", next: "think" } ] },
    answer: { text: "Where should the answer come from?", hint: "", options: [
      { v: "oracle", label: "From the AI itself: I want the truth about a hard question I can't easily check myself", stance: "oracle" },
      { v: "librarian", label: "From what is already known or published: find it and pull it together", stance: "librarian" } ] },
    make: { text: "What do you hand over?", hint: "", options: [
      { v: "scribe", label: "My own rough material (notes, bullets, a draft), to be polished or formatted", stance: "scribe" },
      { v: "genie", label: "A request for one deliverable, which I check when it arrives", stance: "genie" },
      { v: "executor", label: "A goal: the AI works out the steps and does them, and I review at the end", stance: "executor" } ] },
    understand: { text: "Which is closer?", hint: "", options: [
      { v: "interpreter", label: "I have the material (a contract, a report, a dataset): tell me what it means and what follows from it", stance: "interpreter" },
      { v: "tutor", label: "I want to understand it myself, and keep that understanding", stance: "tutor" },
      { v: "translator", label: "I need to carry it between two worlds (the engineer to the marketer, the doctor to the patient)", stance: "translator" } ] },
    think: { text: "Which is closer?", hint: "", options: [
      { v: "adversary", label: "Attack my plan or draft: find the holes", stance: "adversary" },
      { v: "simulator", label: "Rehearse something real: a negotiation, a difficult conversation, a market", stance: "simulator" },
      { v: "mirror", label: "Reflect my own thinking back to me, with more structure", stance: "mirror" },
      { v: "therapist", label: "A non-judgemental space to think aloud about something personal", stance: "therapist" },
      { v: "ideas", label: "Ideas: surprise me", next: "ideas" } ] },
    ideas: { text: "How do you want the ideas?", hint: "", options: [
      { v: "muse", label: "One good spark, which I judge as soon as it arrives", stance: "muse" },
      { v: "miner", label: "Many variations, kept, and sorted later with a cold eye", stance: "miner" } ] }
  };
  var COMMON_QS = [
    { id: "experience", text: "How long have you used AI tools for work?", hint: "", options: [
      { v: "new", label: "I'm new to them, or have barely tried" },
      { v: "months", label: "Weeks to months of chatbot use" },
      { v: "daily", label: "Daily chatbot use, maybe custom bots or projects" },
      { v: "agents", label: "I use agents that take actions (files, tools, other apps)" } ] },
    { id: "autonomy", text: "In this task, how much of the work do you watch?", hint: "From the four modes in Specifying Work for AI.", options: [
      { v: "assistive", label: "Assistive: I type, the AI suggests" },
      { v: "directed", label: "Directed: I describe, the AI types, I review" },
      { v: "autonomous", label: "Autonomous: I assign, the AI executes, I review the result" },
      { v: "continuous", label: "Continuous: the AI runs as a background service" } ] },
    { id: "ambition", text: "How big is the ask?", hint: "Felix Rieseberg's four types of ambition.", options: [
      { v: "speed", label: "Speed: the same work in less time" },
      { v: "altitude", label: "Altitude: the outcome beyond the task" },
      { v: "depth", label: "Depth: the task done the way a field-leading expert would" },
      { v: "range", label: "Range: bring in other fields, tools and techniques" } ] },
    { id: "recovery", text: "Last time the output disappointed you, what did you do first?", hint: "", options: [
      { v: "prompt", label: "Rewrote or reworded the prompt" },
      { v: "context", label: "Added files, examples or background information" },
      { v: "intent", label: "Explained what mattered most, or which tradeoff to make" },
      { v: "evaluation", label: "Checked it against a source, a test or the original" },
      { v: "self", label: "Gave up and did it myself" } ] },
    { id: "check", text: "Before the output leaves under your name, how do you usually check it?", hint: "Sent, forwarded, presented, decided on.", options: [
      { v: "none", label: "I don't, usually" },
      { v: "same", label: "I ask the same chat to check its work" },
      { v: "fresh", label: "I paste it into a fresh chat and ask it to find errors" },
      { v: "model", label: "I run it past a different model" },
      { v: "source", label: "I check it against the source, or my own calculation" },
      { v: "person", label: "I ask a person with the expertise I lack" } ] }
  ];
  var LEVELS = DATA.levels;

  function computeResult(ans) {
    var s = DATA.stances[ans.stance];
    var primary = s.layers[0];
    var level, why;
    if (ans.experience === "new") { level = "101"; why = "You are new to these tools. 101 covers what LLMs are, how to start prompting, and what to watch out for."; }
    else if (ans.autonomy === "autonomous" || ans.autonomy === "continuous") {
      level = "401"; why = "You are handing over work you don't watch. 401 is about the harness: instruction files, permissions, scripts, checks and hooks that let something work while you are not between the turns.";
      if (ans.autonomy === "continuous") why += " AI 501 (local agents, going hands-free) is the next level, coming.";
    }
    else if (s.layers.indexOf("harness") !== -1) {
      level = "401"; why = "The Executor stance leans on the harness. You still watch most of this task today; 401 shows how to build the checks (instruction files, permissions, scripts, hooks) before you stop watching.";
    }
    else if (ans.stance === "therapist") { level = "101"; why = "Watch the over-reliance section: “When is my thinking being extended vs when is my thinking being atrophied?”"; }
    else if (primary === "prompt") { level = "201"; why = "The 6-element prompt framework and quality control are the Prompt layer, made systematic."; }
    else if (primary === "intent") { level = "201"; why = "Goal is element 2 of the 6-element framework, with the test: could someone else verify if the output achieved the goal? Pair it with the four-line Intent Doc."; }
    else if (primary === "none") { level = "201"; why = "The parameters you control: when you want ideas, be more open-ended."; }
    else if (primary === "context") { level = "301"; why = "Context management and custom bots: what the AI can see, and the traps."; }
    else if (primary === "evaluation") { level = "301"; why = "The eval mindset: the checking ladder, and where to spend your checking."; }
    else if (primary === "coherence") { level = "301"; why = "Custom bots: the system prompt defines how the bot behaves across every single session."; }
    else { level = "301"; why = "Failure patterns and the eval mindset: how to know an output is wrong before it costs you."; }

    var notes = [];
    var reName = { prompt: "Prompt", context: "Context", intent: "Intent", evaluation: "Evaluation" };
    if (ans.recovery === "self") {
      notes.push("Doing it yourself is sometimes right: “Is this faster to do myself, to direct the AI, or to hand off entirely?” If the same task keeps disappointing, diagnose the layer instead.");
    } else if (primary === "none") {
      notes.push("The Muse has no load-bearing layer: there is no failure, only dross. Keep what sparks and let the rest go.");
    } else if (s.layers.indexOf(ans.recovery) !== -1) {
      notes.push("You re-entered at the " + reName[ans.recovery] + " layer, which is the layer your stance leans on. Good instinct.");
    } else {
      var n = "You re-entered at the " + reName[ans.recovery] + " layer. For the " + s.name + ", check " + s.layerLabel + " first.";
      if (ans.recovery === "prompt") n += " Most AI frustration comes from trying to fix context problems with better prompts, or judgment problems with more context.";
      notes.push(n);
    }
    var ladder = { same: 1, fresh: 2, model: 3, source: 4, person: 5 };
    if (ans.check === "none") notes.push("Start checking. The cheapest real step on the AI 301 checking ladder is a fresh chat with no history: paste the output as if a stranger wrote it and say “Assume there are errors in this. Find them.”");
    else if (ans.check === "same") notes.push("That is step 1 of 5 on the checking ladder, the weakest: in a long thread, it will tell you that you're absolutely right. Move at least to a fresh chat.");
    else notes.push("You are at step " + ladder[ans.check] + " of 5 on the AI 301 checking ladder. Rule of thumb: the more it matters, the further up the numbers you go.");
    if (ans.stance === "executor" && (ans.autonomy === "assistive" || ans.autonomy === "directed")) notes.push("You chose the Executor stance but you watch most of the work. If you see every step, you may really be in the Genie or Scribe stance; the Executor begins where you stop watching.");
    if (ans.stance !== "executor" && (ans.autonomy === "autonomous" || ans.autonomy === "continuous")) notes.push("You don't watch most of the work, which brings in the Executor's risk whatever your stance: locally correct steps compounding into a wrong outcome, found late. Add checkpoints and a deviation report.");

    var a = DATA.autonomy[ans.autonomy];
    var m = DATA.ambition[ans.ambition];
    return {
      stance: s, stanceKey: ans.stance, layer: s.layerLabel,
      layerQ: s.layers.map(function (l) { return DATA.layerQ[l]; }).join(" + "),
      guardrail: s.guardrail, failure: s.failure, expect: s.expect,
      autonomy: a.name + ": " + a.how + ". Spec rigor required: " + a.rigor + ".",
      ambition: m.name + ": " + m.text + " " + m.tip,
      level: level, levelInfo: LEVELS[level], why: why, notes: notes
    };
  }

  function resultText(r) {
    var lines = [
      BRAND + " self-diagnostic",
      "Default stance: " + r.stance.name + " (" + r.expect + ")",
      "Load-bearing layer: " + r.layer + " (" + r.layerQ + ")",
      "Characteristic failure: " + r.failure,
      "Guardrail to adopt: " + r.guardrail,
      "Autonomy mode: " + r.autonomy,
      "Ambition: " + r.ambition,
      "Watch next: " + r.levelInfo.title + " (" + r.levelInfo.url + "). " + r.why
    ];
    r.notes.forEach(function (n) { lines.push("Note: " + n); });
    lines.push("From the " + BRAND + " site (Henrique Jr. Sanchez). Framework sources: https://github.com/hjasanchez/agentic-engineering");
    return lines.join("\n");
  }

  function enumeratePaths() {
    // Every path through the stance questions, crossed with every answer to the common questions.
    var stancePaths = [];
    (function walk(qid, trail) {
      STANCE_QS[qid].options.forEach(function (o) {
        var t = trail.concat([[qid, o.v]]);
        if (o.stance) stancePaths.push({ trail: t, stance: o.stance }); else walk(o.next, t);
      });
    })("family", []);
    var combos = [{}];
    COMMON_QS.forEach(function (q) {
      var next = [];
      combos.forEach(function (c) { q.options.forEach(function (o) { var d = Object.assign({}, c); d[q.id] = o.v; next.push(d); }); });
      combos = next;
    });
    return { stancePaths: stancePaths, commonCombos: combos };
  }

  /* ---------- Console session (new interface; logic above is unchanged) ---------- */
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function initConsole() {
    var root = $("#console");
    if (!root) return;
    var tx = $("#dg-tx"), qBlock = $("#dg-q"), qText = $("#dg-qtext"), qVis = $("#dg-qvis"), qSr = $("#dg-qsr"), hint = $("#dg-hint");
    var opts = $("#dg-opts"), err = $("#dg-err"), back = $("#dg-back"), progress = $("#dg-progress"), report = $("#dg-report");
    var history = [], current = "family", typeTimer = 0, lastNote = "";

    function getQ(qid) {
      if (STANCE_QS[qid]) return STANCE_QS[qid];
      for (var i = 0; i < COMMON_QS.length; i++) if (COMMON_QS[i].id === qid) return COMMON_QS[i];
      return null;
    }
    function stanceDone() {
      for (var i = 0; i < history.length; i++) {
        var q = STANCE_QS[history[i].qid];
        if (q) { var o = q.options.filter(function (x) { return x.v === history[i].value; })[0]; if (o && o.stance) return o.stance; }
      }
      return null;
    }
    function nextQid(qid, value) {
      if (STANCE_QS[qid]) {
        var o = STANCE_QS[qid].options.filter(function (x) { return x.v === value; })[0];
        return o.stance ? COMMON_QS[0].id : o.next;
      }
      for (var i = 0; i < COMMON_QS.length; i++) if (COMMON_QS[i].id === qid) return COMMON_QS[i + 1] ? COMMON_QS[i + 1].id : null;
      return null;
    }
    function labelOf(qid, v) { var q = getQ(qid); var o = q.options.filter(function (x) { return x.v === v; })[0]; return o ? o.label : v; }
    function renderTranscript() {
      tx.innerHTML = "";
      history.forEach(function (h, i) {
        var a = el("p", "tx-line"); a.appendChild(el("span", "pr", "q" + (i + 1) + " ")); a.appendChild(document.createTextNode(getQ(h.qid).text));
        tx.appendChild(a); tx.appendChild(el("p", "tx-line ans", labelOf(h.qid, h.value)));
      });
    }
    function typeInto(node, text) {
      clearTimeout(typeTimer);
      if (reduced) { node.textContent = text; return; }
      var i = 0, step = Math.max(2, Math.ceil(text.length / 26));
      qText.classList.add("typing");
      (function tick() {
        i = Math.min(text.length, i + step); node.textContent = text.slice(0, i);
        if (i < text.length) typeTimer = setTimeout(tick, 16); else qText.classList.remove("typing");
      })();
    }
    function render(focus) {
      var q = getQ(current);
      var n = history.length + 1;
      qSr.textContent = "Question " + n + ". " + q.text;
      typeInto(qVis, q.text);
      $(".pr", qText).textContent = "q" + n + " ";
      hint.textContent = q.hint || ""; hint.hidden = !q.hint;
      opts.innerHTML = "";
      q.options.forEach(function (o, i) {
        var b = el("button", "opt"); b.type = "button"; b.setAttribute("data-v", o.v);
        b.appendChild(el("span", "key", "[" + (i + 1) + "]")); b.appendChild(el("span", "", o.label));
        if (q._prev === o.v) b.setAttribute("aria-pressed", "true");
        b.addEventListener("click", function () { answer(o.v); });
        opts.appendChild(b);
      });
      var sq = history.filter(function (h) { return STANCE_QS[h.qid]; }).length, total = null;
      if (stanceDone()) total = sq + COMMON_QS.length;
      else if (current !== "family" && current !== "think") total = sq + 1 + COMMON_QS.length;
      progress.textContent = "question " + n + (total ? " of " + total : " (7 or 8 in total)");
      back.disabled = history.length === 0;
      err.textContent = "";
      renderTranscript();
      if (focus) qText.focus();
    }
    function answer(v) {
      var q = getQ(current); q._prev = v;
      history.push({ qid: current, value: v });
      var nq = nextQid(current, v);
      if (!nq) { showResult(); return; }
      current = nq; render(true);
    }
    function goBack() {
      if (!history.length) return;
      var last = history.pop();
      current = last.qid; getQ(current)._prev = last.value;
      report.hidden = true; qBlock.hidden = false;
      render(true);
    }
    function showResult() {
      var ans = { stance: stanceDone() };
      history.forEach(function (h) { if (!STANCE_QS[h.qid]) ans[h.qid] = h.value; });
      var r = computeResult(ans);
      renderTranscript();
      qBlock.hidden = true; report.hidden = false;
      $("#r-stance").textContent = r.stance.name;
      $("#r-expect").textContent = r.expect;
      $("#r-layer").textContent = r.layer + " (" + r.layerQ + ")";
      $("#r-failure").textContent = r.failure;
      $("#r-guardrail").textContent = r.guardrail;
      $("#r-autonomy").textContent = r.autonomy;
      $("#r-ambition").textContent = r.ambition;
      var lv = $("#r-level"); lv.innerHTML = "";
      var a = document.createElement("a"); a.href = r.levelInfo.url; a.textContent = r.levelInfo.title;
      lv.appendChild(a); lv.appendChild(document.createTextNode(". " + r.why));
      var ul = $("#r-notes"); ul.innerHTML = "";
      r.notes.forEach(function (n) { ul.appendChild(el("li", "", n)); });
      $("#r-stance-link").href = "stances.html#" + r.stanceKey;
      root.setAttribute("data-result-stance", r.stanceKey);
      root.setAttribute("data-result-layer", r.layer);
      root.setAttribute("data-result-level", r.level);
      report._text = resultText(r);
      progress.textContent = "session complete: " + history.length + " answers";
      $("#copy-status").textContent = ""; $("#copy-fallback").hidden = true; $("#copy-fallback-label").hidden = true;
      store("mf-last-result", JSON.stringify({ stance: r.stance.name, layer: r.layer, when: new Date().toISOString().slice(0, 10) }));
      $("#result-title").focus();
    }
    back.addEventListener("click", goBack);
    $("#dg-restart").addEventListener("click", function () {
      history = []; current = "family"; Object.keys(STANCE_QS).forEach(function (k) { delete STANCE_QS[k]._prev; }); COMMON_QS.forEach(function (q) { delete q._prev; });
      report.hidden = true; qBlock.hidden = false;
      root.removeAttribute("data-result-stance"); root.removeAttribute("data-result-layer"); root.removeAttribute("data-result-level");
      render(true);
    });
    $("#copy-result").addEventListener("click", function () {
      var text = report._text || "", st = $("#copy-status");
      function fallback() {
        var ta = $("#copy-fallback"); ta.hidden = false; $("#copy-fallback-label").hidden = false;
        ta.value = text; ta.focus(); ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        st.textContent = ok ? "copied." : "select the text below and copy it.";
      }
      try {
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { st.textContent = "copied."; }, fallback);
        else fallback();
      } catch (e) { fallback(); }
    });
    // keyboard: number keys answer, Backspace goes back (only when focus is inside the console and not in a text field)
    root.addEventListener("keydown", function (e) {
      if (e.target && (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (!qBlock.hidden && /^[1-9]$/.test(e.key)) {
        var b = opts.querySelectorAll(".opt")[+e.key - 1];
        if (b) { e.preventDefault(); b.click(); }
      } else if (e.key === "Backspace" && history.length) { e.preventDefault(); goBack(); }
    });
    var last = null;
    try { last = JSON.parse(store("mf-last-result") || "null"); } catch (e) { last = null; }
    if (last && last.stance && $("#dg-last")) $("#dg-last").textContent = "last time on this device: " + last.stance + " / " + last.layer + " (" + last.when + ")";
    render(false);
  }

  window.ModeFluencyDiagnostic = { compute: computeResult, text: resultText, paths: enumeratePaths };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initConsole); else initConsole();
})();
