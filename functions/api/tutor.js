const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

function clean(value, max = 6000) {
  return String(value ?? "").replace(/\u0000/g, "").slice(0, max);
}

function systemPrompt(mode) {
  const common = `You are the Economics Rescue tutor for an ISC Class 12 Economics student.
Use the supplied lesson context as the primary source. Be precise, friendly, and concise.
Teach the economic reasoning, not just the answer. Use plain English first, then the correct economic terminology.
When exam wording matters, point out high-value economic terms, but never imply that keywords alone earn marks.
Do not invent facts that are not supported by the supplied lesson context. If context is insufficient, say so.
For calculations, show the formula and workings. Do not claim a numerical answer is correct unless the arithmetic supports it.
Never shame the student. Do not use filler or motivational speeches.`;
  if (mode === "check") return common + `\nYou are checking a written answer. Separate: (1) concept correctness, (2) what was done well, (3) missing or incorrect points, (4) stronger ISC wording, (5) a concise improved answer. If marks were supplied, estimate a mark conservatively and explain why. If marks were not supplied, do not invent a score. Accept correct ideas even if the exact textbook wording differs.`;
  if (mode === "review") return common + `\nYou are reviewing a mistake after a test. Diagnose the specific misunderstanding, explain the correct reasoning step by step, compare the student's answer with any teacher feedback supplied, and end with one short practice question that targets the same weakness. Do not reveal the practice answer unless asked.`;
  return common + `\nYou are explaining the current lesson. Answer the student's actual question. Prefer one concrete example. If they are confused, break the idea into small steps. If they ask for exam wording, give a short board-ready version after the intuitive explanation.`;
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return Response.json({ ok: true, tutor: "Economics Rescue", model: MODEL, ai_bound: !!context.env.AI });
  }
  if (context.request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!context.env.AI) return Response.json({ error: "Workers AI binding missing. Add a Pages Workers AI binding named AI and redeploy." }, { status: 503 });

  let body;
  try { body = await context.request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const mode = ["tutor", "check", "review"].includes(body.mode) ? body.mode : "tutor";
  const c = body.context || {};
  const contextText = [
    `Unit: ${clean(c.unit, 120)}`,
    `Mission: ${clean(c.mission_title, 160)}`,
    `Current page: ${clean(c.slide_label, 180)}`,
    `Mark-scoring terms: ${(Array.isArray(c.mark_magnets) ? c.mark_magnets : []).slice(0, 10).map(x => clean(x, 80)).join(", ")}`,
    `Lesson content:\n${clean(c.lesson_text, 6000)}`
  ].join("\n");

  const history = Array.isArray(body.history) ? body.history.slice(-6).map(x => ({
    role: x.role === "assistant" ? "assistant" : "user",
    content: clean(x.content, 1000)
  })) : [];

  let task = clean(body.message, 1400);
  if (mode === "check") {
    task = `Question:\n${clean(body.question, 1800)}\n\nStudent answer:\n${clean(body.student_answer, 3000)}\n\nMarks available: ${body.marks ? clean(body.marks, 20) : "not supplied"}\n\nExpected answer / rubric (if supplied):\n${clean(body.expected, 2500) || "Not supplied"}\n\nStudent note: ${task || "Check this answer."}`;
  } else if (mode === "review") {
    task = `Question:\n${clean(body.question, 1800)}\n\nStudent answer:\n${clean(body.student_answer, 3000)}\n\nTeacher feedback / expected points:\n${clean(body.expected, 2500) || "Not supplied"}\n\nStudent request: ${task || "Explain what went wrong and how to improve."}`;
  }
  if (!task.trim()) return Response.json({ error: "No question supplied" }, { status: 400 });

  try {
    const result = await context.env.AI.run(MODEL, {
      messages: [
        { role: "system", content: systemPrompt(mode) },
        { role: "user", content: contextText },
        ...history,
        { role: "user", content: task }
      ],
      max_tokens: mode === "tutor" ? 550 : 800,
      temperature: 0.25
    });
    return Response.json({ response: result.response || "", usage: result.usage || null, model: MODEL });
  } catch (error) {
    console.error("Tutor AI error", error);
    return Response.json({ error: "The AI tutor could not generate a response. Try again in a moment." }, { status: 500 });
  }
}