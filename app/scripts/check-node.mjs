const MIN_NODE = [20, 12, 0];

const parseVer = (ver) =>
  ver
    .replace(/^v/, "")
    .split(".")
    .map((n) => parseInt(n, 10));

const current = parseVer(process.version);

const isOlder =
  current[0] < MIN_NODE[0] ||
  (current[0] === MIN_NODE[0] && current[1] < MIN_NODE[1]) ||
  (current[0] === MIN_NODE[0] && current[1] === MIN_NODE[1] && current[2] < MIN_NODE[2]);

if (isOlder) {
  const target = MIN_NODE.join(".");
  console.error(
    `\n❌  Node.js 版本不兼容\n` +
    `    当前版本: ${process.version}\n` +
    `    要求版本: >= v${target}\n\n` +
    `💡  解决方法:\n` +
    `    1. 使用 nvm 切换版本:  nvm use   (项目根目录会自动读取 .nvmrc)\n` +
    `    2. 或安装指定版本:    nvm install ${MIN_NODE[0]} && nvm use ${MIN_NODE[0]}\n` +
    `    3. 或使用 fnm:         fnm use\n\n`
  );
  process.exit(1);
}

console.log(`✅  Node.js ${process.version} 检查通过`);
