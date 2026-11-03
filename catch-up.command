#!/bin/bash
# Cycle for Change — bring this folder up to date with main (made by Claude, Oct 17, 2026).
# Double-click it after a PR has been merged on GitHub. It only fast-forwards; it never overwrites your work.
cd "$(dirname "$0")" || exit 1
echo "Pulling main…"
git pull --ff-only origin main && echo && echo "Done. You're at: $(git log --oneline -1)"
echo
read -n 1 -s -r -p "Press any key to close."
