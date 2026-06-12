const fs = require("fs");

const file = "e:\\Try Project\\AI SaaS platform\\web\\node_modules\\ai\\dist\\index.d.ts";
const content = fs.readFileSync(file, "utf8");

const lines = content.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("ChatInit")) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
