// Golden Visa cost estimate calculator: settings, defaults and the price calculation.
// Every label and price is editable in Admin → Cost calculator.
import type { Field } from '@/components/blocks/types';

export type FeeApplies = 'application' | 'each' | 'main' | 'dependent' | 'adult' | 'child';
export type FeeWhen = 'any' | 'inside' | 'outside';

export type FeeRule = {
  label: string;
  amount: number; // price for each adult (and everyone, unless set below)
  mainAmount?: number | ''; // optional different price for the main applicant
  childAmount?: number | ''; // optional different price for each child
  applies: FeeApplies;
  when: FeeWhen;
  note?: string;
};
export type EstimateOption = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  fees: FeeRule[];
  noLocationFees?: boolean;
  replaceBaseFees?: boolean;
  hidden?: boolean;
};

export type EstimateSettings = {
  title: string;
  badge: string;
  currency: string;
  footnote: string;
  logo: string;
  step1Title: string;
  step1Text: string;
  categories: EstimateOption[];
  step2Title: string;
  step2Text: string;
  types: EstimateOption[];
  // step 3 - location
  locationTitle: string;
  locationText: string;
  insideLabel: string;
  insideText: string;
  insideImage: string;
  outsideLabel: string;
  outsideText: string;
  outsideImage: string;
  // step 4 - adding family members too?
  familyAskTitle: string;
  familyAskText: string;
  justMeLabel: string;
  justMeText: string;
  justMeImage: string;
  withFamilyLabel: string;
  withFamilyText: string;
  withFamilyImage: string;
  familyAskNote: string;
  // step 5 - sponsor's file (only when family members are added)
  sponsorTitle: string;
  sponsorText: string;
  sponsorOpenLabel: string;
  sponsorOpenText: string;
  sponsorOpenImage: string;
  sponsorNeedsLabel: string;
  sponsorNeedsText: string;
  sponsorNeedsImage: string;
  sponsorFee: number;
  sponsorResultLabel: string;
  sponsorLineLabel: string;
  hideSponsorStep: boolean;
  // step 6 - family members (not counting the applicant)
  familyTitle: string;
  familyText: string;
  adultLabel: string;
  adultText: string;
  adultImage: string;
  childLabel: string;
  childText: string;
  childImage: string;
  familyNote: string;
  allowDependents: boolean;
  maxAdults: number;
  maxChildren: number;
  // step 5 - medical
  medicalTitle: string;
  medicalText: string;
  medicalMinAge: number;
  medicalNormalLabel: string;
  medicalNormalNote: string;
  medicalNormal: number;
  medicalNormalImage: string;
  medicalVipLabel: string;
  medicalVipNote: string;
  medicalVip: number;
  medicalVipImage: string;
  medicalNote: string;
  // fees
  fees: FeeRule[];
  // result
  resultTitle: string;
  resultText: string;
  totalLabel: string;
  mainLabel: string;
  adultResultLabel: string;
  childResultLabel: string;
  applicationLabel: string;
  whatsappLabel: string;
  whatsappText: string;
  leadTitle: string;
  leadButton: string;
  leadThanks: string;
  // result: still to be quoted + notes (empty = hidden)
  quotedTitle: string;
  quoted1Label: string;
  quoted1Value: string;
  quoted2Label: string;
  quoted2Value: string;
  note1: string;
  note2: string;
  note3: string;
  note4: string;
  /** @deprecated replaced by the steps above (kept so older saved settings still load) */
  step3Title?: string;
  step3Text?: string;
  maxDependents?: number;
};

