const fs = require("fs");
const readline = require("readline");

const logFile = "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\a2efd1e8-d5c4-4cbb-8dff-89b763fc7c5b\\.system_generated\\logs\\transcript.jsonl";

async function main() {
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.type === "BROWSER_SUBAGENT" || parsed.tool_calls) {
        // Look for capture_browser_console_logs tool calls or responses
        const calls = parsed.tool_calls || [];
        const isConsoleLogCall = calls.some(c => c.name === "capture_browser_console_logs");
        if (isConsoleLogCall || parsed.content?.includes("console")) {
          console.log(`Step ${parsed.step_index}:`, parsed.content ? parsed.content.substring(0, 1000) : "no content");
        }
      }
    } catch (e) {}
  }
}

main().catch(console.error);
