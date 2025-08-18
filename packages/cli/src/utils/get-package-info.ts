import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

export async function getPackageInfo() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const packagePath = path.join(__dirname, "../../../package.json");
    const packageContent = await readFile(packagePath, "utf8");
    return JSON.parse(packageContent);
  } catch (error) {
    return { version: "1.0.0" };
  }
}