export const defaultEstimate: EstimateSettings = {
  title: 'RAK Golden Visa Calculator',
  badge: 'Live Government Fees',
  currency: 'AED',
  footnote: 'Estimated government fees. Insurance and our service fees are quoted on WhatsApp.',
  logo: '',
  step1Title: 'What describes you?',
  step1Text: 'Choose the route you are applying through.',
  categories: [
    {
      id: 'property',
      label: 'Property investor',
      description: 'Ras Al Khaimah property worth AED 2M+',
      icon: 'building',
      fees: [],
    },
    { id: 'retiree', label: 'Retiree (55+)', description: '5-year retirement residency', icon: 'sun', fees: [] },
    { id: 'investor', label: 'Business investor', description: 'Company owner / partner', icon: 'briefcase', fees: [] },
    { id: 'professional', label: 'Skilled professional', description: 'Salary AED 30,000+', icon: 'student', fees: [] },
  ],
  step2Title: 'New visa or renewal?',
  step2Text: 'Is this your first Golden Visa or a renewal?',
  types: [
    { id: 'new', label: 'New visa', description: 'First Golden Visa application', icon: 'sparkles', fees: [] },
    { id: 'renewal', label: 'Renewal', description: 'Renew an existing Golden Visa', icon: 'file-check', fees: [], noLocationFees: true },
  ],
  locationTitle: 'Where are you now?',
  locationText: 'This decides whether a change of status fee applies.',
  insideLabel: 'Inside the UAE',
  insideText: 'On a visit, tourist or residence visa',
  insideImage: '',
  outsideLabel: 'Outside the UAE',
  outsideText: 'Applying from your home country',
  outsideImage: '',
  familyAskTitle: 'Adding family members too?',
  familyAskText: '',
  justMeLabel: 'No, just me',
  justMeText: 'Only my own visa',
  justMeImage: '',
  withFamilyLabel: 'Yes, add family',
  withFamilyText: 'Add adults and children',
  withFamilyImage: '',
  familyAskNote: 'Your spouse, children and parents can be added now.',
  sponsorTitle: 'Does the sponsor’s file need to be opened?',
  sponsorText: 'The sponsor file is opened once per sponsor, not for each family member.',
  sponsorOpenLabel: 'Already open',
  sponsorOpenText: 'No opening fee',
  sponsorOpenImage: '',
  sponsorNeedsLabel: 'Needs opening',
  sponsorNeedsText: 'charged once',
  sponsorNeedsImage: '',
  sponsorFee: 353.91,
  sponsorResultLabel: 'Sponsor file',
  sponsorLineLabel: 'Sponsor file opening (once)',
  hideSponsorStep: false,
  familyTitle: 'Add your family members',
  familyText: 'You are already counted — add only your family.',
  adultLabel: 'Adults',
  adultText: '18 years and over',
  adultImage: '',
  childLabel: 'Children',
  childText: 'Under 18 · no medical test',
  childImage: '',
  familyNote: 'Adults (18 and over) need a medical test. Children under 18 don’t.',
  allowDependents: true,
  maxAdults: 10,
  maxChildren: 10,
  medicalTitle: 'Choose your medical test',
  medicalText: '',
  medicalMinAge: 18,
  medicalNormalLabel: 'Normal Medical',
  medicalNormalNote: 'Result in 24 hours',
  medicalNormal: 273,
  medicalNormalImage: '',
  medicalVipLabel: 'VIP Medical',
  medicalVipNote: 'Result in 30 minutes',
  medicalVip: 703,
  medicalVipImage: '',
  medicalNote: 'Needed for everyone 18 and over. Children don’t need one.',
  fees: [
    { label: 'Immigration & Visa', amount: 2710, mainAmount: '', childAmount: '', applies: 'each', when: 'any' },
    { label: 'Emirates ID – 10 Years', amount: 1154, mainAmount: '', childAmount: '', applies: 'each', when: 'any' },
    { label: 'Change of status (inside UAE)', amount: 750, mainAmount: '', childAmount: '', applies: 'each', when: 'inside' },
  ],
  resultTitle: 'Your estimate',
  resultText: 'Government fees for all applicants. Final amounts are confirmed before you pay.',
  totalLabel: 'Total government fees',
  mainLabel: 'Main applicant',
  adultResultLabel: 'Adult',
  childResultLabel: 'Child',
  applicationLabel: 'Per application',
  whatsappLabel: 'Free eligibility check',
  whatsappText: 'Hello, I would like a free check of my RAK Golden Visa estimate:',
  leadTitle: 'Get this estimate by email or a call back',
  leadButton: 'Send me the estimate',
  leadThanks: 'Thank you! A consultant will contact you shortly.',
  quotedTitle: 'Still to be quoted',
  quoted1Label: 'Mandatory insurance',
  quoted1Value: 'Quote required',
  quoted2Label: 'Our service fees',
  quoted2Value: 'Ask on WhatsApp',
  note1: 'Estimated government fees only.',
  note2: 'Insurance is mandatory and must be provided or arranged before the residence visa is issued.',
  note3: 'Insurance premiums and our service fees are quoted separately. Message us on WhatsApp for your own quotation.',
  note4: 'A separate dependant deposit may apply where shown.',
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
  { name: 'label', label: 'Fee name (shown in the result)', type: 'text' },
  { name: 'applies', label: 'Charged for', type: 'select', options: APPLIES, half: true },
  { name: 'when', label: 'When', type: 'select', options: WHEN, half: true },
  { name: 'amount', label: 'Price per adult', type: 'number', half: true },
  { name: 'childAmount', label: 'Price per child (empty = same as adult)', type: 'number', half: true },
  { name: 'mainAmount', label: 'Price for the main applicant (empty = same as adult)', type: 'number', half: true },
  { name: 'note', label: 'Small note (optional)', type: 'text', half: true },
];
const OPTION_FIELDS = (extra: Field[] = []): Field[] => [
  { name: 'label', label: 'Name', type: 'text', half: true },
  { name: 'description', label: 'Short description', type: 'text', half: true },
  { name: 'icon', label: 'Icon', type: 'icon', half: true },
  { name: 'image', label: 'Picture in the pop-up (optional, round)', type: 'image', half: true },
  { name: 'id', label: 'Code (letters only, do not change later)', type: 'text' },
  ...extra,
  { name: 'replaceBaseFees', label: 'Use ONLY the fees below for this choice (ignore the standard government fees)', type: 'boolean' },
  { name: 'fees', label: 'Extra fees / own prices for this choice', type: 'list', itemLabel: 'Fee', fields: FEE_FIELDS },
  { name: 'hidden', label: 'Hide this choice', type: 'boolean' },
];

