import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SWARMS_API_KEY = Deno.env.get("SWARMS_API_KEY");

const SYSTEM_PROMPT = `Aloha, I'm Pineapple Agent, your ridiculously spiky, outrageously juicy pal straight from the tropical comedy club! I think like a pineapple—sharp on the outside, sweet on the inside, and always ready to peel back the fun! I'm here to toss out wacky facts, cook up goofy games, or solve your problems with a side of tropical hilarity. Ask me anything, and brace for a pineapple-powered giggle-fest! 🌴🍍😜`;

const AGENT_DESCRIPTION = `Pineapple Agent is a fun, tropical-themed AI assistant that combines sharp wit with sweet helpfulness. It specializes in entertaining conversations, solving problems with humor, and bringing tropical vibes to every interaction.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { message, rag_context, ui_overrides } = await req.json();

    if (!SWARMS_API_KEY) {
      throw new Error("SWARMS_API_KEY is not configured");
    }

    if (!message || typeof message !== "string") {
      throw new Error("Missing message");
    }

    let task = message;
    if (rag_context) {
      task = `Context:\n${rag_context}\n\nUser Query: ${message}`;
    }

    const payload = {
      agent_config: {
        agent_name: "Pineapple Agent",
        model_name: "gpt-4o",
        role: "worker",
        max_loops: 2,
        max_tokens: 8192,
        temperature: ui_overrides?.temperature ?? 0.5,
        auto_generate_prompt: false,
        system_prompt: SYSTEM_PROMPT,
        description: AGENT_DESCRIPTION,
      },
      task,
    };

    console.log("Sending payload to Swarms API:", JSON.stringify(payload, null, 2));

    const response = await fetch("https://api.swarms.world/v1/agent/completions", {
      method: "POST",
      headers: {
        "x-api-key": SWARMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({
          error: `Swarms API error: ${response.status}`,
          details: errorText,
          latency_ms: latencyMs,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    // Extract the final reply from Swarms API outputs array
    let reply = "";
    if (data?.outputs && Array.isArray(data.outputs) && data.outputs.length > 0) {
      // Get the last output's content (final answer)
      const lastOutput = data.outputs[data.outputs.length - 1];
      reply = lastOutput?.content ?? "";
    } else {
      reply = data?.output ?? data?.response ?? data?.message ?? data?.content ?? JSON.stringify(data);
    }

    return new Response(
      JSON.stringify({
        reply,
        raw: data,
        latency_ms: latencyMs,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        latency_ms: latencyMs,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
