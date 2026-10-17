# RAK Golden Visa — Next.js Website + Admin Panel + Client Portal

A complete, production-ready website for **RAK Golden Visa / Brightlink**, rebuilt in **Next.js 15** with a new luxury Dubai-style animated design, a **full admin panel** (edit every page, header, footer, prices, FAQs, blog, settings…) and a **client login portal** (apply online, upload documents, track status, chat with your team in real time).

---

## ▶ Run it free on GitHub (Codespaces)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Naveed786-king/rak-golden-visa?quickstart=1)

Click the button → **Create codespace**. Wait ~3 minutes. The file **ADMIN-LOGIN.txt** opens with your website link, admin link and password.
Free (GitHub gives 60 hours/month). The site sleeps when the codespace is idle — reopen it from github.com/codespaces to wake it.

---

## 1. What is included

### Public website
- All pages from the old site, redesigned: **Home, About Us, Services, RAK Investor Visa, RAK Retirement Visa, Blogs, Contact Us**, plus **Privacy Policy** and **Terms**.
- Same URLs as the old WordPress site (`/about-us`, `/services`, `/ras-al-khaimah-property-golden-visa`, `/ras-al-khaimah-retirement-visa`, `/latest-news-blogs`, `/contact-us`, blog posts at `/post-slug`) → your Google rankings are kept.
- Luxury navy + gold design, Arabic accents, animated hero with 3D Golden Visa card, scroll animations, animated counters, tabs, accordions, marquee logos, pricing packages, comparison tables.
- **Interactive eligibility checker** (property value / age / income sliders → instant result).
- **Online application wizard** (`/apply`) — 3 steps, document upload, creates a client account.
- Floating WhatsApp button with greeting bubble, mobile Call/WhatsApp bar, back-to-top.
- SEO: meta titles/descriptions per page, Open Graph, `sitemap.xml`, `robots.txt`, FAQ + Organization + Article structured data.
- Very fast: pages are pre-rendered and cached, refreshed automatically when you save in the admin.

### Client portal (front login)
- `/register`, `/login`, `/forgot-password` (email reset link).
- `/account` dashboard: all applications with live progress bars.
- Each application: status timeline, consultant notes, **live chat** with your team, secure document upload/download.
- Auto-refreshes every few seconds — clients see updates in real time.

