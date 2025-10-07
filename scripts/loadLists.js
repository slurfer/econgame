// @/scripts/loadLists.js
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.resolve(__dirname, "../config/lists.csv");
const itemsJsonPath = path.resolve(__dirname, "../data/items.json");
const outputPath = path.resolve(__dirname, "../data/lists.json");

// Helper: calculate median of an array of numbers
function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

export function loadLists() {
  // Load items
  if (!fs.existsSync(itemsJsonPath)) {
    throw new Error("items.json not found. Run loadItems first!");
  }
  const itemsData = JSON.parse(fs.readFileSync(itemsJsonPath, "utf8"));
  const itemsMap = new Map();
  itemsData.items.forEach((item) => {
    itemsMap.set(item.name.toLowerCase(), item.prices);
  });

  // Load lists CSV
  const csvData = fs.readFileSync(csvPath, "utf8").trim();
  const lines = csvData.split("\n");

  const shoppingLists = lines
    .map((line) => {
      const parts = line
        .split(/\t/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (parts.length === 0) return null;

      const name = parts[0];
      const itemNames = parts.slice(1);

      // Calculate sum of medians
      let price = 0;
      for (const itemName of itemNames) {
        const prices = itemsMap.get(itemName.toLowerCase());
        if (!prices) {
          throw new Error(`Item "${itemName}" not found in items.json`);
        }
        price += median(prices);
      }

      return {
        name,
        price,
        items: itemNames,
      };
    })
    .filter(Boolean);

  // Write output
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ shoppingLists }, null, 2),
    "utf8"
  );

  console.log(`✅ Shopping lists saved to ${path.basename(outputPath)}`);
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  loadLists();
}
