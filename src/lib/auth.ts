import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import { SESSION_COOKIE, signSession, verifySession, sessionCookieOptions, SessionPayload } from './jwt';

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10);
}

export async function checkPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/**
 * Login cookie + live database check: the account must still exist and be active,
 * and the role comes from the database (a disabled or downgraded admin loses access at once).
 */
export async function getVerifiedSession(): Promise<SessionPayload | null> {
  const s = await getSession();
  if (!s) return null;
  const user = await prisma.user.findUnique({ where: { id: s.sub }, select: { id: true, role: true, name: true, email: true, active: true } });
  if (!user || !user.active) return null;
  return { sub: user.id, role: user.role as SessionPayload['role'], name: user.name, email: user.email };
}

export async function getCurrentUser() {
  const s = await getSession();
  if (!s) return null;
  const user = await prisma.user.findUnique({ where: { id: s.sub } });
  if (!user || !user.active) return null;
  return user;
}

export async function startSession(user: { id: string; role: string; name: string; email: string }) {
  const token = await signSession({
    sub: user.id,
    role: user.role as SessionPayload['role'],
    name: user.name,
    email: user.email,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function endSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { ...sessionCookieOptions, maxAge: 0 });
}

export function isStaff(role?: string | null) {
  return role === 'ADMIN' || role === 'EDITOR';
}

/** Returns the staff session or null */
export async function requireStaff() {
  const s = await getVerifiedSession();
  if (!s || !isStaff(s.role)) return null;
  return s;
}

export async function requireAdmin() {
  const s = await getVerifiedSession();
  if (!s || s.role !== 'ADMIN') return null;
  return s;
}