### Admin panel (`/admin`)
| Section | What you can do |
|---|---|
| **Dashboard** | Leads chart (14 days), applications by status, latest leads/applications, most-read posts |
| **Leads & enquiries** | Every form submission. Status (new → contacted → qualified → converted → closed), internal notes, WhatsApp/call buttons, filters, **Export CSV** |
| **Applications** | Change status (client gets email + portal update), progress %, note for client, chat, share/delete documents |
| **Customers** | Edit clients, reset passwords, disable accounts, export |
| **Subscribers** | Newsletter emails + export |
| **Pages** | **Drag-and-drop page builder** with 28 section types. Add/move/hide/duplicate/delete sections, edit every text, image, button, list. SEO per page. **Live preview** (desktop/mobile). Create new pages. |
| **Blog posts** | Rich text editor (headings, lists, links, images, tables, HTML mode), cover image, category, tags, SEO, drafts, scheduled date |
| **Services & prices** | All services with price, icon/image, order, show/hide |
| **FAQs** | Grouped (home / investor / retirement / your own groups) |
| **Testimonials** | Client reviews with rating and photo |
| **Partner logos** | Logos marquee |
| **Media library** | Upload/reuse images (drag & drop) |
| **Header & menu** | Menu items, dropdowns, top announcement bar, header button, login icon |
| **Footer** | CTA strip, columns & links, newsletter, copyright, disclaimer |
| **Site settings** | Logo, favicon, phone, WhatsApp, emails, address, hours, map, social links, **brand colours**, SEO defaults, Google Analytics / Pixel scripts, feature switches, **SMTP email** (with test button) |
| **Admin users** | Add Admins and Editors (Editors can't change settings or users) |
| **Notifications** | Bell + sound + toast when a new lead, application or client message arrives (real time) |

Special link words you can use in any button: `whatsapp` (opens WhatsApp with your number), `phone` (calls you), `email`.

---

## 2. Run it on your computer (test first)

**You need:** [Node.js 20 or 22 LTS](https://nodejs.org) installed.

```bash
# 1. unzip the project, open a terminal in the folder, then:
npm install

# 2. create your settings file
cp .env.example .env          # on Windows: copy .env.example .env

# 3. create the database + all content + the admin account
npm run setup

# 4. start
npm run dev
```

Open:
- Website → http://localhost:3000
- Admin → http://localhost:3000/admin  (login: `admin@rakgoldenvisa.com` / `Admin@12345` — **change it** in Admin → My profile)

---

## 3. Before you go live — edit `.env`

```env
DATABASE_URL="file:./data.db"              # keep this (SQLite) unless you use MySQL, see section 6
JWT_SECRET="a-long-random-secret"          # REQUIRED: make a new one ↓
NEXT_PUBLIC_SITE_URL="https://rakgoldenvisa.com"
ADMIN_EMAIL="you@yourdomain.com"
ADMIN_PASSWORD="YourStrongPassword123"
UPLOAD_DIR="uploads"
```

Make a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

---

## 4. Hosting option A — VPS (recommended: Hostinger VPS, Contabo, DigitalOcean…)

Best speed and full control. Ubuntu 22.04/24.04, 1–2 GB RAM is enough.

```bash
# --- on the server (SSH as root) ---
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs nginx unzip
npm install -g pm2

# upload the zip (FileZilla / scp) to /var/www, then:
cd /var/www && unzip rak-golden-visa.zip && cd rak-golden-visa
cp .env.example .env && nano .env        # fill in your values (section 3)
npm install
npm run build                            # creates DB, content, admin, and builds the site
pm2 start ecosystem.config.js
pm2 save && pm2 startup                  # auto-start after reboot
```

**Nginx** — create `/etc/nginx/sites-available/rakgoldenvisa`:

```nginx
server {
    server_name rakgoldenvisa.com www.rakgoldenvisa.com;
    client_max_body_size 20M;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
ln -s /etc/nginx/sites-available/rakgoldenvisa /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx
certbot --nginx -d rakgoldenvisa.com -d www.rakgoldenvisa.com     # free SSL (https)
```

**Domain:** in your domain DNS, set an **A record** for `@` and `www` → your VPS IP address.

---

## 5. Hosting option B — cPanel / Hostinger shared hosting with "Node.js App"

Your plan must support **Node.js applications** (cPanel → *Setup Node.js App*, or Hostinger hPanel → *Websites → Node.js*). Node version **20 or newer**.

1. **Upload:** File Manager → upload the zip into your home folder (e.g. `/home/USER/rak-golden-visa`) → *Extract*.
2. **Create the app:** *Setup Node.js App* → **Create Application**
   - Node.js version: **20+** · Application mode: **Production**
   - Application root: `rak-golden-visa`
   - Application URL: your domain
   - Application startup file: **`server.js`**
3. **Environment variables:** add the values from section 3 in the app screen (or edit the `.env` file in File Manager).
4. Click **Run NPM Install**.
5. Open **Terminal** in cPanel (or SSH). Copy the "enter virtual environment" command shown at the top of the Node.js app page, run it, then:
   ```bash
   cd ~/rak-golden-visa
   npm run build
   ```
6. Back in *Setup Node.js App* → **Restart**. Open your domain. Done ✅

> If `npm run build` stops with "out of memory" on small shared plans: run `npm install && npm run build` on your own computer, then upload the whole folder **including** the `.next` folder and `prisma/data.db`, and only click *Run NPM Install* + *Restart* on the server.

---

## 6. Using MySQL instead of SQLite (optional)

SQLite (a single file `prisma/data.db`) is fast and needs no setup — fine for this website. If your host requires MySQL:

1. cPanel → *MySQL Databases*: create a database + user, give the user ALL privileges.
2. In `.env`: `DATABASE_URL="mysql://DBUSER:DBPASSWORD@localhost:3306/DBNAME"`
3. Run `npm run build`. The right database type is picked automatically from `DATABASE_URL` (SQLite, MySQL or PostgreSQL).

---

## 7. Hosting option C — Vercel (free, always on, no server to manage)

Everything works on Vercel: the database is a free hosted PostgreSQL, and uploaded images/documents are stored inside that database.

1. Sign in at **vercel.com** with your GitHub account → **Add New… → Project** → import `rak-golden-visa` → **Deploy**.
   (The first deploy fails because there is no database yet — that's expected.)
2. In the project: **Storage → Create Database → Neon (Postgres)** (free) → **Connect** to the project.
   This adds `DATABASE_URL` automatically.
3. **Deployments → ⋯ → Redeploy**. The build creates all tables and the website content.
4. Open `https://YOUR-PROJECT.vercel.app/admin/login` → it asks you to **create the admin account** (only the first time).
5. Open **Admin → Languages** and leave it open for ~15 minutes: it translates the whole website into all languages.
   After that, everything you save is translated automatically. A daily job also fills any gaps.
6. Your own domain: project → **Settings → Domains**.

Optional environment variables (project → Settings → Environment Variables): `JWT_SECRET` (any long random text),
`NEXT_PUBLIC_SITE_URL` (your domain, e.g. `https://rakgoldenvisa.com`). Uploads on Vercel are limited to 4 MB per file.

---

## 8. After going live — checklist

1. Admin → **My profile** → change the admin email & password.
2. Admin → **Site settings** → upload your **logo** and **favicon**, check phone, WhatsApp, emails, address, map link.
3. Site settings → **Email (SMTP)** → enter your email account details → **Test**. (Without this, the site works but no emails are sent.)
   - cPanel email: host `mail.yourdomain.com`, port `465`, SSL on, user = full email address.
   - Google Workspace: `smtp.gmail.com`, port `465`, SSL on, use an *App password*.
4. Admin → **Testimonials** → replace the 3 hidden samples with real reviews and switch them to *Active*.
5. Admin → **Partner logos** → upload the logo images.
6. Add photos to sections (Pages → edit → image fields) and blog cover images.
7. Site settings → **Tracking & scripts** → paste Google Analytics / Tag Manager / Meta Pixel.
8. Google Search Console → submit `https://yourdomain.com/sitemap.xml`.
9. Review the Privacy Policy and Terms pages with your legal adviser.

---

## 9. Everyday use

- **Edit a page:** Admin → Pages → *Edit* → click a section → change text → **Save** (Ctrl+S). Live in seconds.
- **Add a section:** hover between sections → *Add section here* → pick a type.
- **New page:** Pages → *New page* → choose "Copy design of …" to reuse a layout. Add it to the menu in *Header & menu*.
- **Change prices:** Services & prices (service cards) and inside pages (price card, packages, tables).
- **Reply to a client:** Applications → open → write in the chat (tick "Also send by email").
- **Restore the original content:** `npm run seed:reset` (keeps users, leads and applications).
- **Forgot admin password:** on the server run `node prisma/create-admin.mjs you@email.com "NewPassword123" "Your Name"`.

---

## 10. Backups (important)

Back up these two things regularly (download them from File Manager or with `scp`):
- `prisma/data.db` — the whole database (skip if you use MySQL; back up MySQL from phpMyAdmin instead)
- `uploads/` — all uploaded images and client documents

---

## 11. Updating the code later

```bash
# replace the code files (keep .env, prisma/data.db and uploads/), then:
npm install
npm run build
pm2 restart rak-golden-visa      # VPS   (cPanel: click Restart)
```

---

## 12. Tech stack

Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · Prisma ORM (SQLite or MySQL) · JWT auth (httpOnly cookies, bcrypt passwords) · Nodemailer · Lucide icons.

Folder map:
```
prisma/            database schema, seed content (content.mjs, faqs.json)
src/app/(site)/    public pages, login, apply, client portal (/account)
src/app/admin/     admin panel
src/app/api/       all API routes (public, auth, account, admin)
src/components/    blocks (page sections), site (header/footer), admin, portal, ui
src/lib/           database, auth, settings, email, uploads
uploads/           uploaded files (media + private client documents)
```

## 13. Troubleshooting

| Problem | Fix |
|---|---|
| `JWT_SECRET` warning / logged out often | Set a long `JWT_SECRET` in `.env`, restart |
| Changes in admin not visible | Hard refresh (Ctrl+F5). Pages refresh automatically on save |
| Images don't upload | Check folder `uploads/` is writable; Nginx `client_max_body_size 20M` |
| Emails not arriving | Site settings → Email (SMTP) → Test; check spam; use port 465 + SSL |
| `Prisma` error on cPanel | Make sure Node 20+, then *Run NPM Install* again and `npm run build` |
| 502 Bad Gateway (VPS) | `pm2 logs rak-golden-visa` to see the error, `pm2 restart rak-golden-visa` |
