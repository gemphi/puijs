import { mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('src');
const output = path.resolve('dist');

async function copyScssFiles(from, to) {
  const entries = await readdir(from, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(from, entry.name);
    const outputPath = path.join(to, entry.name);

    if (entry.isDirectory()) {
      await copyScssFiles(sourcePath, outputPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.scss')) {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await copyFile(sourcePath, outputPath);
    }
  }
}

await copyScssFiles(source, output);
