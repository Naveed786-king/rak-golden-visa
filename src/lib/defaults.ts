// Default settings. Everything here is editable from Admin → Settings / Header / Footer.

export type NavLink = { label: string; href: string; description?: string; children?: NavLink[] };

export type SiteSettings = {
  name: string;
  tagline: string;
  logo: string;
  logoLight: string;
  favicon: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  emailGeneral: string;
  emailVisa: string;
  address: string;
  poBox: string;
  mapUrl: string;
  mapEmbed: string;
  hours: string;
  hoursClosed: string;
  social: { facebook: string; instagram: string; youtube: string; twitter: string; linkedin: string; tiktok: string };
  colors: { gold: string; goldLight: string; ink: string; sand: string };
  showWhatsappButton: boolean;
  showMobileBar: boolean;
  showPreloader: boolean;
  headScripts: string;
  bodyScripts: string;
  seo: { titleTemplate: string; defaultTitle: string; description: string; keywords: string; ogImage: string };
};

export type HeaderSettings = {
  topbar: { enabled: boolean; text: string; linkLabel: string; linkHref: string };
  menu: NavLink[];
  cta: { label: string; href: string };
  showLogin: boolean;
};

export type FooterSettings = {
  about: string;
  columns: { title: string; links: NavLink[] }[];
  ctaTitle: string;
  ctaHighlight: string;
  ctaButton: { label: string; href: string };
  newsletter: { enabled: boolean; title: string; text: string };
  copyright: string;
  disclaimer: string;
  bottomLinks: NavLink[];
};

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notifyEmail: string;
};

export const defaultSite: SiteSettings = {
  name: 'RAK Golden Visa',
  tagline: 'Powered by Brightlink Management Consultancy',
  logo: '',
  logoLight: '',
  favicon: '',
  phone: '+971566556645',
  phoneDisplay: '+971 56 655 6645',
  whatsapp: '971566556645',
  whatsappMessage: "Hello! I'm interested in the RAK Golden Visa. Please assist me.",
  emailGeneral: 'info@brightlinkconsulting.ae',
  emailVisa: 'visa@brightlinkconsulting.ae',
  address: 'Office M08-27, M1 Floor, Crystal Tower, Millennium Central Same Building, Al Asayel Street, Business Bay, Dubai, U.A.E',
  poBox: 'P.O Box: 554552',
  mapUrl: 'https://maps.app.goo.gl/kA8Ht6pMCgTTEoARA',
  mapEmbed: 'https://www.google.com/maps?q=Crystal+Tower+Business+Bay+Dubai&output=embed',
  hours: 'Monday – Saturday: 9:00 am – 6:00 pm',
  hoursClosed: 'Sunday: Closed',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/brightlink.consulting',
    youtube: 'https://youtube.com/',
    twitter: 'https://x.com/',
    linkedin: '',
    tiktok: '',
  },
  colors: { gold: '#C8A255', goldLight: '#E9D5A6', ink: '#0A1222', sand: '#F7F2E9' },
  showWhatsappButton: true,
  showMobileBar: true,
  showPreloader: true,
  headScripts: '',
  bodyScripts: '',
  seo: {
    titleTemplate: '%s | RAK Golden Visa',
    defaultTitle: 'RAK Golden Visa 2026 | Ras Al Khaimah Golden Visa for Property Investors',
    description:
      'Apply for the RAK Golden Visa through property investment in Ras Al Khaimah. Eligibility, requirements, fees, processing time, benefits and family sponsorship — expert assistance from Brightlink Management Consultancy.',
    keywords: 'RAK Golden Visa, Ras Al Khaimah Golden Visa, UAE Golden Visa, property investor visa, retirement visa UAE',
    ogImage: '',
  },
};

export const defaultHeader: HeaderSettings = {
  topbar: {
    enabled: true,
    text: 'VIP Fast-Track: RAK Golden Visa in as little as 48 working hours',
    linkLabel: 'Check eligibility',
    linkHref: '/contact-us',
  },
  menu: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'RAK Investor Visa', href: '/ras-al-khaimah-property-golden-visa', description: '10-year Golden Visa via AED 2M+ property' },
        { label: 'RAK Retirement Visa', href: '/ras-al-khaimah-retirement-visa', description: '5-year residency for residents aged 55+' },
        { label: 'All Services', href: '/services', description: 'Emirates ID, medical, attestation & more' },
      ],
    },
    { label: 'Blogs', href: '/latest-news-blogs' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  cta: { label: 'Apply Now', href: '/apply' },
  showLogin: true,
};

