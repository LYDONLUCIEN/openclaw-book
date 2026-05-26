#!/usr/bin/env bash
# Vite Dev Server 管理脚本 (tmux)
# 用法: ./scripts/dev.sh [start|stop|restart|attach|status|logs]

SESSION="openclaw-dev"
TMUX_CMD="tmux new-session -d -s $SESSION -c /home/gitclone/openclaw-book/app"

case "${1:-start}" in
  start)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "[dev] tmux session '$SESSION' 已存在"
      # 检查 vite 是否还在运行
      if tmux capture-pane -t "$SESSION" -p | grep -q "VITE.*ready\|Local:" 2>/dev/null; then
        echo "[dev] vite 服务正在运行，使用 attach 查看或 restart 重启"
        exit 0
      fi
      echo "[dev] vite 未响应，执行 restart"
      exec "$0" restart
    fi

    # 先清理端口
    echo "[dev] 清理端口 3002/3003..."
    node /home/gitclone/openclaw-book/app/scripts/kill-ports.mjs 2>/dev/null

    # 创建 tmux session 并启动 vite
    echo "[dev] 启动 vite dev server (tmux: $SESSION)..."
    $TMUX_CMD "npm run dev"
    echo "[dev] 等待服务就绪..."
    for i in $(seq 1 20); do
      if curl -s -o /dev/null -w "" --connect-timeout 2 http://localhost:3002 2>/dev/null; then
        echo "[dev] 服务已就绪: http://localhost:3002"
        exit 0
      fi
      sleep 1
    done
    echo "[dev] 服务启动中...使用 attach 查看日志"
    ;;

  stop)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "[dev] 关闭 session '$SESSION'..."
      tmux kill-session -t "$SESSION"
      echo "[dev] 已关闭"
    else
      echo "[dev] session '$SESSION' 不存在"
    fi
    node /home/gitclone/openclaw-book/app/scripts/kill-ports.mjs 2>/dev/null
    ;;

  restart)
    echo "[dev] 重启 vite dev server..."
    "$0" stop
    "$0" start
    ;;

  attach)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      tmux attach-session -t "$SESSION"
    else
      echo "[dev] session '$SESSION' 不存在，请先 start"
      exit 1
    fi
    ;;

  status)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "[dev] session '$SESSION': 运行中"
      if curl -s -o /dev/null -w "" --connect-timeout 2 http://localhost:3002 2>/dev/null; then
        echo "[dev] vite: 正常 (http://localhost:3002)"
      else
        echo "[dev] vite: 未响应"
      fi
    else
      echo "[dev] session '$SESSION': 未运行"
    fi
    ;;

  logs)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      tmux capture-pane -t "$SESSION" -p -S -50
    else
      echo "[dev] session '$SESSION' 不存在"
    fi
    ;;

  *)
    echo "用法: $0 {start|stop|restart|attach|status|logs}"
    echo ""
    echo "  start    启动 vite dev server (默认)"
    echo "  stop     停止服务并清理"
    echo "  restart  重启服务"
    echo "  attach   进入 tmux 终端查看日志"
    echo "  status   查看服务状态"
    echo "  logs     查看最近日志"
    exit 1
    ;;
esac
