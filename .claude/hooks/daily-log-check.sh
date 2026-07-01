#!/usr/bin/env bash
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

STATE_FILE=".claude/.daily-log-hash"
TODAY=$(date +%Y-%m-%d)

CHANGES=$(git status --porcelain -- 00-MOC 01-Notes 02-Sources Templates 2>/dev/null)
if [ -z "$CHANGES" ]; then
  echo "{}"
  exit 0
fi

HASH=$(printf '%s' "$CHANGES" | md5sum | cut -d' ' -f1)
PREV=$(cat "$STATE_FILE" 2>/dev/null || true)
if [ "$HASH" = "$PREV" ]; then
  echo "{}"
  exit 0
fi

mkdir -p .claude
printf '%s' "$HASH" > "$STATE_FILE"

REASON="오늘(${TODAY}) 볼트에 아직 03-Daily에 기록되지 않은 변경사항이 있습니다. 이번 세션에서 만든/수정한 파일을 요약해서 03-Daily/${TODAY}.md에 작업 로그로 남겨주세요 (파일이 없으면 새로 생성, 있으면 이어서 추가). 작성 후 다시 응답을 마쳐도 됩니다."
printf '{"decision":"block","reason":"%s"}' "$REASON"
