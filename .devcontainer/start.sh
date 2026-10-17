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
cat > ADMIN-LOGIN.txt <<TXT
YOUR WEBSITE IS RUNNING
=======================
Website (front):   $NEXT_PUBLIC_SITE_URL
Admin dashboard:   $NEXT_PUBLIC_SITE_URL/admin
Client login:      $NEXT_PUBLIC_SITE_URL/login

Admin email:       $ADMIN_EMAIL
Admin password:    $ADMIN_PASSWORD
(change it after login: Admin -> My profile)

The first start takes about 1 minute. If the link shows an error, wait and refresh.
TXT
cat ADMIN-LOGIN.txt
