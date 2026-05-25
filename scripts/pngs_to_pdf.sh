#!/bin/bash
# 将指定目录中的 PNG 图片按编号顺序组装成 PDF
# 用法: ./pngs_to_pdf.sh -d <图片目录> [-o 输出.pdf] [-p 前缀]
# 示例: ./pngs_to_pdf.sh -d ./screenshots
#        ./pngs_to_pdf.sh -d ./screenshots -o 输出.pdf
#        ./pngs_to_pdf.sh -d ./screenshots -p slide -o 输出.pdf
#        ./pngs_to_pdf.sh -d ./screenshots -p page

set -euo pipefail

# 默认值
PREFIX="slide"
DIR=""
OUTPUT="AI智能体讲座.pdf"

while getopts "d:o:p:h" opt; do
  case $opt in
    d) DIR="$OPTARG" ;;
    o) OUTPUT="$OPTARG" ;;
    p) PREFIX="$OPTARG" ;;
    h)
      echo "用法: $0 -d <图片目录> [-o 输出PDF] [-p 文件前缀]"
      echo "  -d  图片所在目录（必填）"
      echo "  -o  输出 PDF 文件名（默认: AI智能体讲座.pdf）"
      echo "  -p  PNG 文件名前缀（默认: slide）"
      echo "示例:"
      echo "  $0 -d ./screenshots -p slide"
      echo "  $0 -d ./ppt内容 -p slide -o ./ppt内容/ppt素材-v1.pdf"
      exit 0
      ;;
    *)
      echo "用法: $0 -d <图片目录> [-o 输出PDF] [-p 文件前缀]"
      exit 1
      ;;
  esac
done

if [ -z "$DIR" ]; then
  echo "错误: 必须指定图片目录 (-d)"
  echo "用法: $0 -d <图片目录> [-o 输出PDF] [-p 文件前缀]"
  exit 1
fi

if [ ! -d "$DIR" ]; then
  echo "错误: 目录 '$DIR' 不存在"
  exit 1
fi

# 检查依赖
if ! command -v magick &>/dev/null; then
  echo "错误: 需要 ImageMagick (magick 命令)"
  echo "  macOS:   brew install imagemagick"
  echo "  Ubuntu:  sudo apt install imagemagick"
  exit 1
fi

# 收集 png 文件并排序
# 排序规则:
#   1) 提取 <前缀>_XX 中的编号作为主排序键
#   2) 提取 (N) 副本编号作为次排序键（无括号的排最前）
#   3) 按 .png / .PNG 大小写不敏感匹配
SORTED=$(mktemp)
trap 'rm -f "$SORTED"' EXIT

# 转义前缀用于 grep 的 -i 匹配（大小写不敏感）
find "$DIR" -maxdepth 1 -type f -iname "${PREFIX}*.png" | while IFS= read -r f; do
  basename=$(basename "$f")
  # 提取前缀后的编号: PREFIX03.png -> 03, PREFIX03 (1).png -> 03
  # 先转小写再匹配，兼容 macOS sed
  lowername=$(echo "$basename" | tr '[:upper:]' '[:lower:]')
  lowerprefix=$(echo "$PREFIX" | tr '[:upper:]' '[:lower:]')
  num=$(echo "$lowername" | sed -n "s/^${lowerprefix}\([0-9]*\).*/\1/p")
  # 提取副本编号: (1) -> 1, 无括号 -> 0
  copy=$(echo "$basename" | sed -n 's/.*(\([0-9]*\)).*/\1/p')
  [ -z "$copy" ] && copy=0
  # 强制十进制避免前导零被当八进制
  num=$((10#$num))
  copy=$((10#$copy))
  printf "%03d_%03d\t%s\n" "$num" "$copy" "$f"
done | sort -t$'\t' -k1,1 | cut -f2 > "$SORTED"

TOTAL=$(wc -l < "$SORTED" | tr -d ' ')
if [ "$TOTAL" -eq 0 ]; then
  echo "错误: 目录 '$DIR' 中没有找到 ${PREFIX}_*.png 文件"
  exit 1
fi

echo "找到 $TOTAL 张图片，正在生成 PDF..."

# 用 ImageMagick 组装: 每张图片一页，保持原始分辨率
# tr '\n' '\0' + xargs -0 避免文件名中的空格问题
IMAGES=()
while IFS= read -r line; do
  IMAGES+=("$line")
done < "$SORTED"

magick "${IMAGES[@]}" "$OUTPUT"

echo "完成: $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
