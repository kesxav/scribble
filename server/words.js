import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser"

console.log("words loaded")

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "words", "Skribbl-words.csv");

const loadWords = () => {
  return new Promise((resolve, reject) => {
    const words = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.word) {
          words.push(row.word.trim());
        }
      })
      .on("end", () => {
        console.log(`✅ Words loaded: ${words.length}`);
        resolve(words);
      })
      .on("error", (err) => {
        console.error("❌ CSV load failed:", err);
        reject(err);
      });
  });
}

export default loadWords;