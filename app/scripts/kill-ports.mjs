#!/usr/bin/env node

/**
 * 检测并强制关闭占用指定端口的进程
 * 用于 dev server 启动前清理残留进程
 */

const ports = [3002, 3003];
const { execSync } = await import('child_process');

for (const port of ports) {
  try {
    // 查找占用端口的 PID
    const result = execSync(`ss -tlnp 2>/dev/null | grep ':${port} ' || true`, {
      encoding: 'utf-8',
    });

    if (!result.trim()) {
      console.log(`[kill-ports] 端口 ${port} 空闲，无需处理`);
      continue;
    }

    // 从 ss 输出中提取 PID（格式: users:(("name",pid=XXX,...))
    const pidMatch = result.match(/pid=(\d+)/);
    if (!pidMatch) {
      console.log(`[kill-ports] 端口 ${port} 被占用，但无法解析 PID，跳过`);
      continue;
    }

    const pid = pidMatch[1];
    console.log(`[kill-ports] 端口 ${port} 被 PID ${pid} 占用，正在关闭...`);
    execSync(`kill -9 ${pid}`, { stdio: 'inherit' });
    console.log(`[kill-ports] 已关闭 PID ${pid} (端口 ${port})`);
  } catch (err) {
    console.log(`[kill-ports] 端口 ${port} 检查完成`);
  }
}
