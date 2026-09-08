import { copyFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
copyFileSync(join(root, 'index.source.html'), join(root, 'index.html'));

const build = spawnSync('npx', ['vite', 'build'], { cwd: root, stdio: 'inherit', shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

const dist = join(root, 'dist');
const assets = join(root, 'assets');
if (existsSync(assets)) rmSync(assets, { recursive: true, force: true });
cpSync(dist, root, { recursive: true });
