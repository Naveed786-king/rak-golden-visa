// Golden Visa cost estimate calculator: settings, defaults and the price calculation.
// Every label and price is editable in Admin → Cost calculator.
import type { Field } from '@/components/blocks/types';

export type FeeApplies = 'application' | 'each' | 'main' | 'dependent' | 'adult' | 'child';
export type FeeWhen = 'any' | 'inside' | 'outside';

export type FeeRule = { label: string; amount: number; applies: FeeApplies; when: FeeWhen; note?: string };
export type EstimateOption = { id: string; label: string; description?: string; icon?: string; fees: FeeRule[]; noLocationFees?: boolean; hidden?: boolean };

export type EstimateSettings = {
  title: string;
  badge: string;
  currency: string;
  footnote: string;
  step1Title: string;
  step1Text: string;
  categories: EstimateOption[];
  step2Title: string;
  step2Text: string;
  types: EstimateOption[];
  step3Title: string;
  step3Text: string;
  allowDependents: boolean;
  maxDependents: number;
  medicalMinAge: number;
  medicalNormalLabel: string;
  medicalNormal: number;
  medicalVipLabel: string;
  medicalVip: number;
  fees: FeeRule[];
  resultTitle: string;
  resultText: string;
  whatsappLabel: string;
  whatsappText: string;
  leadTitle: string;
  leadButton: string;
  leadThanks: string;
};

export const defaultEstimate: EstimateSettings = {
  title: 'RAK Golden Visa Calculator',
  badge: 'Live Government Fees',
  currency: 'AED',
  footnote: 'Estimated government fees. Insurance and our service fees are quoted on WhatsApp.',
  step1Title: 'What describes you?',
  step1Text: 'Choose the route you are applying through.',
  categories: [
    {
      id: 'property',
      label: 'Property investor',
      description: 'Ras Al Khaimah property worth AED 2M+',
      icon: 'building',
      fees: [{ label: 'Property valuation & title deed check (RAK)', amount: 1050, applies: 'application', when: 'any' }],
    },
    { id: 'retiree', label: 'Retiree (55+)', description: '5-year retirement residency', icon: 'sun', fees: [] },
    { id: 'investor', label: 'Business investor', description: 'Company owner / partner', icon: 'briefcase', fees: [{ label: 'Trade licence & capital verification', amount: 750, applies: 'application', when: 'any' }] },
    { id: 'professional', label: 'Skilled professional', description: 'Salary AED 30,000+', icon: 'student', fees: [] },
  ],
  step2Title: 'New visa or renewal?',
  step2Text: 'Renewals inside the UAE skip the entry permit.',
  types: [
    { id: 'new', label: 'New visa', description: 'First Golden Visa application', icon: 'sparkles', fees: [] },
    { id: 'renewal', label: 'Renewal', description: 'Renew an existing Golden Visa', icon: 'file-check', fees: [], noLocationFees: true },
  ],
  step3Title: 'About you',
  step3Text: 'Your age on the application date sets the medical test.',
  allowDependents: true,
  maxDependents: 8,
  medicalMinAge: 18,
  medicalNormalLabel: 'Normal',
  medicalNormal: 300,
  medicalVipLabel: 'VIP',
  medicalVip: 750,
  fees: [
    { label: 'Golden Visa issuance (ICP)', amount: 2790, applies: 'each', when: 'any' },
    { label: 'Emirates ID (10 years)', amount: 1153, applies: 'each', when: 'any' },
    { label: 'Entry permit', amount: 1250, applies: 'each', when: 'outside' },
    { label: 'Change of status (inside UAE)', amount: 750, applies: 'each', when: 'inside' },
  ],
  resultTitle: 'Your estimate',
  resultText: 'Government fees for all applicants. Final amounts are confirmed before you pay.',
  whatsappLabel: 'Get a free check',
  whatsappText: 'Hello, I would like a free check of my RAK Golden Visa estimate:',
  leadTitle: 'Get this estimate by email or a call back',
  leadButton: 'Send me the estimate',
  leadThanks: 'Thank you! A consultant will contact you shortly.',
};

