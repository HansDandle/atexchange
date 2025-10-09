// Remove files larger than 25 MiB from .next after build so Cloudflare Pages validation passes
// Run automatically after `next build` via the "pages:build" script
const fs = require('fs');
const path = require('path');

const MAX_BYTES = 25 * 1024 * 1024; // 25 MiB
const NEXT_DIR = path.resolve(__dirname, '..', '.next');

function findLargeFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(findLargeFiles(full));
    } else {
      const stats = fs.statSync(full);
      if (stats.size > MAX_BYTES) results.push({ path: full, size: stats.size });
    }
  }
  return results;
}

function main() {
  if (!fs.existsSync(NEXT_DIR)) {
    console.log('.next not found, nothing to strip.');
    return;
  }

  const large = findLargeFiles(NEXT_DIR);
  if (large.length === 0) {
    console.log('No files over 25 MiB found.');
    return;
  }

  console.log('Found large files:');
  for (const f of large) {
    console.log(` - ${f.path} (${(f.size / (1024*1024)).toFixed(2)} MiB)`);
  }

  // Remove them
  for (const f of large) {
    try {
      fs.unlinkSync(f.path);
      console.log(`Removed ${f.path}`);
    } catch (err) {
      console.error(`Failed to remove ${f.path}: ${err.message}`);
    }
  }

  console.log('Large file removal complete.');
}

main();