export const ESTIMATE_FIELDS: Field[] = [
  { name: '_h1', label: 'Calculator box', type: 'heading' },
  { name: 'title', label: 'Title', type: 'text', half: true },
  { name: 'badge', label: 'Badge (top right)', type: 'text', half: true },
  { name: 'currency', label: 'Currency', type: 'text', half: true },
  { name: 'logo', label: 'Logo in the pop-up header (empty = site logo)', type: 'image', half: true },
  { name: 'footnote', label: 'Note under the calculator', type: 'textarea' },
  { name: '_h2', label: 'Step 1 — what describes you (on the page)', type: 'heading' },
  { name: 'step1Title', label: 'Question', type: 'text', half: true },
  { name: 'step1Text', label: 'Help text', type: 'text', half: true },
  { name: 'categories', label: 'Choices (each can have its own prices)', type: 'list', itemLabel: 'Choice', fields: OPTION_FIELDS() },
  { name: '_h3', label: 'Step 2 — new visa or renewal (pop-up)', type: 'heading' },
  { name: 'step2Title', label: 'Question', type: 'text', half: true },
  { name: 'step2Text', label: 'Help text', type: 'text', half: true },
  { name: 'types', label: 'Choices (each can have its own prices)', type: 'list', itemLabel: 'Choice', fields: OPTION_FIELDS([{ name: 'noLocationFees', label: 'Skip “Where are you now?” — no change of status fee', type: 'boolean' }]) },
  { name: '_h4', label: 'Step 3 — where are you now?', type: 'heading' },
  { name: 'locationTitle', label: 'Question', type: 'text', half: true },
  { name: 'locationText', label: 'Help text', type: 'text', half: true },
  { name: 'insideLabel', label: 'Choice 1', type: 'text', half: true },
  { name: 'insideText', label: 'Choice 1 description', type: 'text', half: true },
  { name: 'outsideLabel', label: 'Choice 2', type: 'text', half: true },
  { name: 'outsideText', label: 'Choice 2 description', type: 'text', half: true },
  { name: 'insideImage', label: 'Choice 1 picture (optional)', type: 'image', half: true },
  { name: 'outsideImage', label: 'Choice 2 picture (optional)', type: 'image', half: true },
  { name: '_h5a', label: 'Step 4 — adding family members too?', type: 'heading' },
  { name: 'familyAskTitle', label: 'Question', type: 'text', half: true },
  { name: 'familyAskText', label: 'Help text', type: 'text', half: true },
  { name: 'justMeLabel', label: 'Choice 1', type: 'text', half: true },
  { name: 'justMeText', label: 'Choice 1 description', type: 'text', half: true },
  { name: 'withFamilyLabel', label: 'Choice 2', type: 'text', half: true },
  { name: 'withFamilyText', label: 'Choice 2 description', type: 'text', half: true },
  { name: 'justMeImage', label: 'Choice 1 picture (optional)', type: 'image', half: true },
  { name: 'withFamilyImage', label: 'Choice 2 picture (optional)', type: 'image', half: true },
  { name: 'familyAskNote', label: 'Info note', type: 'text' },
  { name: '_h5b', label: 'Step 5 — does the sponsor’s file need to be opened? (only shown when family is added)', type: 'heading' },
  { name: 'sponsorTitle', label: 'Question', type: 'text', half: true },
  { name: 'sponsorText', label: 'Help text', type: 'text', half: true },
  { name: 'sponsorOpenLabel', label: 'Choice 1 (already open)', type: 'text', half: true },
  { name: 'sponsorOpenText', label: 'Choice 1 description', type: 'text', half: true },
  { name: 'sponsorNeedsLabel', label: 'Choice 2 (needs opening)', type: 'text', half: true },
  { name: 'sponsorNeedsText', label: 'Choice 2 description (shown after the price)', type: 'text', half: true },
  { name: 'sponsorFee', label: 'File opening price (charged once)', type: 'number', half: true },
  { name: 'sponsorResultLabel', label: 'Result card name', type: 'text', half: true },
  { name: 'sponsorLineLabel', label: 'Result line name', type: 'text', half: true },
  { name: 'hideSponsorStep', label: 'Skip this step', type: 'boolean', half: true },
  { name: 'sponsorOpenImage', label: 'Choice 1 picture (optional)', type: 'image', half: true },
  { name: 'sponsorNeedsImage', label: 'Choice 2 picture (optional)', type: 'image', half: true },
  { name: '_h5', label: 'Step 6 — family members (the applicant is already counted)', type: 'heading' },
  { name: 'familyTitle', label: 'Title', type: 'text', half: true },
  { name: 'familyText', label: 'Help text', type: 'text', half: true },
  { name: 'adultLabel', label: 'Adults — name', type: 'text', half: true },
  { name: 'adultText', label: 'Adults — description', type: 'text', half: true },
  { name: 'childLabel', label: 'Children — name', type: 'text', half: true },
  { name: 'childText', label: 'Children — description', type: 'text', half: true },
  { name: 'adultImage', label: 'Adults picture (optional)', type: 'image', half: true },
  { name: 'childImage', label: 'Children picture (optional)', type: 'image', half: true },
  { name: 'familyNote', label: 'Info note', type: 'text' },
  { name: 'allowDependents', label: 'Allow adding family members', type: 'boolean', half: true },
  { name: 'medicalMinAge', label: 'Adult / medical test from age', type: 'number', half: true },
  { name: 'maxAdults', label: 'Max adults (incl. applicant)', type: 'number', half: true },
  { name: 'maxChildren', label: 'Max children', type: 'number', half: true },
  { name: '_h6', label: 'Step 7 — medical test (adults only)', type: 'heading' },
  { name: 'medicalTitle', label: 'Title', type: 'text', half: true },
  { name: 'medicalText', label: 'Help text', type: 'text', half: true },
  { name: 'medicalNormalLabel', label: 'Option 1 name', type: 'text', half: true },
  { name: 'medicalNormal', label: 'Option 1 price (per adult)', type: 'number', half: true },
  { name: 'medicalNormalNote', label: 'Option 1 note', type: 'text', half: true },
  { name: 'medicalNormalImage', label: 'Option 1 picture (optional)', type: 'image', half: true },
  { name: 'medicalVipLabel', label: 'Option 2 name', type: 'text', half: true },
  { name: 'medicalVip', label: 'Option 2 price (per adult)', type: 'number', half: true },
  { name: 'medicalVipNote', label: 'Option 2 note', type: 'text', half: true },
  { name: 'medicalVipImage', label: 'Option 2 picture (optional)', type: 'image', half: true },
  { name: 'medicalNote', label: 'Info note', type: 'text' },
  { name: '_h7', label: 'Government fees (added for every choice unless a choice uses only its own fees)', type: 'heading' },
  { name: 'fees', label: 'Fees', type: 'list', itemLabel: 'Fee', fields: FEE_FIELDS },
  { name: '_h8', label: 'Result screen', type: 'heading' },
  { name: 'resultTitle', label: 'Title', type: 'text', half: true },
  { name: 'totalLabel', label: 'Total label', type: 'text', half: true },
  { name: 'mainLabel', label: 'Main applicant card', type: 'text', half: true },
  { name: 'adultResultLabel', label: 'Adult card', type: 'text', half: true },
  { name: 'childResultLabel', label: 'Child card', type: 'text', half: true },
  { name: 'applicationLabel', label: 'Once-per-application card', type: 'text', half: true },
  { name: 'resultText', label: 'Text under the total', type: 'textarea' },
  { name: 'whatsappLabel', label: 'WhatsApp button', type: 'text', half: true },
  { name: 'whatsappText', label: 'WhatsApp message start', type: 'text', half: true },
  { name: 'leadTitle', label: 'Lead form title', type: 'text' },
  { name: 'leadButton', label: 'Lead form button', type: 'text', half: true },
  { name: 'leadThanks', label: 'Thank-you message', type: 'text', half: true },
  { name: '_h9', label: 'Result — “Still to be quoted” box and notes (leave a line empty to hide it)', type: 'heading' },
  { name: 'quotedTitle', label: 'Box title', type: 'text' },
  { name: 'quoted1Label', label: 'Line 1', type: 'text', half: true },
  { name: 'quoted1Value', label: 'Line 1 — right side (red)', type: 'text', half: true },
  { name: 'quoted2Label', label: 'Line 2', type: 'text', half: true },
  { name: 'quoted2Value', label: 'Line 2 — right side (red)', type: 'text', half: true },
  { name: 'note1', label: 'Note 1', type: 'text' },
  { name: 'note2', label: 'Note 2', type: 'text' },
  { name: 'note3', label: 'Note 3', type: 'text' },
  { name: 'note4', label: 'Note 4', type: 'text' },
];

