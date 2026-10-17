import nodemailer from 'nodemailer';
import { getSetting } from './settings';

export async function sendMail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  try {
    const smtp = await getSetting('smtp');
    const site = await getSetting('site');
    if (!smtp.host || !opts.to) return false;
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port) || 587,
      secure: !!smtp.secure,
      auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    });
    await transporter.sendMail({
      from: smtp.from || `${site.name} <${smtp.user}>`,
      to: opts.to,
      subject: opts.subject,
      html: wrap(opts.html, site.name),
      replyTo: opts.replyTo,
    });
    return true;
  } catch (e) {
    console.error('[mail] failed:', (e as Error).message);
    return false;
  }
}

export async function notifyAdmin(subject: string, html: string, replyTo?: string) {
  const smtp = await getSetting('smtp');
  const site = await getSetting('site');
  const to = smtp.notifyEmail || site.emailVisa || site.emailGeneral;
  return sendMail({ to, subject, html, replyTo });
}

function wrap(body: string, brand: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f1e8;font-family:Arial,Helvetica,sans-serif;color:#1d2433">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
  <tr><td style="background:#0a1222;padding:22px 28px;color:#e9d5a6;font-size:20px;font-weight:bold;letter-spacing:1px">${brand}</td></tr>
  <tr><td style="padding:28px;font-size:15px;line-height:1.6">${body}</td></tr>
  <tr><td style="padding:16px 28px;background:#faf7f0;font-size:12px;color:#777">This is an automated message from ${brand}.</td></tr>
  </table></td></tr></table></body></html>`;
}

export function escapeHtml(s: string) {
  return (s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

export function rowsTable(rows: [string, string | null | undefined][]) {
  return `<table cellpadding="6" style="border-collapse:collapse;width:100%">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #eee;color:#888;width:35%">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee">${escapeHtml(String(v))}</td></tr>`
    )
    .join('')}</table>`;
}
