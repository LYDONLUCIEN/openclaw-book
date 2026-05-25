#!/bin/bash
APP_DIR="$(cd "$(dirname "$0")/app" && pwd)"
PORT=${PORT:-3003}
PID_FILE="/tmp/vite-dev-${PORT}.pid"

get_pid() {
  lsof -ti :$PORT 2>/dev/null
}

do_stop() {
  pid=$(get_pid)
  if [ -n "$pid" ]; thenßß
    echo "Stopping Vite dev server on port $PORT (PID: $pid)..."
    kill $pid 2>/dev/null
    sleep 1
    # force kill if still alive
    pid=$(get_pid)
    if [ -n "$pid" ]; then
      kill -9 $pid 2>/dev/null
    fi
    echo "Stopped."
  else
    echo "No Vite dev server running on port $PORT."
  fi
}

do_start() {
  pid=$(get_pid)
  if [ -n "$pid" ]; then
    echo "Vite dev server already running on port $PORT (PID: $pid)."
    return 0
  fi
  echo "Starting Vite dev server on port $PORT..."
  cd "$APP_DIR"
  nohup npm run dev > /tmp/vite-dev-${PORT}.log 2>&1 &
  echo $! > "$PID_FILE"
  sleep 2
  pid=$(get_pid)
  if [ -n "$pid" ]; then
    echo "Started. PID: $pid"
    echo "Log: /tmp/vite-dev-${PORT}.log"
  else
    echo "Failed to start. Check log: /tmp/vite-dev-${PORT}.log"
  fi
}

do_restart() {
  do_stop
  do_start
}

case "${1}" in
  start)   do_start ;;
  stop)    do_stop ;;
  restart) do_restart ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    echo ""
    echo "Commands:"
    echo "  start   - Start Vite dev server"
    echo "  stop    - Stop Vite dev server"
    echo "  restart - Restart Vite dev server"
    echo ""
    echo "Environment:"
    echo "  PORT     - Port number (default: 3002)"
    echo "            Usage: PORT=3005 $0 start"
    exit 1
    ;;
esac