/* ------------------------------------------------------------------ admin form */
const APPLIES = [
  { value: 'each', label: 'Each person' },
  { value: 'application', label: 'Once per application' },
  { value: 'main', label: 'Main applicant only' },
  { value: 'dependent', label: 'Each family member' },
  { value: 'adult', label: 'Each adult (medical age +)' },
  { value: 'child', label: 'Each child' },
];
const WHEN = [
  { value: 'any', label: 'Always' },
  { value: 'inside', label: 'Only if inside the UAE' },
  { value: 'outside', label: 'Only if outside the UAE' },
];
const FEE_FIELDS: Field[] = [
  { name: 'label', label: 'Fee name', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'applies', label: 'Charged for', type: 'select', options: APPLIES },
  { name: 'when', label: 'When', type: 'select', options: WHEN },
  { name: 'note', label: 'Small note (optional)', type: 'text' },
];
const OPTION_FIELDS = (extra: Field[] = []): Field[] => [
  { name: 'label', label: 'Name', type: 'text' },
  { name: 'description', label: 'Short description', type: 'text' },
  { name: 'icon', label: 'Icon', type: 'icon' },
  { name: 'id', label: 'Code (letters only, do not change later)', type: 'text' },
  ...extra,
  { name: 'fees', label: 'Extra fees for this choice', type: 'list', itemLabel: 'Fee', fields: FEE_FIELDS },
  { name: 'hidden', label: 'Hide this choice', type: 'boolean' },
];

export const ESTIMATE_FIELDS: Field[] = [
  { name: '_h1', label: 'Calculator box', type: 'heading' },
  { name: 'title', label: 'Title', type: 'text', half: true },
  { name: 'badge', label: 'Badge (top right)', type: 'text', half: true },
  { name: 'currency', label: 'Currency', type: 'text', half: true },
  { name: 'footnote', label: 'Note under the calculator', type: 'textarea' },
  { name: '_h2', label: 'Step 1 — who is applying', type: 'heading' },
  { name: 'step1Title', label: 'Question', type: 'text', half: true },
  { name: 'step1Text', label: 'Help text', type: 'text', half: true },
  { name: 'categories', label: 'Choices', type: 'list', itemLabel: 'Choice', fields: OPTION_FIELDS() },
  { name: '_h3', label: 'Step 2 — new or renewal', type: 'heading' },
  { name: 'step2Title', label: 'Question', type: 'text', half: true },
  { name: 'step2Text', label: 'Help text', type: 'text', half: true },
  { name: 'types', label: 'Choices', type: 'list', itemLabel: 'Choice', fields: OPTION_FIELDS([{ name: 'noLocationFees', label: 'No entry permit / change of status fees for this choice', type: 'boolean' }]) },
  { name: '_h4', label: 'Step 3 — applicants & medical', type: 'heading' },
  { name: 'step3Title', label: 'Title', type: 'text', half: true },
  { name: 'step3Text', label: 'Help text', type: 'text', half: true },
  { name: 'allowDependents', label: 'Allow adding spouse / children', type: 'boolean', half: true },
  { name: 'maxDependents', label: 'Max family members', type: 'number', half: true },
  { name: 'medicalMinAge', label: 'Medical test needed from age', type: 'number', half: true },
  { name: 'medicalNormalLabel', label: 'Medical option 1 name', type: 'text', half: true },
  { name: 'medicalNormal', label: 'Medical option 1 price', type: 'number', half: true },
  { name: 'medicalVipLabel', label: 'Medical option 2 name', type: 'text', half: true },
  { name: 'medicalVip', label: 'Medical option 2 price', type: 'number', half: true },
  { name: '_h5', label: 'Government fees (always added)', type: 'heading' },
  { name: 'fees', label: 'Fees', type: 'list', itemLabel: 'Fee', fields: FEE_FIELDS },
  { name: '_h6', label: 'Result screen', type: 'heading' },
  { name: 'resultTitle', label: 'Title', type: 'text', half: true },
  { name: 'whatsappLabel', label: 'WhatsApp button', type: 'text', half: true },
  { name: 'resultText', label: 'Text', type: 'textarea' },
  { name: 'whatsappText', label: 'WhatsApp message start', type: 'textarea' },
  { name: 'leadTitle', label: 'Lead form title', type: 'text' },
  { name: 'leadButton', label: 'Lead form button', type: 'text', half: true },
  { name: 'leadThanks', label: 'Thank-you message', type: 'text', half: true },
];

