import { rename, readdir, stat, unlink, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve, posix } from 'node:path';

const distDir = resolve(import.meta.dirname, '../dist');

async function findImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findImages(full)));
    } else if (/\.(png|jpe?g|gif|svg|webp)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function imageToDataUri(buffer, filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const mimeMap = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp',
  };
  return `data:${mimeMap[ext] || 'application/octet-stream'};base64,${buffer.toString('base64')}`;
}

async function buildImageMap(html) {
  const imagesDir = join(distDir, 'images');
  let images;
  try {
    images = await findImages(imagesDir);
  } catch {
    return html;
  }

  console.log(`  Processing ${images.length} images...`);

  // Build a single map of all image paths → data URIs
  // Inject as a runtime src interceptor — handles both static and dynamic references
  const uriMap = new Map();
  for (const imgPath of images) {
    const buf = await readFile(imgPath);
    const relKey = '/' + posix.relative(distDir, imgPath);
    uriMap.set(relKey, imageToDataUri(buf, imgPath));
  }

  const mapEntries = [...uriMap.entries()]
    .map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`)
    .join(',');

  const interceptor = `<script>!function(){var m={${mapEntries}};var o=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");Object.defineProperty(HTMLImageElement.prototype,"src",{set:function(v){if(typeof v==="string"){var k=v.replace(/^\\.\\//,"/");if(m[k])v=m[k]}o.set.call(this,v)},get:o.get})}();</script>`;
  html = html.replace('<head>', '<head>' + interceptor);
  console.log(`  Injected src interceptor for ${uriMap.size} images.`);

  return html;
}

async function cleanExtras() {
  const entries = await readdir(distDir);
  for (const entry of entries) {
    if (entry === 'seminar.html' || entry === '.gitkeep') continue;
    const full = join(distDir, entry);
    const s = await stat(full);
    if (s.isFile()) {
      await unlink(full);
    } else if (s.isDirectory()) {
      await rm(full, { recursive: true });
    }
  }
}

async function main() {
  const src = join(distDir, 'index.html');
  const dest = join(distDir, 'seminar.html');

  await rename(src, dest);

  let html = await readFile(dest, 'utf-8');
  html = await buildImageMap(html);
  await writeFile(dest, html, 'utf-8');

  await cleanExtras();

  const { size } = await stat(dest);
  const mb = (size / 1024 / 1024).toFixed(2);
  console.log(`\n  Standalone build complete: seminar.html (${mb} MB)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
