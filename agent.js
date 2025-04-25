require('dotenv').config();
const axios = require('axios');
const readline = require('readline-sync');
const fs = require('fs');
const { exec } = require('child_process');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "openai/gpt-3.5-turbo";

async function generateCode(task) {
  const messages = [
    {
      role: "system",
      content: "You are an AI that writes only valid Python code for any given task. Only return the code. Do NOT include ```python or ```. ",
    },
    {
      role: "user",
      content: `Write a Python program to ${task}`,
    }
  ];

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPENROUTER_MODEL,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "ai-agent",
        },
      }
    );

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid API response format");
    }

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    if (err.response) {
      console.error(` API Error: ${err.response.status} - ${err.response.statusText}`);
      if (err.response.data && err.response.data.error) {
        console.error(`Details: ${err.response.data.error.message || JSON.stringify(err.response.data.error)}`);
      }
    } else if (err.request) {
      console.error(" Network Error: No response from the API server. Check your internet connection or API URL.");
    } else {
      console.error("Unexpected Error:", err.message);
    }
    return null;
  }
}


async function main() {
  const task = readline.question("> What task should the agent perform? ");
  console.log("\nGenerating code...\n");

  const code = await generateCode(task);
  if (!code) return console.log("Could not generate code.");

  // Remove markdown-style code fences if still present
  const cleanedCode = code.replace(/```[\s\S]*?```/g, '').trim();

  console.log("\nSuggested Python code:\n");
  console.log(cleanedCode);

  if (!readline.keyInYNStrict("\nDo you want to save and execute it? ")) {
    return console.log("Task cancelled.");
  }

  fs.writeFileSync("task.py", cleanedCode);
  console.log("\nCode saved to task.py. Running it now...\n");

  exec("python task.py", (err, stdout, stderr) => {
    if (err) {
      console.error("Execution error:\n", stderr);
    } else {
      console.log("Output:\n", stdout);
    }
  });
}

main();
