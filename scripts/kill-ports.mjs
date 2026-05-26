#!/usr/bin/env node
// 委托到 app/scripts/kill-ports.mjs
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
execSync('node app/scripts/kill-ports.mjs', { stdio: 'inherit', cwd: join(__dirname, '..') });
