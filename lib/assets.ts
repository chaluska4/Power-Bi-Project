import fs from "node:fs";
import path from "node:path";

export function publicAssetExists(fileName: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", fileName));
}