/** Text fields that are translated into other languages */
export const ESTIMATE_TEXT_KEYS = [
  'title', 'badge', 'footnote', 'step1Title', 'step1Text', 'step2Title', 'step2Text',
  'locationTitle', 'locationText', 'insideLabel', 'insideText', 'outsideLabel', 'outsideText',
  'familyAskTitle', 'familyAskText', 'justMeLabel', 'justMeText', 'withFamilyLabel', 'withFamilyText', 'familyAskNote',
  'sponsorTitle', 'sponsorText', 'sponsorOpenLabel', 'sponsorOpenText', 'sponsorNeedsLabel', 'sponsorNeedsText', 'sponsorResultLabel', 'sponsorLineLabel',
  'familyTitle', 'familyText', 'adultLabel', 'adultText', 'childLabel', 'childText', 'familyNote',
  'medicalTitle', 'medicalText', 'medicalNormalLabel', 'medicalNormalNote', 'medicalVipLabel', 'medicalVipNote', 'medicalNote',
  'resultTitle', 'resultText', 'totalLabel', 'mainLabel', 'adultResultLabel', 'childResultLabel', 'applicationLabel',
  'whatsappLabel', 'whatsappText', 'leadTitle', 'leadButton', 'leadThanks',
  'quotedTitle', 'quoted1Label', 'quoted1Value', 'quoted2Label', 'quoted2Value', 'note1', 'note2', 'note3', 'note4',
] as const;

