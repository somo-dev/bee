import { existsSync } from "fs";
import path from "path";

export async function getPackageManager(cwd: string): Promise<"npm" | "yarn" | "pnpm"> {
  const lockFiles = {
    "package-lock.json": "npm",
    "yarn.lock": "yarn",
    "pnpm-lock.yaml": "pnpm",
  };

  for (const [lockFile, packageManager] of Object.entries(lockFiles)) {
    if (existsSync(path.join(cwd, lockFile))) {
      return packageManager as "npm" | "yarn" | "pnpm";
    }
  }

  return "npm";
}