/** Text fields that are translated into other languages */
export const ESTIMATE_TEXT_KEYS = ['title', 'badge', 'footnote', 'step1Title', 'step1Text', 'step2Title', 'step2Text', 'step3Title', 'step3Text', 'medicalNormalLabel', 'medicalVipLabel', 'resultTitle', 'resultText', 'whatsappLabel', 'whatsappText', 'leadTitle', 'leadButton', 'leadThanks'] as const;

/* ------------------------------------------------------------------ calculation */
export type Person = { kind: 'main' | 'spouse' | 'child'; dob?: string; age?: number | ''; location?: 'inside' | 'outside' | ''; medical?: 'normal' | 'vip' | '' };
export type Line = { label: string; unit: number; qty: number; total: number; note?: string };

export function ageOn(dob: string | undefined, onDate: string) {
  if (!dob) return null;
  const b = new Date(dob + 'T00:00:00');
  const d = new Date(onDate + 'T00:00:00');
  if (isNaN(+b) || isNaN(+d)) return null;
  let a = d.getFullYear() - b.getFullYear();
  if (d.getMonth() < b.getMonth() || (d.getMonth() === b.getMonth() && d.getDate() < b.getDate())) a--;
  return a < 0 ? null : a;
}

export function personAge(p: Person, onDate: string): number | null {
  const fromDob = ageOn(p.dob, onDate);
  if (fromDob !== null) return fromDob;
  return p.age === '' || p.age === undefined || p.age === null || isNaN(Number(p.age)) ? null : Number(p.age);
}

export function calculate(cfg: EstimateSettings, input: { category?: string; type?: string; date: string; people: Person[]; medicalWord?: string }) {
  const cat = cfg.categories.find((c) => c.id === input.category);
  const typ = cfg.types.find((t) => t.id === input.type);
  const noLoc = !!typ?.noLocationFees;
  const rules = [...(cfg.fees || []), ...(cat?.fees || []), ...(typ?.fees || [])];
  const lines = new Map<string, Line>();
  const add = (label: string, unit: number, qty: number, note?: string) => {
    if (!qty || !unit) return;
    const key = `${label}|${unit}`;
    const l = lines.get(key) || { label, unit, qty: 0, total: 0, note };
    l.qty += qty;
    l.total = l.unit * l.qty;
    lines.set(key, l);
  };
  const people = input.people.map((p) => ({ ...p, ageNow: personAge(p, input.date) }));
  for (const r of rules) {
    const amount = Number(r.amount) || 0;
    if (r.when !== 'any' && noLoc) continue;
    if ((r.applies || 'each') === 'application') {
      if (r.when === 'any' || people.some((p) => p.location === r.when)) add(r.label, amount, 1, r.note);
      continue;
    }
    const qty = people.filter((p) => {
      if (r.when !== 'any' && p.location !== r.when) return false;
      switch (r.applies) {
        case 'main':
          return p.kind === 'main';
        case 'dependent':
          return p.kind !== 'main';
        case 'adult':
          return (p.ageNow ?? 99) >= cfg.medicalMinAge;
        case 'child':
          return (p.ageNow ?? 99) < cfg.medicalMinAge;
        default:
          return true;
      }
    }).length;
    add(r.label, amount, qty, r.note);
  }
  // medical tests
  const normal = people.filter((p) => (p.ageNow ?? 0) >= cfg.medicalMinAge && p.medical !== 'vip').length;
  const vip = people.filter((p) => (p.ageNow ?? 0) >= cfg.medicalMinAge && p.medical === 'vip').length;
  add(`${input.medicalWord || 'Medical test'} – ${cfg.medicalNormalLabel}`, Number(cfg.medicalNormal) || 0, normal);
  add(`${input.medicalWord || 'Medical test'} – ${cfg.medicalVipLabel}`, Number(cfg.medicalVip) || 0, vip);
  const list = Array.from(lines.values());
  return { lines: list, total: list.reduce((s, l) => s + l.total, 0), people: people.length };
}

export function money(n: number, currency = 'AED', locale = 'en-US') {
  return `${currency} ${n.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
