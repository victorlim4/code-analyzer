import { analyzer } from "./src/analyzer.js";
import fs from "fs"

const fileName = process.argv[2];

if (!fileName) {
  console.error('Indique um arquivo para ser analizado: yarn analyze example.js');
  process.exit(1);
}

analyzer(fs.readFileSync(fileName, 'utf8'));