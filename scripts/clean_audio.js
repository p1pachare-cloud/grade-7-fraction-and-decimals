import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '../public/assets/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const activeFiles = new Set(Object.values(audioMap).map((p) => path.basename(p)));
const existingFiles = fs.readdirSync(audioDir);

let removedCount = 0;
existingFiles.forEach((file) => {
  if (file.endsWith('.mp3') && !activeFiles.has(file)) {
    fs.unlinkSync(path.join(audioDir, file));
    removedCount++;
    console.log(`Cleaned orphaned audio file: ${file}`);
  }
});

console.log(`Audio cleanup finished. Removed ${removedCount} orphaned files.`);
