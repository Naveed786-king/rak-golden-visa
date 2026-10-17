#!/usr/bin/env bash
# Starts the website inside GitHub Codespaces and makes it public.
cd "$(dirname "$0")/.."
mkdir -p /workspaces/rgv-data
if [ ! -f /workspaces/rgv-data/.env ]; then
  SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")
  PASS=$(node -e "console.log('Rgv-'+require('crypto').randomBytes(6).toString('hex'))")
  printf 'JWT_SECRET=%s\nADMIN_EMAIL=admin@rakgoldenvisa.com\nADMIN_PASSWORD=%s\n' "$SECRET" "$PASS" > /workspaces/rgv-data/.env
fi
set -a; . /workspaces/rgv-data/.env; set +a
export NEXT_PUBLIC_SITE_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
[ -d .next ] || npm run build
pkill -f "next start" 2>/dev/null || true
nohup npm start > /workspaces/rgv-data/server.log 2>&1 &
gh codespace ports visibility 3000:public -c "$CODESPACE_NAME" >/dev/null 2>&1 || true
echo "Website: $NEXT_PUBLIC_SITE_URL"
echo "Admin:   $NEXT_PUBLIC_SITE_URL/admin  (login in /workspaces/rgv-data/.env)"