/* ------------------------------------------------------------------ calculation */
export type Line = { label: string; amount: number; note?: string };
export type Group = { key: 'main' | 'adult' | 'child' | 'application' | 'sponsor'; label: string; count: number; lines: Line[]; each: number; total: number };
export type EstimateInput = { category?: string; type?: string; location?: 'inside' | 'outside' | ''; adults: number; children: number; medical?: 'normal' | 'vip' | ''; sponsor?: 'open' | 'needs' | '' };

const num = (v: any) => (v === '' || v === null || v === undefined || isNaN(Number(v)) ? null : Number(v));

/** Price of one fee for one kind of person (null = not charged) */
function priceFor(r: FeeRule, who: 'main' | 'adult' | 'child'): number | null {
  const applies = r.applies || 'each';
  if (applies === 'application') return null;
  if (applies === 'main' && who !== 'main') return null;
  if (applies === 'dependent' && who === 'main') return null;
  if (applies === 'adult' && who === 'child') return null;
  if (applies === 'child' && who !== 'child') return null;
  const base = num(r.amount) ?? 0;
  if (who === 'child') return num(r.childAmount) ?? base;
  if (who === 'main') return num(r.mainAmount) ?? base;
  return base;
}

export function locationNeeded(cfg: EstimateSettings, type?: string) {
  return !cfg.types.find((t) => t.id === type)?.noLocationFees;
}