export const defaultFooter: FooterSettings = {
  about:
    'We help entrepreneurs, investors, and property owners secure long-term residency in RAK through structured, hassle-free processes. From Golden Visa applications to complete documentation support — we ensure your transition is smooth, compliant, and stress-free.',
  columns: [
    {
      title: 'Services',
      links: [
        { label: 'RAK Investor Visa', href: '/ras-al-khaimah-property-golden-visa' },
        { label: 'RAK Retirement Visa', href: '/ras-al-khaimah-retirement-visa' },
        { label: 'All Services', href: '/services' },
        { label: 'Apply Online', href: '/apply' },
      ],
    },
    {
      title: 'Navigation',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Blogs', href: '/latest-news-blogs' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Client Login', href: '/login' },
      ],
    },
  ],
  ctaTitle: 'Get Your',
  ctaHighlight: 'Golden Visa Today!',
  ctaButton: { label: 'Apply Now', href: '/apply' },
  newsletter: { enabled: true, title: 'Golden Visa updates', text: 'Rule changes, fees and offers — straight to your inbox.' },
  copyright: '© {year} Golden Visa Ras Al Khaimah - RAK. All Rights Reserved.',
  disclaimer:
    'RakGoldenVisa.com is operated by Brightlink Management Consultancy LLC, an independent private consultancy and third-party service provider. We are not a government authority or affiliated with any UAE government entity. We provide professional assistance with visa applications, document preparation, typing services, and application submissions through the relevant official government channels. Final approval, processing times, and visa decisions remain solely at the discretion of the competent UAE authorities.',
  bottomLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
};

export const defaultSmtp: SmtpSettings = {
  host: '',
  port: 587,
  secure: false,
  user: '',
  pass: '',
  from: '',
  notifyEmail: '',
};

export const SERVICE_OPTIONS = [
  'RAK Golden Visa – Property Investor',
  'RAK Retirement Visa',
  'Family Golden Visa',
  'Golden Visa – Professionals / Other',
  'UAE Visa Cancellation',
  'Emirates ID Services',
  'Medical (EHS)',
  'Health Insurance',
  'Attestation Services',
  'Visit Visa',
  'Other',
];

export const APPLICATION_STATUSES: { value: string; label: string; progress: number; color: string }[] = [
  { value: 'submitted', label: 'Submitted', progress: 10, color: 'slate' },
  { value: 'under_review', label: 'Under Review', progress: 25, color: 'blue' },
  { value: 'documents_required', label: 'Documents Required', progress: 30, color: 'amber' },
  { value: 'processing', label: 'Processing', progress: 50, color: 'indigo' },
  { value: 'initial_approval', label: 'Initial Approval', progress: 65, color: 'violet' },
  { value: 'medical_biometrics', label: 'Medical & Biometrics', progress: 80, color: 'cyan' },
  { value: 'approved', label: 'Visa Approved', progress: 95, color: 'emerald' },
  { value: 'completed', label: 'Completed', progress: 100, color: 'green' },
  { value: 'rejected', label: 'Rejected', progress: 100, color: 'red' },
  { value: 'cancelled', label: 'Cancelled', progress: 0, color: 'zinc' },
];

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'];

export type TranslationSettings = {
  provider: 'google' | 'claude' | 'deepl' | 'off';
  apiKey: string;
  model: string;
  autoTranslate: boolean;
  enabled: string[]; // language codes shown on the website
  showSwitcher: boolean;
};

export const defaultTranslation: TranslationSettings = {
  provider: 'claude',
  apiKey: '',
  model: 'claude-sonnet-5-5',
  autoTranslate: true,
  enabled: ['en', 'ar', 'ru', 'tr', 'zh', 'fr', 'de', 'es', 'ro', 'hi'],
  showSwitcher: true,
};
