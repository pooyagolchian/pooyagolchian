#!/usr/bin/env bash
# check-links.sh — health-check every URL in a README and flag known-flaky widget hosts.
# Usage: bash check-links.sh [path/to/README.md]   (default: repo-root README.md)
# Exit: 0 if all links are healthy, 1 if any hard failure is found.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
README="${1:-$ROOT/README.md}"

if [[ ! -f "$README" ]]; then
  echo "README not found: $README" >&2
  exit 1
fi

# Hosts whose public shared instances are known to flake (see .claude/CLAUDE.md).
FLAKY='github-readme-stats.vercel.app|github-profile-trophy.vercel.app'

# Extract URLs (strip trailing markdown/HTML punctuation), dedupe.
urls="$(grep -oE 'https?://[^ )"'"'"'<>]+' "$README" | sed 's/[).,]*$//' | sort -u)"

fail=0
printf '%-7s %s\n' "STATUS" "URL"
printf '%-7s %s\n' "------" "---"
while IFS= read -r url; do
  [[ -z "$url" ]] && continue
  code="$(curl -s -L -o /dev/null -A 'profile-doctor/1.0' -m 20 -w '%{http_code}' "$url" 2>/dev/null)"
  note=""
  if [[ "$url" =~ $FLAKY ]]; then
    note="  (known-flaky widget — see .claude/CLAUDE.md)"
  fi
  if [[ "$code" =~ ^(2|3)[0-9][0-9]$ ]]; then
    printf '%-7s %s\n' "$code" "$url"
  elif [[ -n "$note" ]]; then
    printf '%-7s %s%s\n' "$code" "$url" "$note"   # don't fail the run on known-flaky hosts
  else
    printf '%-7s %s  <== CHECK\n' "${code:-ERR}" "$url"
    fail=1
  fi
done <<< "$urls"

echo
if [[ "$fail" -eq 0 ]]; then
  echo "OK — all links healthy (known-flaky widgets ignored)."
else
  echo "FAIL — one or more links need attention (see <== CHECK)."
fi
exit "$fail"
