import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const mode = process.argv[2] === "dev" ? "dev" : "start";
const cwd = process.cwd();

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

// Load .env first, then allow .env.local overrides, while respecting explicit process.env vars
const fileEnv = {
  ...parseEnvFile(path.join(cwd, ".env")),
  ...parseEnvFile(path.join(cwd, ".env.local")),
};

const env = { ...fileEnv, ...process.env };

const port = (env.PORT || "").trim();
if (!port) {
  console.error(
    "[iGUIDE Server] ERROR: PORT is not defined in .env. Please set PORT=<port_number> in your .env file."
  );
  process.exit(1);
}

if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
  console.error(
    `[iGUIDE Server] ERROR: Invalid PORT="${port}" in .env. PORT must be a valid TCP port (1-65535).`
  );
  process.exit(1);
}

const hostname = (env.HOSTNAME || env.HOST || "0.0.0.0").trim();
const nextBin = path.join(cwd, "node_modules", "next", "dist", "bin", "next");

if (!fs.existsSync(nextBin)) {
  console.error(
    "[iGUIDE Server] ERROR: Next.js binary not found. Please run `npm install` first."
  );
  process.exit(1);
}

const args = [nextBin, mode, "-p", port, "-H", hostname];

console.log(
  `[iGUIDE Server] Starting Next.js (${mode}) on http://${hostname}:${port} (configured via .env)`
);

const child = spawn(process.execPath, args, {
  cwd,
  env,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
