// Government fee lines for a file, from the prices in Admin > Cost calculator (RAK calculator).
import { calculate, type EstimateSettings } from '@/lib/estimate';
import type { QuoteLine } from './files';

/** Calculator category for a service name: matched on the category label, then on common words. */
function categoryFor(s: EstimateSettings, service: string): string | undefined {
  const t = service.toLowerCase();
  const byLabel = s.categories.find((c) => t.includes(c.label.toLowerCase()) || c.label.toLowerCase().includes(t));
  if (byLabel) return byLabel.id;
  const pick = (re: RegExp, id: string) => (re.test(t) ? s.categories.find((c) => c.id === id)?.id : undefined);
  return (
    pick(/retire|55\+/, 'retiree') ||
    pick(/investor|business|company|partner/, 'investor') ||
    pick(/professional|salary|employ|skilled/, 'professional') ||
    pick(/property|real estate|golden/, 'property') ||
    s.categories[0]?.id
  );
}

const line = (label: string, qty: number, unit: number): QuoteLine => ({ label, qty, unit, amount: Math.round(qty * unit * 100) / 100 });

/** Lines for the main applicant, adults and children (and the once-per-file fees). */
export function governmentLines(s: EstimateSettings, o: { service: string; location: 'in' | 'out'; adults: number; kids: number; vip: boolean; newFile: boolean }): QuoteLine[] {
  const renew = /renew/i.test(o.service);
  const type = s.types.find((x) => x.id === (renew ? 'renewal' : 'new'))?.id || s.types[0]?.id;
  const res = calculate(s, {
    category: categoryFor(s, o.service),
    type,
    location: o.location === 'out' ? 'outside' : 'inside',
    adults: 1 + Math.max(0, o.adults || 0),
    children: Math.max(0, o.kids || 0),
    medical: o.vip ? 'vip' : 'normal',
    sponsor: (o.adults || o.kids) && o.newFile ? 'needs' : '',
  });
  const out: QuoteLine[] = [];
  for (const g of res.groups) {
    const who = g.key === 'main' ? 'Main applicant' : g.key === 'adult' ? (g.count > 1 || res.groups.some((x) => x.key === 'main') ? 'Adult' : 'Applicant') : g.key === 'child' ? 'Child' : '';
    for (const l of g.lines) out.push(line(who ? `${who}: ${l.label}` : l.label, g.count, l.amount));
  }
  return out.filter((l) => l.amount > 0);
}
