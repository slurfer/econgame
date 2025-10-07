// @/scripts/loadItems.js
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.resolve(__dirname, "../config/items.csv");
const jsonPath = path.resolve(__dirname, "../data/items.json");

export function loadItems() {
  const csvData = fs.readFileSync(csvPath, "utf8").trim();

  const lines = csvData.split("\n");

  // Zpracování jednotlivých řádků
  const items = lines.map((line) => {
    const parts = line.split(/\t/); // rozdělí podle tabulátoru nebo více mezer
    const name = parts[0];
    const prices = parts.slice(1).map(Number);

    return { name, prices };
  });

  // Výstupní objekt
  const output = { items };

  // Zápis do JSON souboru
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2), "utf8");

  console.log(`✅ Soubor ${path.basename(jsonPath)} byl úspěšně vytvořen.`);
}
