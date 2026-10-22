import { existsSync, unlinkSync } from "node:fs";
import sharp from "sharp";

const source = "public/dashboard.png";
const hero = "public/dashboard-hero.jpg";
const stalePng = "public/dashboard-hero.png";

if (existsSync(stalePng)) unlinkSync(stalePng);

if (!existsSync(source)) {
  console.log("No public/dashboard.png yet — skipping hero thumbnail.");
  process.exit(0);
}

await sharp(source)
  .resize({ width: 960, withoutEnlargement: true })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(hero);

const info = await sharp(hero).metadata();
console.log(`Wrote ${hero} (${info.width}x${info.height}).`);