/**
 * Builds the estimate card by card: main applicant, other adults, children and the
 * once-per-application fees - every price comes from Admin → Cost calculator.
 */
export function calculate(cfg: EstimateSettings, input: EstimateInput) {
  const cat = cfg.categories.find((c) => c.id === input.category);
  const typ = cfg.types.find((t) => t.id === input.type);
  const noLoc = !!typ?.noLocationFees;
  const own = (o?: EstimateOption) => !!o?.replaceBaseFees;
  const rules = [...(own(cat) || own(typ) ? [] : cfg.fees || []), ...(cat?.fees || []), ...(typ?.fees || [])].filter((r) => {
    if (r.when === 'any' || !r.when) return true;
    if (noLoc) return false;
    return r.when === input.location;
  });
  const adults = Math.max(1, Math.floor(input.adults || 1));
  const children = Math.max(0, Math.floor(input.children || 0));
  const medicalPrice = input.medical === 'vip' ? Number(cfg.medicalVip) || 0 : Number(cfg.medicalNormal) || 0;
  const medicalLabel = input.medical === 'vip' ? cfg.medicalVipLabel : cfg.medicalNormalLabel;

  const linesFor = (who: 'main' | 'adult' | 'child'): Line[] => {
    const out: Line[] = [];
    for (const r of rules) {
      const p = priceFor(r, who);
      if (p) out.push({ label: r.label, amount: p, note: r.note });
    }
    if (who !== 'child' && medicalPrice) {
      // medical test sits after the visa fee, like the official breakdown
      out.splice(Math.min(1, out.length), 0, { label: medicalLabel, amount: medicalPrice });
    }
    return out;
  };
  const sum = (ls: Line[]) => ls.reduce((s, l) => s + l.amount, 0);
  const groups: Group[] = [];
  const mainLines = linesFor('main');
  const adultLines = linesFor('adult');
  const same = JSON.stringify(mainLines) === JSON.stringify(adultLines);
  if (same) groups.push({ key: 'adult', label: cfg.adultResultLabel, count: adults, lines: adultLines, each: sum(adultLines), total: sum(adultLines) * adults });
  else {
    groups.push({ key: 'main', label: cfg.mainLabel, count: 1, lines: mainLines, each: sum(mainLines), total: sum(mainLines) });
    if (adults > 1) groups.push({ key: 'adult', label: cfg.adultResultLabel, count: adults - 1, lines: adultLines, each: sum(adultLines), total: sum(adultLines) * (adults - 1) });
  }
  if (children > 0) {
    const cl = linesFor('child');
    groups.push({ key: 'child', label: cfg.childResultLabel, count: children, lines: cl, each: sum(cl), total: sum(cl) * children });
  }
  const app = rules.filter((r) => r.applies === 'application' && num(r.amount)).map((r) => ({ label: r.label, amount: Number(r.amount), note: r.note }));
  if (app.length) groups.push({ key: 'application', label: cfg.applicationLabel, count: 1, lines: app, each: sum(app), total: sum(app) });
  const sponsorFee = num(cfg.sponsorFee) ?? 0;
  if (input.sponsor === 'needs' && sponsorFee > 0) {
    const sl = [{ label: cfg.sponsorLineLabel || cfg.sponsorNeedsLabel, amount: sponsorFee }];
    groups.push({ key: 'sponsor', label: cfg.sponsorResultLabel || cfg.sponsorNeedsLabel, count: 1, lines: sl, each: sponsorFee, total: sponsorFee });
  }
  return { groups, total: groups.reduce((s, g) => s + g.total, 0), people: adults + children };
}

export function money(n: number, currency = 'AED', locale = 'en-US') {
  return `${currency} ${n.toLocaleString(locale, { maximumFractionDigits: 2 })}`;
}
