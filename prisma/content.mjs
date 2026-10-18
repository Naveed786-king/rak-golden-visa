// Initial website content (imported by seed.mjs). Everything here can be edited later in the admin panel.

let n = 0;
const b = (type, data) => ({ id: `b${(++n).toString(36)}${Math.random().toString(36).slice(2, 6)}`, type, data });
const wa = 'whatsapp';

const WHY_CHOOSE = [
  { icon: 'crown', title: 'VIP Service', text: 'Personalised assistance with priority processing and queue-free support.' },
  { icon: 'receipt', title: 'Affordable Fees', text: 'Official government-regulated fees with transparent and fixed pricing.' },
  { icon: 'layers', title: 'All Services in One Place', text: 'Access to a wide range of UAE government services under one roof.' },
  { icon: 'zap', title: 'One-Visit Completion', text: 'Most procedures can be completed in a single visit to the office.' },
];

const VISIT = (title = 'Visit BRIGHTLINK for VIP Service Without Queues') =>
  b('visit', {
    theme: 'dark',
    title,
    text: 'You may visit Brightlink Management Consultancy during working hours without a prior appointment or schedule a visit at a time that is most convenient for you.',
    showMap: false,
  });

const ABOUT_BRIGHTLINK = b('imageText', {
  theme: 'light',
  eyebrow: 'Who we are',
  title: 'About BRIGHTLINK',
  content:
    '<p>Brightlink Management Consultancy is a UAE-based consultancy and VIP service centre providing end-to-end government, residency, and business solutions for UAE nationals, residents, and international investors. Brightlink simplifies complex government procedures by offering multiple essential services under one roof, including Golden Visa applications, business setup, property investor visas, PRO services, Emirates ID processing, and immigration support.</p><p>Focused on efficiency, transparency, and premium client experience, Brightlink helps individuals and companies complete most procedures quickly with dedicated support, pre-scheduled appointments, and fast-track VIP assistance — aligned with the UAE’s vision for smarter, streamlined government services and reduced bureaucracy.</p>',
  bullets: 'DED Dubai licensed consultancy\nGolden Visa, PRO, business setup & attestation\nMultilingual consultants',
  cta: { label: 'Talk to a consultant', href: wa },
});

const PACKAGE_FEATURES = {
  silver:
    'Eligibility assessment\nDocument review & verification\nApplication preparation\nMedical fitness booking assistance\nEmirates ID biometric scheduling\nRegular processing support\nEmail & WhatsApp assistance\nFamily sponsorship consultation\nStatus updates throughout the process',
  gold:
    'Everything in Silver Package\nPriority application handling\nDedicated case manager\nFast-track appointment coordination\nMedical fitness booking assistance\nEmirates ID biometric scheduling\nFamily sponsorship consultation\nPriority WhatsApp support',
  platinum:
    'Everything in Gold Package\nDedicated Golden Visa specialist\nVIP fast-track processing\nPick & Drop service for appointments\nFamily Golden Visa processing support\nBanking & residency guidance\nPriority WhatsApp & after-sales support\nConcierge-style service from start to finish',
};

const COMPARE_ROWS = (retirementOffPlan) =>
  [
    'Visa Duration | 10 Years (Renewable) | 5 Years (Renewable)',
    'Minimum Property Value | AED 2 Million+ | AED 1 Million+',
    `Property Type | Ready or Off-Plan | ${retirementOffPlan ? 'Ready Property or Off-Plan' : 'Ready Property Only'}`,
    'Ownership Requirement | Single ownership only | Single ownership only',
    'Age Requirement | No age restriction | Minimum 55 years',
    `Multiple Properties | Allowed (combined under one owner) | ${retirementOffPlan ? 'Allowed (combined under one owner)' : 'Not typically applicable'}`,
    'Location Requirement | Must be in Ras Al Khaimah | Must be in Ras Al Khaimah',
    `Family Sponsorship | Yes (spouse, children, domestic workers) | ${retirementOffPlan ? 'Yes (spouse, children, domestic workers)' : 'Limited (subject to approval)'}`,
    `Payment Flexibility | Off-plan allowed (min. 10% paid with SPA) | ${retirementOffPlan ? 'Off-plan allowed (min. 10% paid with SPA)' : 'Full ownership of ready property required'}`,
    'Best For | Investors seeking long-term residency & flexibility | Retirees seeking stable living in the UAE',
  ].join('\n');

/* Cost calculator section (prices: Admin → Cost calculator) */
export const estimateBlock = () =>
  b('estimate', {
    theme: 'dark',
    layout: 'split',
    anchor: 'calculator',
    eyebrow: 'Instant cost estimate',
    title: 'How much does the RAK Golden Visa cost?',
    subtitle: 'Answer three quick questions and see every government fee for you and your family — no hidden charges, no surprises.',
    bullets: 'Official government fees, kept up to date by our team\nCovers your spouse, children and medical tests\nSend your estimate to WhatsApp in one tap',
    style: { boxStyle: 'glass', animation: 'fade-up' },
  });

/* ============================== HOME ============================== */
export const home = {
  slug: 'home',
  title: 'Home',
  metaTitle: 'RAK Golden Visa 2026 | Ras Al Khaimah Golden Visa for Property Investors',
  metaDescription:
    'Apply for the RAK Golden Visa through property investment in Ras Al Khaimah. Learn about eligibility, requirements, fees, processing time, benefits, and family sponsorship. Expert assistance from Brightlink Management Consultancy.',
  blocks: [
    b('hero', {
      theme: 'dark',
      eyebrow: 'Licensed by Dubai DET (DED) · VIP fast-track',
      title: 'Fast-Track Golden Visa Services in',
      highlight: 'Ras Al Khaimah',
      subtitle:
        'Apply for the RAK Golden Visa through Brightlink — a professional consultancy licensed by the Dubai Department of Economy and Tourism, offering VIP support, priority processing assistance, transparent pricing and a smooth end-to-end application experience.',
      arabic: 'الإقامة الذهبية',
      primary: { label: 'Check eligibility now', href: '/apply' },
      secondary: { label: 'WhatsApp us', href: wa },
      badges: 'VIP Fast-Track Services\nNo Hidden Charges\nQueue-Free Service\nDedicated Support',
      stats: [
        { value: '10', label: 'Year residency' },
        { value: '48h', label: 'VIP fast-track' },
        { value: '300+', label: 'Golden Visas issued' },
      ],
      cardTitle: 'UAE Golden Residency',
      cardSubtitle: '10 YEARS',
    }),
    b('introSplit', {
      theme: 'light',
      eyebrow: 'UAE Golden Visa application services in RAK',
      title: '10-Year RAK Golden Residency for Investors, Professionals & Families',
      content:
        '<p>The RAK Golden Visa is a <strong>10-year renewable residency permit</strong> issued by the Federal Authority for Identity, Citizenship, Customs and Port Security (ICP). Eligible categories include property investors, skilled professionals, executives, entrepreneurs, scientists, doctors, engineers, outstanding students, and other exceptional talents meeting the applicable UAE government requirements.</p><p>Golden Visa holders do not require a local sponsor and may sponsor their eligible family members for the same residency duration.</p><p>Brightlink Management Consultancy assists applicants throughout the complete Golden Visa process, including eligibility assessment, document preparation, application submission, medical fitness coordination, Emirates ID biometrics, and residency issuance through the relevant RAK authorities.</p>',
      bullets: 'Professional consultancy support\nVIP processing assistance\nTransparent government-regulated fees\nFast and streamlined application handling',
      note: 'RAK Golden Visa approvals are typically processed within a few working days, while the complete process from application submission to residency issuance may take approximately 1–2 weeks depending on the applicant category and document completion.',
      showCard: true,
      cardTitle: 'Apply for a RAK Golden Visa',
      cardFeatures: 'VIP Fast-Track Services\nNo Hidden Charges\nQueue-Free Service\nDedicated Support',
      cardPriceLabel: 'From',
      cardPrice: 'AED 15,000',
      cardCta: { label: 'Book an Appointment', href: wa },
    }),
    b('steps', {
      theme: 'sand',
      eyebrow: 'How to apply for a Golden Visa in Ras Al Khaimah',
      title: 'RAK Golden Visa Process via Official ICP Procedures',
      layout: 'cards',
      items: [
        { icon: 'office', title: 'Visit Brightlink', text: 'Visit Brightlink Management Consultancy during working hours or schedule an appointment online for a Golden Visa eligibility assessment based on your category and supporting documents.' },
        { icon: 'file-check', title: 'Document Preparation', text: 'Our team reviews and verifies all required documents in accordance with ICP and RAK requirements to confirm eligibility and ensure application readiness before submission.' },
        { icon: 'stamp', title: 'Application Submission', text: 'The RAK Golden Visa nomination and residency application are submitted through the official ICP Smart Services and RAK official authorities via authorised processing channels.' },
        { icon: 'fingerprint', title: 'Medical, Emirates ID & Visa', text: 'Once approved, applicants complete the medical fitness examination and Emirates ID biometrics, after which the 10-year UAE residence permit is issued electronically.' },
      ],
    }),
    b('calculator', {
      theme: 'dark',
      eyebrow: 'Free instant check',
      title: 'Which UAE visa do you qualify for?',
      subtitle: 'Move the sliders to see whether you may qualify for the 10-year Golden Visa or the 5-year Retirement Visa.',
    }),
    b('features', {
      theme: 'light',
      eyebrow: 'Documents required for a Golden Visa application',
      title: 'Required Documents for RAK Golden Visa Applications',
      columns: '4',
      style: 'cards',
      items: [
        { icon: 'file', title: 'Valid Passport', text: 'Valid passport with at least six months’ remaining validity, including clear copies of the passport bio page and passport cover page.' },
        { icon: 'card', title: 'Emirates ID & Photograph', text: 'Existing Emirates ID copy, if available, along with a recent passport-sized photograph on a white background meeting ICP requirements.' },
        { icon: 'health', title: 'Health Insurance', text: 'Valid UAE health insurance coverage for the applicant and eligible dependents as required for residency processing.' },
        { icon: 'clipboard', title: 'Category-Specific Documents', text: 'Oqood ownership letter for investors, salary certificate and attested degree for professionals, auditor’s letter or incubator approval for entrepreneurs, or nomination letter for specialists and exceptional talents.' },
      ],
    }),
    VISIT(),
    b('about', {
      theme: 'light',
      eyebrow: 'About us',
      title: 'About BRIGHTLINK',
      content:
        '<p>Brightlink Management Consultancy is a UAE-based consultancy and VIP service centre providing end-to-end government, residency, and business solutions for UAE nationals, residents, and international investors. Brightlink simplifies complex government procedures by offering multiple essential services under one roof, including Golden Visa applications, business setup, property investor visas, PRO services, Emirates ID processing, and immigration support.</p><p>Focused on efficiency, transparency, and premium client experience, Brightlink helps individuals and companies complete most procedures quickly with dedicated support, pre-scheduled appointments, and fast-track VIP assistance.</p>',
      stats: [
        { value: '12+', label: 'Years in market' },
        { value: '300+', label: 'Golden Visas issued' },
        { value: '30+', label: 'Team members' },
        { value: '5000+', label: 'Family visas' },
      ],
      cta: { label: 'More about us', href: '/about-us' },
    }),
    b('features', {
      theme: 'dark',
      eyebrow: 'Why choose BRIGHTLINK for RAK Golden Visa services',
      title: 'Top Consultancy with VIP Fast-Track Services and Dedicated Support',
      columns: '4',
      style: 'glass',
      items: WHY_CHOOSE,
    }),
    b('steps', {
      theme: 'sand',
      eyebrow: 'Step by step',
      title: 'RAK Golden Visa Application Process',
      subtitle:
        'Applying for a Ras Al Khaimah Golden Visa may seem complex, but with the right professional support the process is smooth and efficient — from eligibility assessment and document preparation to medical fitness, Emirates ID processing and final residency issuance.',
      layout: 'timeline',
      items: [
        { title: 'Documents Collection', text: 'We collect and verify your passport, photo, property or category documents and confirm eligibility.' },
        { title: 'Initial Approval', text: 'Your Golden Visa nomination is submitted and pre-approved through the official ICP channels.' },
        { title: 'Medical', text: 'Fast-track medical fitness test at an approved centre — we book it and can arrange pick-up & drop-off.' },
        { title: 'Existing Visa Cancellation', text: 'If you already hold a UAE residence visa, we coordinate its cancellation at the right moment.' },
        { title: 'VIP Biometric', text: 'Emirates ID biometrics completed in a VIP, queue-free appointment.' },
        { title: 'Final Visa Issuance', text: 'Your 10-year Golden Visa and Emirates ID are issued electronically.' },
      ],
    }),
    b('tabs', {
      theme: 'light',
      eyebrow: 'Eligibility',
      title: 'Who is Eligible for a RAK Golden Visa?',
      subtitle:
        'The RAK Golden Visa enables individuals to expand their opportunities while obtaining long-term UAE residency. Eligible applicants include investors, entrepreneurs, medical professionals, engineers, top-performing students and humanitarian contributors.',
      items: [
        { icon: 'building', title: 'Golden Visa for Investors', content: 'Secure a 10-year residency by investing in the local economy. Eligibility can be achieved by investing in a RAK-based company, purchasing real estate valued at AED 2 million or more, or placing a fixed deposit of AED 2 million in a UAE bank. Property investors qualify if their investment meets the value threshold — whether it is a completed property or off-plan.' },
        { icon: 'doctor', title: 'Golden Visa for Doctors', content: 'Doctors and specialised medical professionals are eligible for a 10-year renewable residency in recognition of their vital role in the healthcare sector. Applicants must demonstrate professional distinction, possess valid medical qualifications and present proof of active employment approved by the UAE Ministry of Human Resources, plus a valid UAE residency visa and a medical licence or an official letter from their home country’s health authority.' },
        { icon: 'briefcase', title: 'Golden Visa for Entrepreneurs', content: 'Successful business owners and entrepreneurs in the UAE can qualify for a 10-year Golden Visa. Applicants must own a registered business in the UAE and meet the government’s valuation or investment requirements — one of the key criteria is paying a minimum of AED 250,000 in VAT annually.' },
        { icon: 'student', title: 'Outstanding Students & Graduates', content: 'A 10-year renewable residency for top-performing high school students in the UAE with an average of 95% or higher, university graduates from accredited UAE institutions with a GPA of 3.8 or above, and alumni from the world’s top 100 universities. Eligible students can also sponsor their families.' },
        { icon: 'palette', title: 'Cultural & Creative Talents', content: 'A 10-year residency for individuals who excel in culture, arts, sports and digital technology — innovators, inventors and elite athletes. Applicants need a recommendation or approval from a relevant UAE federal or local authority.' },
        { icon: 'engineer', title: 'Golden Visa for Engineers', content: 'Engineers and data scientists holding a bachelor’s or master’s degree in a relevant field are eligible. Candidates must have a valid job offer in the UAE, be classified within the first or second professional level by the Ministry of Human Resources, and earn a monthly salary of at least AED 30,000.' },
        { icon: 'humanitarian', title: 'Humanitarian Pioneers', content: 'A 10-year renewable Golden Visa for individuals affiliated with international organisations or charitable groups, recipients of humanitarian awards, philanthropists, and those with a minimum of five years of experience in local or national humanitarian work.' },
        { icon: 'star', title: 'Golden Visa for Celebrities', content: 'Long-term residency of up to 10 years for celebrities with international recognition, a proven record of excellence and substantial investments — such as owning property valued at AED 2 million or more. Celebrities can sponsor their families and enjoy full property ownership rights.' },
      ],
      cta: { label: 'Check my eligibility', href: '/apply' },
    }),
    b('checklist', {
      theme: 'dark',
      eyebrow: 'Benefits',
      title: 'RAK Golden Visa Benefits',
      items:
        '10-Year Renewable Residency\nNo Local Sponsor Required\nSponsor Your Spouse, Children & Parents\nSponsor Domestic Workers\nStay Outside the UAE for Over 6 Months Without Losing Residency\nLive, Work & Invest Anywhere in the UAE\nEligible Through Qualifying Property Investment\nAccess UAE Banking & Financial Services\nLong-Term Security for You and Your Family\nRenewable Subject to Meeting Eligibility Requirements',
      cta: { label: 'Start my application', href: '/apply' },
    }),
    b('table', {
      theme: 'light',
      eyebrow: 'Transparent pricing',
      title: 'RAK Golden Visa Price Breakdown',
      subtitle: 'The cost of the RAK Golden Visa is made up of several separate government fees. Understanding each component prevents budget surprises during the application process.',
      headers: 'Fee Component\nAmount (AED)',
      rows: [
        'ICP Visa Issuance (10-year Golden Visa) | 2,800 to 3,800',
        'Emirates ID (10-year card) | 1,150 to 1,200',
        'Medical Fitness Test (MOHAP-approved center in RAK) | 700 to 1,000',
        'Health Insurance (mandatory at visa stamping) | Variable — plan dependent',
        'Document Attestation and Government Processing | 1,500 to 3,000 per person',
        'Each Dependent (spouse / child / domestic worker) | Similar per-person fees apply',
        'PRO and Professional Assistance (optional) | Market rate',
        'Total Government Fees per Main Applicant | AED 3,500 to AED 5,500',
      ].join('\n'),
      highlightLast: true,
      notes:
        '<p><strong>Notes:</strong> The total per main applicant typically falls between AED 3,500 and AED 5,500 for government fees, excluding health insurance and any professional assistance fees. Each dependent family member incurs a similar per-person fee set. Health insurance is mandatory at the point of visa stamping and must be from a UAE-approved provider. The medical fitness test is conducted at a MOHAP-approved center in RAK.</p><ul><li>RAK Golden Visa fees vary depending on the applicant category, visa duration, and whether the application is submitted from inside or outside the UAE.</li><li>Additional government fees apply for each sponsored dependent.</li><li>All fees are regulated by the relevant UAE authorities and remain subject to change without prior notice.</li></ul>',
      cta: { label: 'Get your tailored quote', href: wa },
    }),
    b('offer', {
      theme: 'dark',
      eyebrow: 'Our VIP fast-track offer',
      badge: 'Exclusive',
      title: 'RAK Golden Visa in 48 Hours',
      tagline: 'Seen this offer anywhere else? Probably not.',
      content:
        '<p>Brightlink proudly offers RAK Golden Visa approvals in as little as <strong>48 working hours</strong> for eligible property investors, fixed deposit holders, and their family members.</p><p>Whether qualifying through real estate investment or approved financial deposits, our experienced team manages the process efficiently and professionally to help clients secure long-term UAE residency with minimal delays and complete compliance support.</p>',
      lists: [
        {
          title: 'This offer applies to',
          items:
            'Property investors owning real estate valued at AED 2 million or more, including ready and eligible off-plan properties\nFixed-term deposit holders maintaining AED 2 million or more in an approved UAE bank\nEligible family members, including spouse, children and parents',
        },
        {
          title: 'Our service includes',
          items:
            'Golden Visa eligibility assessment and document verification\nComplete application processing with fast-track submission support\nCoordination of medical, Emirates ID biometrics and visa stamping, incl. pick-up and drop-off\nFamily sponsorship processing for spouse, children and dependents\nOptional assistance with property-related or banking documentation',
        },
      ],
      cta: { label: 'RAK Golden Visa in 48 hours', href: wa },
    }),
    b('features', {
      theme: 'sand',
      eyebrow: 'Global perspective',
      title: 'Why the UAE Golden Visa Stands Out Globally',
      subtitle:
        'Compared to residency-by-investment programmes in Portugal, Malta and the United States EB-5 programme, the UAE Golden Visa offers strategic advantages for investors, entrepreneurs, skilled professionals and families.',
      columns: '2',
      style: 'cards',
      items: [
        { icon: 'timer', title: 'Long-Term Renewable Residency', text: 'Renewable residency for up to 10 years — greater long-term stability than many programmes that initially grant only 2 to 5 years.' },
        { icon: 'coins', title: 'Flexible Investment Options', text: 'Multiple pathways with accessible requirements. The property route generally begins from AED 2 million — competitive against global programmes with higher thresholds and stricter conditions.' },
      ],
      cta: { label: 'Begin your Golden Visa application today', href: '/apply' },
    }),
    b('compare', {
      theme: 'light',
      eyebrow: 'Local comparison',
      title: 'RAK Golden Visa vs. Other UAE Residency Visas',
      columns: [
        { title: 'Golden Visa', highlight: true, items: 'Duration: 5–10 years (renewable)\nSponsorship: Not required\nEligibility: Investors, entrepreneurs, skilled professionals\nBenefits: Live / work / study freedom\nBest for: HNWIs, long-term planners' },
        { title: 'Other UAE Residency Visas', highlight: false, items: 'Duration: 1–2 years (renewable)\nSponsorship: Required (employer / family)\nEligibility: Employment, family, property, freelancers\nBenefits: Standard residency\nBest for: Short-term stays, job-linked' },
      ],
    }),
    b('rejections', {
      theme: 'sand',
      eyebrow: 'Common rejections',
      title: 'How to Avoid RAK Golden Visa Application Rejection',
      subtitle: 'The most common reasons applications are delayed or rejected — and how to minimise the risk before submission.',
      items: [
        { tab: 'Property Below Threshold', title: 'Property Below Threshold or Unapproved Developer', issue: 'If the invested property is not above AED 2M or the developer isn’t registered, your application may be rejected.', solution: 'Verify the property’s valuation and developer approval. We can assist in confirming this before submission.' },
        { tab: 'Incomplete Documentation', title: 'Incomplete and Missing Documents', issue: 'Missing documents, incorrect information, or unclear copies can result in processing delays or rejection.', solution: 'Ensure all required documents are complete, valid, properly attested where applicable, and submitted in the correct format.' },
        { tab: 'Salary or Employment Criteria', title: 'Salary or Employment Criteria Not Met', issue: 'Professionals and executives may be rejected if salary requirements or job classifications do not meet the approved criteria.', solution: 'Confirm that salary transfers, employment contracts, and professional qualifications satisfy the latest UAE Golden Visa requirements before submission.' },
        { tab: 'Weak Entrepreneur Evidence', title: 'Weak Evidence for Entrepreneur Startups', issue: 'Entrepreneur applications may face rejection if there is insufficient evidence demonstrating the viability, innovation or potential of the business.', solution: 'Submit a well-prepared business plan, financial documents, endorsement letters, incubator approvals and audited reports where applicable.' },
        { tab: 'Insufficient Recognition', title: 'Talent Application Lacking Recognised Accolades', issue: 'Applications under exceptional talent categories may be rejected if there is limited proof of recognised achievements, patents, awards or publications.', solution: 'Include all relevant awards, patents, recommendation letters, industry recognitions, publications, memberships and certifications.' },
      ],
    }),
    b('cta', {
      theme: 'light',
      style: 'dark',
      title: 'Your Personal Guide to RAK Golden Visa',
      text: 'From eligibility assessment and document preparation to government approvals, medical coordination and Emirates ID processing — our experienced team manages every step, making long-term UAE residency simple and stress-free.',
      primary: { label: 'Start your Golden Visa application', href: '/apply' },
      secondary: { label: 'Chat on WhatsApp', href: wa },
    }),
    b('blog', {
      theme: 'sand',
      eyebrow: 'Insights',
      title: 'Latest News & Blogs',
      subtitle: 'Expert guidance and updates on UAE Golden Visa, real estate investment, immigration and long-term residency.',
      count: 3,
      paginate: false,
    }),
    b('testimonials', { theme: 'light', eyebrow: 'Testimonials', title: 'See What Our Happy Customers Are Saying' }),
    b('partners', {
      theme: 'light',
      eyebrow: 'Trusted processing',
      title: 'Working Closely with Key UAE Government Authorities',
      subtitle: 'We process applications through the official UAE government channels for a smooth, transparent and efficient experience.',
    }),
    b('faq', { theme: 'sand', eyebrow: 'FAQ', title: 'Ras Al Khaimah Golden Visa FAQs', group: 'home' }),
    b('cta', {
      theme: 'light',
      style: 'gold',
      title: 'Get Your RAK Golden Visa Today!',
      text: 'Enjoy 10-year renewable residency, full family sponsorship, and complete peace of mind.',
      primary: { label: 'Apply now', href: '/apply' },
      secondary: { label: 'WhatsApp', href: wa },
    }),
  ],
};

/* ============================== ABOUT ============================== */
export const about = {
  slug: 'about-us',
  title: 'About Us',
  metaTitle: 'About Brightlink | RAK Golden Visa Specialists for Property Investors',
  metaDescription:
    'Brightlink Management Consultancy helps property investors obtain the RAK Golden Visa with expert guidance — from eligibility assessment and document verification to application submission and visa issuance.',
  blocks: [
    b('pageHeader', { theme: 'dark', eyebrow: 'About us', title: 'Your Trusted Residency Partner', subtitle: 'Smooth, secure and long-term residency solutions in Ras Al Khaimah.' }),
    b('imageText', {
      theme: 'light',
      eyebrow: 'Who we are',
      title: 'Simplifying UAE business, immigration & government procedures',
      content:
        '<p>Brightlink Management Consultancy was established with a vision to simplify business, immigration, and government procedures across the UAE. With years of industry experience and a team of knowledgeable professionals, Brightlink provides reliable consultancy solutions tailored to investors, entrepreneurs, companies, and individuals navigating the UAE’s evolving legal and regulatory environment.</p>',
      bullets:
        'Transparent, timely, and compliance-focused guidance\nProfessional support across immigration, business setup, and government services\nStrong coordination with GDRFA, ICP, MOHRE, DLD, and UAE Free Zones\nMultilingual consultants with extensive regional expertise\nEnd-to-end assistance designed to simplify complex UAE procedures',
      cta: { label: 'Visit brightlinkconsulting.ae', href: 'https://brightlinkconsulting.ae' },
    }),
    b('about', {
      theme: 'sand',
      eyebrow: 'Powered by Brightlink Consulting',
      title: 'RAK Golden Visa',
      content:
        '<p>At RAK Golden Visa, powered by Brightlink Management Consultancy, we specialise in long-term UAE residency solutions for investors, property owners, entrepreneurs, and families. Backed by years of experience and in-depth knowledge of UAE immigration and real estate regulations, our team provides personalised support throughout every stage of the Golden Visa and investor residency process.</p><p>We are committed to delivering transparent guidance, professional service, and smooth coordination with UAE government authorities to ensure a compliant and stress-free experience.</p>',
      stats: [
        { value: '12+', label: 'Years in market' },
        { value: '300+', label: 'Golden Visas issued' },
        { value: '30+', label: 'Team members' },
        { value: '5000+', label: 'Family visas' },
      ],
      cta: { label: 'WhatsApp us', href: wa },
    }),
    b('features', {
      theme: 'light',
      eyebrow: 'Why Brightlink',
      title: 'Essential UAE services under one roof',
      subtitle:
        'We combine personalised support, efficient processing, and professional expertise to simplify complex procedures while maintaining the highest standards of service, convenience, and reliability.',
      columns: '3',
      style: 'cards',
      items: [
        { icon: 'target', title: 'Our Mission', text: 'To simplify life in the UAE by providing secure, efficient, and seamless access to residency, business, and government services through one trusted centre.' },
        { icon: 'eye', title: 'Our Vision', text: 'To become a leading consultancy for integrated UAE residency, investment, and business solutions by combining innovation, compliance, and exceptional client support.' },
        { icon: 'gem', title: 'Our Values', text: 'Transparency, efficiency, professionalism, innovation, and complete client satisfaction.' },
      ],
    }),
    b('steps', {
      theme: 'sand',
      eyebrow: 'How we work',
      title: 'Seamless RAK Golden Residency & Business Solutions Process',
      layout: 'cards',
      items: [
        { icon: 'office', title: 'Visit Brightlink', text: 'Visit during working hours without a prior appointment, or schedule your visit online at your convenience.' },
        { icon: 'support', title: 'Personal Consultation', text: 'A dedicated consultant will assist you promptly with personalised support and priority handling.' },
        { icon: 'clipboard', title: 'On-Site Processing', text: 'All applications, documentation, and payment procedures are managed directly at the centre.' },
        { icon: 'zap', title: 'Same-Day Completion', text: 'Most UAE government procedures can typically be completed within a single visit.' },
      ],
    }),
    VISIT(),
    b('testimonials', { theme: 'light', eyebrow: 'Client stories', title: 'What Clients Say About Our RAK Golden Visa Services' }),
    b('features', { theme: 'dark', eyebrow: 'Why choose BRIGHTLINK', title: 'Why Choose BRIGHTLINK for RAK Golden Visa Services', columns: '4', style: 'glass', items: WHY_CHOOSE }),
    b('cta', { theme: 'light', style: 'gold', title: 'Ready to secure your future in the UAE?', text: 'Book a free consultation with our Golden Visa specialists.', primary: { label: 'Book a consultation', href: '/contact-us' }, secondary: { label: 'WhatsApp', href: wa } }),
  ],
};

/* ============================== SERVICES ============================== */
export const services = {
  slug: 'services',
  title: 'Our Services',
  metaTitle: 'RAK Golden Visa Services | Expert Golden Visa Assistance in Ras Al Khaimah',
  metaDescription:
    'Professional RAK Golden Visa services for property investors. Brightlink handles eligibility assessment, documentation, application submission, family sponsorship, and end-to-end visa processing in Ras Al Khaimah.',
  blocks: [
    b('pageHeader', { theme: 'dark', eyebrow: 'Services', title: 'Our Services', subtitle: 'Specialised RAK Golden Visa services designed to simplify the residency process and support your long-term success, investment and future in the UAE.' }),
    b('services', {
      theme: 'light',
      eyebrow: 'Transparent pricing',
      title: 'All Government Services in One Place',
      subtitle:
        'Complete Golden Visa and property investor support for investors, homeowners, entrepreneurs and families — from property selection and eligibility assessment to documentation, government approvals and residency processing.',
      category: 'main',
      limit: 0,
    }),
    VISIT(),
    b('services', {
      theme: 'sand',
      eyebrow: 'Beyond visas',
      title: 'Additional Expert Services We Offer',
      subtitle: 'Professional services designed to simplify your journey and provide complete support for your residency, investment, business and government needs in the UAE.',
      category: 'additional',
      limit: 0,
    }),
    b('steps', {
      theme: 'light',
      eyebrow: 'Why choose us?',
      title: 'Seamless RAK Golden Visa Services in Just 4 Steps',
      layout: 'cards',
      items: [
        { icon: 'chat', title: 'Tell Us What You Need', text: 'Your dedicated consultant will review your case and explain the legal process clearly.' },
        { icon: 'crown', title: 'Enjoy Priority VIP Service', text: 'Personalised assistance with priority handling, fast processing and dedicated support throughout.' },
        { icon: 'car', title: 'Doorstep VIP Assistance', text: 'Our specialists manage every stage with coordinated support, efficient handling and maximum convenience.' },
        { icon: 'badge', title: 'Get Your Documents Ready', text: 'Once all procedures are completed, your approved and certified documents are delivered directly to you.' },
      ],
    }),
    b('cta', { theme: 'light', style: 'gold', title: 'Not sure which service you need?', text: 'Tell us about your situation and we will recommend the fastest route.', primary: { label: 'Free consultation', href: '/contact-us' }, secondary: { label: 'WhatsApp', href: wa } }),
  ],
};

/* ============================== INVESTOR VISA ============================== */
export const investor = {
  slug: 'ras-al-khaimah-property-golden-visa',
  title: 'RAK Investor Visa',
  metaTitle: 'Ras Al Khaimah Property Golden Visa | 10-Year UAE Residency',
  metaDescription:
    'Apply for the Ras Al Khaimah Property Golden Visa with Brightlink Consulting. Expert assistance for eligibility, documentation, family sponsorship, and fast 10-Year UAE Golden Visa processing.',
  blocks: [
    b('pageHeader', {
      theme: 'dark',
      eyebrow: 'Secure your 10-year residency with VIP processing',
      title: 'RAK Property Investor Visa',
      subtitle: 'Obtain a 10-Year UAE Golden Visa through eligible property investment in Ras Al Khaimah with expert guidance from start to finish.',
      primary: { label: 'Apply online', href: '/apply?service=RAK Golden Visa – Property Investor' },
      secondary: { label: 'WhatsApp', href: wa },
    }),
    b('introSplit', {
      theme: 'light',
      eyebrow: 'Golden Visa for property owners',
      title: 'Golden Visa for Property Owners in RAK',
      content:
        '<p>The Ras Al Khaimah Property Golden Visa is a 10-Year UAE residency visa available to eligible investors who own qualifying real estate in the emirate. It allows you to live, work, and invest in the UAE without the need for a local sponsor.</p><p>To qualify, applicants must own property with a minimum value of <strong>AED 2 million</strong>. Eligible off-plan properties may also qualify, subject to government requirements and payment conditions.</p><p>The visa also allows you to sponsor your spouse, children, and eligible dependents, making it an excellent option for families seeking long-term residency. With its growing real estate market, competitive property prices, and investor-friendly environment, Ras Al Khaimah has become a leading destination for property investors.</p><p>At Brightlink Consulting, we provide complete support throughout the process — from eligibility assessment and document verification to government approvals and final Golden Visa issuance.</p>',
      showCard: true,
      cardTitle: 'Apply for a RAK Investor Visa',
      cardFeatures: 'VIP Fast-Track Services\nNo Hidden Charges\nQueue-Free Service\nDedicated Support',
      cardPriceLabel: 'From',
      cardPrice: 'AED 12,499',
      cardCta: { label: 'Book an Appointment', href: wa },
    }),
    b('features', {
      theme: 'sand',
      eyebrow: 'Qualification routes',
      title: 'How to Qualify for RAK Golden Visa Through Property Investment',
      subtitle: 'Ras Al Khaimah offers multiple ways to qualify for the Golden Visa for property investors.',
      columns: '3',
      style: 'cards',
      items: [
        { icon: 'key', title: 'Ready Properties', subtitle: 'Completed units — immediate processing', text: 'Completed real estate units with an issued Title Deed. Ideal for investors who want a straightforward and faster Golden Visa process.', bullets: 'Valid Title Deed issued by RAK authorities\nMinimum value AED 2 million\nSuitable for Golden Visa (10 yrs) and Retirement Visa (5 yrs)\nFully paid or financed through approved banks\nImmediate usability — live, rent or invest' },
        { icon: 'building', title: 'Off-Plan Properties', subtitle: 'Under construction — flexible payments', text: 'Units purchased directly from developers before completion. Investors can still qualify under certain conditions.', bullets: 'Minimum property value AED 2 million\nAt least 10% of the property value paid\nSigned Sale and Purchase Agreement (SPA)\nSPA registered with RAK Municipality\nFlexible payment plans, lower entry cost' },
        { icon: 'layers', title: 'Multiple Properties Combined', subtitle: 'Combine to meet the threshold', text: 'Combine multiple properties to meet the eligibility threshold while diversifying your portfolio.', bullets: 'Combined value AED 2 million or more\nAll under a single owner’s name (no joint ownership)\nAll located within Ras Al Khaimah\nMix of ready and off-plan (subject to approval)' },
      ],
    }),
    b('steps', {
      theme: 'light',
      eyebrow: 'A structured and compliant process through official channels',
      title: 'How to Get a RAK Investor Visa Through Property Investment',
      layout: 'cards',
      items: [
        { icon: 'chat', title: 'Initial Consultation', text: 'Visit us or book an appointment. Our specialists assess your eligibility and review your investment details.' },
        { icon: 'file-check', title: 'Document Verification', text: 'We review your property documents (Oqood/SPA) and ensure compliance with ICP and RAK authorities, including the Executive Council NOC.' },
        { icon: 'stamp', title: 'Application Processing', text: 'We prepare and submit your application and coordinate medical fitness, Emirates ID biometrics and all approvals.' },
        { icon: 'award', title: 'Receive Your Golden Visa', text: 'Your 10-year RAK Golden Visa is issued and your Emirates ID processed.' },
      ],
    }),
    VISIT('Enjoy a Hassle-Free Golden Visa Experience with Brightlink’s VIP Service'),
    b('offer', {
      theme: 'dark',
      eyebrow: 'Exclusive 2-day offer',
      badge: '2–3 working days',
      title: 'Ras Al Khaimah Property Golden Visa VIP Package',
      tagline: 'Smooth, fast and hassle-free.',
      content: '<p>Secure your 10-Year Ras Al Khaimah Golden Visa with our complete VIP processing package. Only <strong>2–3 working days in the UAE</strong> to complete the process, including medical test and biometrics.</p>',
      lists: [
        { title: 'What’s included in the package', items: 'Fast-track visa approval\nFast-track medical (VIP)\nBiometric (VIP)\nEmirates ID (VIP)\nHealth insurance\nNOC for Golden Visa\nEvaluation certificate' },
        { title: 'Required documents', items: 'Pre Title Deed / Oqood\nSale & Purchase Agreement (SPA)\nNOC from developer for Golden Visa\nPassport copy (clear scan)\nPassport-size photo (white background)\nMother’s name, email, religion & relationship status' },
      ],
      cta: { label: 'Get the VIP package', href: wa },
    }),
    b('table', {
      theme: 'light',
      eyebrow: 'Package cost',
      title: 'VIP Golden Visa Package Cost',
      headers: 'Description\nCost (AED)',
      rows: 'Golden Visa RAK Fast Track Package | 7,500\nEvaluation Certificate | 1,050\nPre-Approval Certificate | 1,575\nProfessional Fees | 5,250\nTotal Package Cost | AED 15,375',
      highlightLast: true,
      notes: '<ul><li>Fast-track processing (2–3 days only)</li><li>Complete VIP handling — end-to-end support</li><li>Expert guidance throughout the process</li></ul>',
    }),
    b('features', {
      theme: 'sand',
      eyebrow: 'Documents required',
      title: 'Documents Required for a RAK Golden Visa for Property Owners',
      columns: '2',
      style: 'cards',
      items: [
        { icon: 'home', title: 'Property Ownership Documents', text: 'A valid title deed (Oqood) issued by the RAK Municipality & Sale and Purchase Agreement (SPA) for eligible off-plan properties, plus any supporting valuation documents.' },
        { icon: 'file', title: 'Personal Identification Documents', text: 'A clear copy of a valid passport with at least six months’ validity, a recent passport-sized photograph with a white background, and an Emirates ID copy if already issued.' },
        { icon: 'landmark', title: 'Mortgage and Financial Documents', text: 'For mortgaged properties, a bank no-objection certificate (NOC), mortgage statement, and any additional documents required to verify eligibility.' },
        { icon: 'users', title: 'Family Sponsorship Documents', text: 'Attested marriage certificates, birth certificates, valid passport copies, photographs, and UAE health insurance documentation for eligible dependents.' },
      ],
    }),
    ABOUT_BRIGHTLINK,
    b('pricing', {
      theme: 'sand',
      eyebrow: 'Packages',
      title: 'Ras Al Khaimah Golden Visa Packages',
      subtitle: 'Choose VIP fast-track for priority processing or a standard application — transparent pricing, expert guidance and end-to-end support.',
      plans: [
        { name: 'Silver Package', price: 'AED 10,499', features: PACKAGE_FEATURES.silver, time: 'Processing: 7 – 14 working days', cta: { label: 'Get offer', href: wa } },
        { name: 'Gold Package', price: 'AED 12,499', features: PACKAGE_FEATURES.gold, time: 'Processing: 5 – 7 working days', featured: true, cta: { label: 'Get offer', href: wa } },
        { name: 'Platinum Package', price: 'AED 15,375', features: PACKAGE_FEATURES.platinum, time: 'Processing: 24 – 72 hours', cta: { label: 'Get offer', href: wa } },
      ],
    }),
    b('features', { theme: 'dark', eyebrow: 'Why choose BRIGHTLINK for Golden Visa', title: 'Top Consultancy with VIP Services for RAK Golden Visa', columns: '4', style: 'glass', items: WHY_CHOOSE }),
    b('table', {
      theme: 'light',
      eyebrow: 'Which is right for you?',
      title: 'RAK Golden Visa vs. Retirement Visa',
      subtitle: 'The Golden Visa is ideal for investors looking for long-term residency with flexible property options. The Retirement Visa is best suited for individuals aged 55+ who want a stable and peaceful lifestyle in the UAE.',
      headers: 'Feature\nGolden Visa (Property-Based)\nRetirement Visa (Property-Based)',
      rows: COMPARE_ROWS(false),
      highlightLast: false,
    }),
    b('accordion', {
      theme: 'sand',
      eyebrow: 'Additional insights',
      title: 'Ras Al Khaimah Property Golden Visa — Good to Know',
      items: [
        { title: 'Who should apply?', content: '<ul><li>International investors seeking long-term UAE residency through real estate</li><li>Individuals and families planning to relocate to the UAE</li><li>Buyers looking for more affordable investment opportunities than other emirates</li><li>Investors seeking both rental income and residency benefits</li><li>Families looking for long-term stability, quality education, and healthcare access</li></ul>' },
        { title: 'Financing & mortgage options', content: '<p>Eligible investors can purchase property through cash or UAE bank financing.</p><ul><li>Cash and mortgage-financed properties may qualify</li><li>Mortgage-backed properties must meet the minimum investment requirement</li><li>Banks may require a minimum down payment and proof of income</li><li>Eligibility is subject to applicable government regulations</li></ul>' },
        { title: 'Rental income & investment potential', content: '<ul><li>Attractive rental yields</li><li>Strong demand for short-term holiday rentals</li><li>Opportunity to generate passive rental income</li><li>Long-term capital appreciation potential</li></ul>' },
        { title: 'Popular freehold communities', content: '<p>Foreign investors can purchase property in designated freehold areas, including <strong>Al Marjan Island</strong>, <strong>Mina Al Arab</strong> and <strong>Al Hamra Village</strong> — among Ras Al Khaimah’s most sought-after destinations for residential living, holiday homes, and investment properties.</p>' },
        { title: 'Investment flexibility', content: '<p>Property owners can sell or reinvest whenever they choose. However, Golden Visa eligibility must be maintained by meeting the applicable ownership requirements. With increasing demand across the emirate, investors also benefit from a growing resale market.</p>' },
        { title: 'Lifestyle benefits', content: '<ul><li>Peaceful, family-friendly communities</li><li>Beautiful beaches and mountain landscapes</li><li>Outdoor leisure and recreational activities</li><li>International schools and quality healthcare facilities</li><li>Excellent quality of life for families and retirees</li></ul>' },
        { title: 'Future growth', content: '<ul><li>Major tourism and infrastructure developments</li><li>Expanding luxury waterfront communities</li><li>Government initiatives encouraging foreign investment</li><li>Strong long-term property value growth</li></ul>' },
        { title: 'Common mistakes to avoid', content: '<ul><li>Buying property below the minimum AED 2 million investment requirement</li><li>Purchasing under ownership structures that do not meet eligibility requirements</li><li>Failing to verify developer approvals or project registration</li><li>Missing essential documents such as the SPA, Title Deed, or required NOCs</li></ul>' },
        { title: 'Why invest in Ras Al Khaimah?', content: '<ul><li>Competitive property prices</li><li>High rental yield potential</li><li>Rapidly growing tourism sector</li><li>Peaceful coastal lifestyle</li><li>Excellent connectivity within the UAE</li><li>Strong long-term investment prospects</li></ul><p><strong>Investor tip:</strong> for the best long-term returns, consider established or emerging waterfront communities and high-demand developments that offer both Golden Visa eligibility and strong rental or resale potential.</p>' },
        { title: 'Why choose Brightlink Consulting?', content: '<ul><li>Eligibility assessment</li><li>Property and document verification</li><li>Government application processing</li><li>Executive Council NOC assistance</li><li>Medical and Emirates ID coordination</li><li>Family sponsorship support</li><li>Dedicated VIP assistance throughout the process</li></ul>' },
      ],
    }),
    b('faq', { theme: 'light', eyebrow: 'FAQ', title: 'Frequently Asked Questions – RAK Property Investor Visa', group: 'investor' }),
    b('testimonials', { theme: 'sand', eyebrow: 'Testimonials', title: 'What Clients Say About Our Services' }),
    b('cta', { theme: 'light', style: 'gold', title: 'Start Your Golden Visa Journey', text: 'Our specialists are ready to review your documents, assess your eligibility and guide you through every stage — from consultation to final visa issuance.', primary: { label: 'Check your eligibility today', href: '/apply?service=RAK Golden Visa – Property Investor' }, secondary: { label: 'WhatsApp', href: wa } }),
  ],
};

/* ============================== RETIREMENT VISA ============================== */
export const retirement = {
  slug: 'ras-al-khaimah-retirement-visa',
  title: 'RAK Retirement Visa',
  metaTitle: 'Ras Al Khaimah Property Retirement Visa | Complete 2026 Guide',
  metaDescription: 'Apply for the Ras Al Khaimah Property Retirement Visa. Eligibility, AED 1 million property requirement, documents, costs, process, and family sponsorship.',
  blocks: [
    b('pageHeader', {
      theme: 'dark',
      eyebrow: 'Secure your 5-year retirement visa with VIP processing',
      title: 'RAK Retirement Visa',
      subtitle: 'Retire in the UAE with a renewable 5-Year Retirement Visa designed for eligible foreign nationals.',
      primary: { label: 'Apply online', href: '/apply?service=RAK Retirement Visa' },
      secondary: { label: 'WhatsApp', href: wa },
    }),
    b('introSplit', {
      theme: 'light',
      eyebrow: 'Retirement visa for foreign nationals',
      title: 'Retirement Visa for Foreign Nationals in RAK',
      content:
        '<p>The UAE Retirement Visa in Ras Al Khaimah is a renewable <strong>5-Year UAE residence visa</strong> designed for eligible retirees seeking long-term residency. It enables retirees to enjoy a peaceful lifestyle while sponsoring eligible family members.</p><p>With its beautiful beaches, mountain landscapes, modern healthcare, and affordable cost of living, Ras Al Khaimah has become an increasingly popular destination for retirees.</p><h3>To qualify, applicants must:</h3><ul><li>Be 55 years of age or older</li><li>Have completed at least 15 years of employment, inside or outside the UAE</li><li>Own property worth at least AED 1 million <em>or</em> maintain savings of AED 1 million or more; <em>or</em></li><li>Have a stable annual income of at least AED 180,000 (or equivalent), earned inside or outside the UAE</li></ul>',
      showCard: true,
      cardTitle: 'Apply for a RAK Retirement Visa',
      cardFeatures: 'VIP Fast-Track Services\nNo Hidden Charges\nQueue-Free Service\nDedicated Support',
      cardPriceLabel: 'From',
      cardPrice: 'AED 9,999',
      cardCta: { label: 'Book an Appointment', href: wa },
    }),
    b('features', {
      theme: 'sand',
      eyebrow: 'Qualification routes',
      title: 'How to Qualify for the RAK Retirement Visa',
      subtitle: 'Eligibility requirements, financial options and the application process for a renewable 5-Year Retirement Visa in Ras Al Khaimah.',
      columns: '3',
      style: 'cards',
      items: [
        { icon: 'home', title: 'Property – AED 1 Million', subtitle: 'Ready, off-plan or combined', text: 'Applicants aged 55+ may qualify by owning eligible property in Ras Al Khaimah with a minimum value of AED 1 million.', bullets: 'Ready properties with a valid Title Deed\nEligible off-plan with a registered SPA\nMultiple properties may be combined (same owner, in RAK)' },
        { icon: 'savings', title: 'AED 1 Million Fixed Deposit', subtitle: 'In an approved UAE bank', text: 'Applicants aged 55+ may qualify by placing a minimum fixed deposit of AED 1 million in an approved UAE bank, held in the applicant’s name.', bullets: 'Official bank documentation required\nDeposit maintained per regulations' },
        { icon: 'cash', title: 'Annual Income – AED 180,000', subtitle: 'Pension or other stable income', text: 'Applicants aged 55+ may qualify with a minimum annual income of AED 180,000 (or equivalent in foreign currency), earned inside or outside the UAE.', bullets: 'Pension statements, salary certificates or bank statements\nIncome must be stable and verifiable' },
      ],
    }),
    b('steps', {
      theme: 'light',
      eyebrow: 'A structured and compliant process through official channels',
      title: 'How to Get a RAK Retirement Visa Through Official Channels',
      layout: 'cards',
      items: [
        { icon: 'chat', title: 'Initial Consultation', text: 'Visit us or book an appointment. Our specialists assess your eligibility and review your details.' },
        { icon: 'file-check', title: 'Document Verification', text: 'We verify your documents and eligibility and ensure compliance with RAK and UAE authority requirements.' },
        { icon: 'stamp', title: 'Application Processing', text: 'We submit your application and coordinate medical fitness, Emirates ID biometrics and approvals.' },
        { icon: 'award', title: 'Receive Your Retirement Visa', text: 'Your 5-year RAK Retirement Visa is issued and your Emirates ID processed.' },
      ],
    }),
    VISIT('Enjoy a Hassle-Free Retirement Visa Experience with Brightlink’s VIP Service'),
    b('offer', {
      theme: 'dark',
      eyebrow: 'Exclusive 3-day offer',
      badge: '2–3 working days',
      title: 'Ras Al Khaimah Retirement Visa VIP Package',
      tagline: 'Complete VIP processing, start to finish.',
      content: '<p>Secure your 5-Year Ras Al Khaimah Retirement Visa with our complete VIP processing package. Only <strong>2–3 working days in the UAE</strong> to complete the process, including medical test and biometrics.</p>',
      lists: [
        { title: 'What’s included in the package', items: 'Fast-track visa approval\nFast-track medical (VIP)\nBiometric (VIP)\nEmirates ID (VIP)\nHealth insurance\nNOC for Retirement Visa\nEvaluation certificate' },
        { title: 'Required documents', items: 'Pre Title Deed / Oqood\nSale & Purchase Agreement (SPA)\nNOC from developer for Retirement Visa\nPassport copy (clear scan)\nPassport-size photo (white background)\nMother’s name, email, religion & relationship status' },
      ],
      cta: { label: 'Get the VIP package', href: wa },
    }),
    b('table', {
      theme: 'light',
      eyebrow: 'Package cost',
      title: 'VIP Retirement Visa Package Cost',
      headers: 'Description\nCost (AED)',
      rows: 'Retirement Visa RAK Fast Track Package | 5,500\nEvaluation Certificate | 1,050\nPre-Approval Certificate | 750\nProfessional Fees | 5,250\nTotal Package Cost | AED 12,550',
      highlightLast: true,
    }),
    b('features', {
      theme: 'sand',
      eyebrow: 'Documents required',
      title: 'Documents Required for a RAK Retirement Visa',
      columns: '2',
      style: 'cards',
      items: [
        { icon: 'home', title: 'Property Ownership Documents', text: 'A valid title deed (Oqood) issued by the RAK Municipality & SPA for eligible off-plan properties, plus supporting valuation documents.' },
        { icon: 'file', title: 'Personal Identification Documents', text: 'A clear passport copy with at least six months’ validity, a recent passport photo on a white background, and an Emirates ID copy if issued.' },
        { icon: 'landmark', title: 'Mortgage and Financial Documents', text: 'For mortgaged properties: bank NOC, mortgage statement and any documents required to verify eligibility.' },
        { icon: 'users', title: 'Family Sponsorship Documents', text: 'Attested marriage and birth certificates, passport copies, photographs and UAE health insurance for dependents.' },
      ],
    }),
    ABOUT_BRIGHTLINK,
    b('pricing', {
      theme: 'sand',
      eyebrow: 'Packages',
      title: 'Ras Al Khaimah Retirement Visa Packages',
      subtitle: 'VIP fast-track or standard — transparent pricing, expert guidance and complete end-to-end support.',
      plans: [
        { name: 'Silver Package', price: 'AED 9,999', features: PACKAGE_FEATURES.silver, time: 'Processing: 7 – 14 working days', cta: { label: 'Get offer', href: wa } },
        { name: 'Gold Package', price: 'AED 10,999', features: PACKAGE_FEATURES.gold, time: 'Processing: 5 – 7 working days', featured: true, cta: { label: 'Get offer', href: wa } },
        { name: 'Platinum Package', price: 'AED 12,550', features: PACKAGE_FEATURES.platinum.replace(/Golden Visa/g, 'Retirement Visa'), time: 'Processing: 24 – 72 hours', cta: { label: 'Get offer', href: wa } },
      ],
    }),
    b('features', { theme: 'dark', eyebrow: 'Why choose BRIGHTLINK for Retirement Visa', title: 'Top Consultancy with VIP Services for RAK Retirement Visa', columns: '4', style: 'glass', items: WHY_CHOOSE }),
    b('table', {
      theme: 'light',
      eyebrow: 'Which is right for you?',
      title: 'RAK Golden Visa vs. Retirement Visa',
      headers: 'Feature\nGolden Visa (Property-Based)\nRetirement Visa (Property-Based)',
      rows: COMPARE_ROWS(true),
      highlightLast: false,
    }),
    b('table', {
      theme: 'sand',
      eyebrow: 'Lifestyle',
      title: 'Benefits of Retiring in the UAE',
      headers: 'Benefit\nDescription',
      rows: [
        'A tax-friendly place to live | Zero personal income tax on pension savings or investment returns — your retirement income goes further.',
        'A higher standard of living | Luxury villas, top-tier infrastructure, premium shopping, fine dining and entertainment.',
        'Quality healthcare | High-class accredited medical centres staffed by skilled and qualified doctors.',
        'A secure place to live | One of the world’s safest countries thanks to very low crime rates and effective security services.',
        'International access | Well-connected airports give quick access to cities worldwide and to family at home.',
        'An international culture | A diverse population makes it easy to settle in and form friendships.',
      ].join('\n'),
      highlightLast: false,
    }),
    b('accordion', {
      theme: 'light',
      eyebrow: 'Additional insights',
      title: 'Ras Al Khaimah Property Retirement Visa — Good to Know',
      items: [
        { title: 'Why more retirees are choosing Ras Al Khaimah', content: '<p>Ras Al Khaimah has become one of the UAE’s most attractive retirement destinations due to its peaceful lifestyle, growing infrastructure, and comparatively affordable real estate market — a unique combination of coastal living, mountain scenery and modern amenities.</p>' },
        { title: 'Property ownership options', content: '<ul><li>Apartments</li><li>Villas</li><li>Townhouses</li><li>Beachfront residences</li><li>Golf community properties</li><li>Approved off-plan developments</li><li>Freehold residential properties available to foreign investors</li></ul>' },
        { title: 'Can existing property owners apply?', content: '<p>Yes. Existing owners of qualifying real estate in Ras Al Khaimah may apply, provided the property satisfies the minimum investment requirement and all eligibility conditions — including properties purchased several years ago if current ownership documents and valuation meet requirements.</p>' },
        { title: 'Property valuation requirements', content: '<p>In certain cases, the authorities may request an official property valuation to confirm the current market value. An approved valuation certificate helps establish that the property satisfies the minimum threshold.</p>' },
        { title: 'Mortgage considerations', content: '<p>Properties financed through a UAE-recognised financial institution may still qualify. Applicants may need a mortgage NOC, outstanding liability confirmation and supporting documents from the bank. Each case is assessed individually.</p>' },
        { title: 'Multiple owners', content: '<p>Where a property has multiple owners, each owner’s eligibility is assessed individually based on ownership percentage, attributable investment value, residency regulations and documentation.</p>' },
        { title: 'Living benefits for retirees', content: '<ul><li>High-quality healthcare facilities</li><li>International schools for families relocating with children</li><li>Modern shopping centres and entertainment venues</li><li>Beaches, marinas and waterfront communities</li><li>Golf courses and outdoor recreation</li><li>Hiking trails and mountain attractions</li><li>Excellent road connectivity to Dubai and other emirates</li></ul>' },
        { title: 'Banking and financial services', content: '<ul><li>Opening local bank accounts</li><li>Accessing savings and investment products</li><li>Applying for utility services</li><li>Mobile and internet connections</li><li>Leasing residential property</li><li>Registering vehicles, subject to regulations</li></ul>' },
        { title: 'Healthcare and medical insurance', content: '<p>Medical insurance is generally required before the issuance or renewal of a UAE residence visa. We recommend comprehensive coverage that meets the authorities’ requirements.</p>' },
        { title: 'Renewal of the Retirement Visa', content: '<p>The visa may be renewed provided you continue to satisfy all eligibility requirements. Authorities may verify continued ownership, the minimum investment, valid health insurance and updated personal documentation.</p>' },
        { title: 'Common reasons for delays', content: '<ul><li>Incomplete documentation</li><li>Property ownership discrepancies</li><li>Missing government approvals</li><li>Incorrect passport information</li><li>Expired identification documents</li><li>Pending mortgage documentation</li></ul>' },
      ],
    }),
    b('faq', { theme: 'sand', eyebrow: 'FAQ', title: 'Frequently Asked Questions – RAK Property Retirement Visa', group: 'retirement' }),
    b('cta', { theme: 'light', style: 'gold', title: 'Start Your Retirement Visa Journey', text: 'Our specialists will review your documents, assess your eligibility and guide you through every stage.', primary: { label: 'Check your eligibility today', href: '/apply?service=RAK Retirement Visa' }, secondary: { label: 'WhatsApp', href: wa } }),
  ],
};

/* ============================== CONTACT ============================== */
export const contact = {
  slug: 'contact-us',
  title: 'Contact Us',
  metaTitle: 'Contact RAK Golden Visa Experts | Free Consultation for Property Investors',
  metaDescription: 'Contact Brightlink’s RAK Golden Visa experts for professional assistance with property investor residency, eligibility assessment, family sponsorship, and Golden Visa applications.',
  blocks: [
    b('pageHeader', { theme: 'dark', eyebrow: 'Contact', title: 'Get in Touch', subtitle: 'The UAE’s trusted VIP consultancy centre — DED licensed, fast, transparent, and designed for smooth processing without queues.' }),
    b('contact', {
      theme: 'light',
      eyebrow: 'We are here to help',
      title: 'Let’s Connect',
      content:
        '<p>We are committed to helping investors secure long-term residency in the UAE with confidence. Whether you need assistance with a RAK Golden Visa, property investor residency, family sponsorship, or the complete application process, our experienced team is here to guide you every step of the way.</p><p>Every application is unique — which is why we offer personalised consultations, transparent advice, and end-to-end support.</p>',
      formTitle: 'Get a free consultation',
      formText: 'Submit the form and we will review your enquiry and get back to you within 24 hours. Your information is kept fully confidential.',
      showMap: true,
    }),
    b('faq', { theme: 'sand', eyebrow: 'FAQ', title: 'Quick answers', group: 'home' }),
  ],
};

/* ============================== BLOG INDEX ============================== */
export const blog = {
  slug: 'latest-news-blogs',
  title: 'Latest News & Blogs',
  metaTitle: 'Latest News & Blogs - Golden Visa Ras Al Khaimah - RAK',
  metaDescription: 'Guides, news and expert insights on the RAK Golden Visa, UAE residency, property investment and retirement in Ras Al Khaimah.',
  blocks: [
    b('pageHeader', { theme: 'dark', eyebrow: 'Insights', title: 'Latest News & Blogs', subtitle: 'Expert guidance on UAE Golden Visa, real estate investment, immigration and long-term residency.' }),
    b('blog', { theme: 'light', title: 'All articles', count: 9, paginate: true }),
    b('cta', { theme: 'sand', style: 'dark', title: 'Have a question about your visa?', text: 'Our consultants reply within minutes on WhatsApp.', primary: { label: 'Ask on WhatsApp', href: wa }, secondary: { label: 'Apply online', href: '/apply' } }),
  ],
};

/* ============================== LEGAL ============================== */
export const privacy = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy',
  metaDescription: 'How we collect, use and protect your personal information.',
  blocks: [
    b('pageHeader', { theme: 'dark', title: 'Privacy Policy', subtitle: 'How we collect, use and protect your personal data.' }),
    b('richtext', {
      theme: 'light',
      width: 'narrow',
      content:
        '<p><em>Please review this template with your legal adviser and edit it in Admin → Pages.</em></p><h2>Information we collect</h2><p>When you contact us, submit an enquiry or apply online we collect the details you provide, such as your name, phone number, email address, nationality, passport details and documents you upload.</p><h2>How we use your information</h2><ul><li>To respond to your enquiries and provide our consultancy services</li><li>To prepare and submit applications to the relevant UAE authorities on your behalf</li><li>To keep you updated about the progress of your application</li><li>To meet legal and regulatory obligations</li></ul><h2>Sharing</h2><p>We share your information only with the government entities and service providers required to process your application (for example medical centres, insurers and typing centres). We never sell your data.</p><h2>Security</h2><p>Uploaded documents are stored privately and are only accessible to you and our authorised staff.</p><h2>Your rights</h2><p>You may request access to, correction of, or deletion of your personal data by contacting us.</p><h2>Contact</h2><p>For any privacy questions please email us using the details on our Contact page.</p>',
    }),
  ],
};

export const terms = {
  slug: 'terms-and-conditions',
  title: 'Terms & Conditions',
  metaTitle: 'Terms & Conditions',
  metaDescription: 'Terms and conditions for using this website and our services.',
  blocks: [
    b('pageHeader', { theme: 'dark', title: 'Terms & Conditions' }),
    b('richtext', {
      theme: 'light',
      width: 'narrow',
      content:
        '<p><em>Please review this template with your legal adviser and edit it in Admin → Pages.</em></p><h2>Our services</h2><p>We are an independent private consultancy that provides assistance with visa applications, document preparation, typing services and application submissions through official government channels. We are not a government authority.</p><h2>Decisions by authorities</h2><p>Final approval, processing times and visa decisions remain solely at the discretion of the competent UAE authorities. Meeting the eligibility criteria does not guarantee approval.</p><h2>Fees</h2><p>Government fees are set by the relevant authorities and may change without notice. Our professional fees will be confirmed to you in writing before work begins.</p><h2>Your responsibilities</h2><p>You confirm that all information and documents you provide are true, complete and valid.</p><h2>Limitation of liability</h2><p>We are not liable for delays or refusals caused by government authorities, incomplete documents, or circumstances outside our control.</p>',
    }),
  ],
};

home.blocks.splice(1, 0, estimateBlock());
export const allPages = [home, about, services, investor, retirement, contact, blog, privacy, terms];

/* ============================== SERVICES (records) ============================== */
export const serviceRecords = [
  { title: 'RAK Golden Visa – Investor', subtitle: 'Duration 10 years', description: 'Purchase real estate in Ras Al Khaimah valued at AED 2 million or more to qualify for the 10-year UAE Golden Visa.', price: 'AED 15,000', icon: 'building', link: '/ras-al-khaimah-property-golden-visa', featured: true },
  { title: 'RAK Retirement Visa', subtitle: 'Duration 5 years', description: 'A 5-year renewable residency for those 55 and older, blending comfort, security, and opportunity.', price: 'AED 10,000', icon: 'sun', link: '/ras-al-khaimah-retirement-visa', featured: true },
  { title: 'Family Golden Visa', subtitle: 'Spouse, Children & Parents', description: 'Sponsor eligible family members (spouse, children, or parents) for long-term residency.', price: 'AED 6,500', icon: 'users' },
  { title: 'UAE Visa Cancellation', subtitle: 'Inside / Outside Country', description: 'We manage the full UAE visa cancellation process, ensuring your exit or next step is smooth and stress-free.', price: 'AED 750', icon: 'ban' },
  { title: 'Medical VIP / Normal (EHS)', subtitle: 'Processing time 24 hours', description: 'Get your official medical test for a UAE residence visa.', price: 'AED 320', icon: 'doctor' },
  { title: 'Emirates ID Services', subtitle: 'Apply for 2, 5 & 10 years', description: 'Apply, renew, or replace your Emirates ID with full ICP compliance, biometric support and card issuance within 4–5 working days.', price: 'AED 385', icon: 'card' },
  { title: 'Health Insurance', subtitle: 'Health coverage in the UAE', description: 'Mandatory or premium medical coverage for visa applications with fast approval and full legal compliance.', price: '', icon: 'health' },
  { title: 'Update Personal Information', subtitle: 'Keep your information up to date', description: 'All-inclusive personal information updating support to help you complete such tasks effectively.', price: 'AED 275', icon: 'user-check' },
  { title: 'Family Visa Hold', subtitle: 'Family visa holding in the UAE', description: 'Place dependent visas on hold for up to 60 days during an employment / visa transfer. Refundable AED 5,000 deposit.', price: 'AED 5,500', icon: 'lock' },
  { title: 'Police Clearance Certificate', subtitle: 'Good conduct certificate', description: 'Official document confirming good conduct and the absence of a criminal record within the UAE.', price: 'AED 220', icon: 'shield' },
  { title: 'Marriage Certificate Attestation', subtitle: 'Legal recognition of marriage certificates', description: 'Fast processing — essential for spouse visas and family sponsorship in the UAE.', price: 'AED 1,050', icon: 'handshake' },
  { title: 'Birth Certificate Attestation', subtitle: 'Legal proof of birth', description: 'Confirms the authenticity of a birth certificate for legal use in the UAE and abroad.', price: 'AED 1,050', icon: 'baby' },
  { title: 'Educational Certificate Attestation', subtitle: 'Degree certificate attestation', description: 'Official verification of foreign academic qualifications by MOFAIC in the UAE.', price: 'AED 500', icon: 'student' },
  { title: 'MOFA Attestation', subtitle: 'UAE MOFA attestation services', description: 'The final legalisation step for documents to be officially recognised in the UAE or abroad.', price: 'AED 220', icon: 'stamp' },
  { title: 'Visit Visas', subtitle: '30 / 60 days UAE visit visa', description: 'Obtain your UAE visit visa or family entry permit in 48 hours — managed end to end.', price: 'AED 550', icon: 'plane' },
].map((s, i) => ({ ...s, category: 'main', order: i, active: true }));

export const additionalServices = [
  { title: 'PRO Services', description: 'Let our PRO team handle the admin tasks so you can focus on your business and save time and money.', icon: 'briefcase' },
  { title: 'Business Setup', description: 'Registering a company in the UAE made easy and cost-effective with an experienced formation partner.', icon: 'rocket' },
  { title: 'Banking', description: 'Step-by-step guidance for opening business or personal bank accounts smoothly.', icon: 'landmark' },
  { title: 'Residency Visa', description: 'Get a UAE family residence visa in only 72–96 hours.', icon: 'home' },
  { title: 'Legal Services', description: 'Guidance on UAE law for mergers and acquisitions, restructuring, financing and dispute resolution.', icon: 'scale' },
  { title: 'VAT & Accounting', description: 'Stay compliant with corporate tax and VAT obligations with the Federal Tax Authority (FTA).', icon: 'calculator' },
  { title: 'Administrative Services', description: 'HR admin support, HR consultancy, payroll management and recruitment solutions.', icon: 'users' },
  { title: 'Attestation Services', description: 'Notary and attestation services so your documents are accepted anywhere in the UAE.', icon: 'file-check' },
  { title: 'Compliance', description: 'Expert guidance through UAE regulatory requirements including ESR reports and UBO filings.', icon: 'clipboard' },
].map((s, i) => ({ ...s, category: 'additional', order: i, active: true }));

export const partnerRecords = [
  'ICP – Federal Authority for Identity, Citizenship, Customs & Port Security',
  'Government of Ras Al Khaimah',
  'Dubai Department of Economy & Tourism',
  'Government of Dubai',
  'Dubai Chamber',
  'UAE Ministry of Economy',
  'Government of Sharjah',
].map((name, i) => ({ name, order: i, active: true }));

/* ============================== BLOG POSTS ============================== */
export const posts = [
  {
    slug: 'ras-al-khaimah-golden-visa-guide-2026',
    title: 'Ras Al Khaimah Golden Visa: Complete 2026 Guide to Long-Term UAE Residency',
    excerpt: 'The UAE Golden Visa has become one of the country’s most sought-after residency programmes, allowing eligible foreign nationals to obtain long-term residence without depending on an employer or local sponsor.',
    category: 'RAK Golden Visa',
    tags: 'golden visa, ras al khaimah, residency, 2026',
    publishedAt: '2026-04-06T09:00:00.000Z',
    content:
      '<h2>Introduction</h2><p>The UAE Golden Visa has become one of the country’s most sought-after residency programmes, allowing eligible foreign nationals to obtain long-term residence without depending on an employer or local sponsor. Ras Al Khaimah (RAK) has emerged as one of the most attractive emirates to secure it — thanks to competitive property prices, a growing tourism sector and a relaxed coastal lifestyle.</p><h2>What is the RAK Golden Visa?</h2><p>The RAK Golden Visa is a <strong>10-year renewable residence permit</strong> issued by the Federal Authority for Identity, Citizenship, Customs and Port Security (ICP). Holders can live, work and invest anywhere in the UAE, sponsor their families and stay outside the country for more than six months without losing residency.</p><h2>Who is eligible?</h2><ul><li><strong>Property investors</strong> owning real estate in RAK worth AED 2 million or more (ready or eligible off-plan)</li><li><strong>Fixed deposit holders</strong> with AED 2 million in an approved UAE bank</li><li><strong>Entrepreneurs</strong> with registered UAE businesses meeting the investment or VAT criteria</li><li><strong>Skilled professionals</strong> such as doctors, engineers and scientists meeting salary and classification requirements</li><li><strong>Outstanding students</strong>, creative talents and humanitarian pioneers</li></ul><h2>Key benefits</h2><ul><li>10-year renewable residency with no local sponsor</li><li>Sponsor your spouse, children, parents and domestic workers</li><li>Access to UAE banking and financial services</li><li>Freedom to live, work and invest anywhere in the UAE</li></ul><h2>How long does it take?</h2><p>Approvals are typically issued within a few working days. The full process — including medical fitness, Emirates ID biometrics and visa issuance — usually takes one to two weeks. With our VIP fast-track service, eligible property investors can complete the process in as little as 48 working hours.</p><h2>How much does it cost?</h2><p>Government fees for the main applicant typically range from AED 3,500 to AED 5,500, excluding health insurance and professional fees. Each dependent incurs a similar set of per-person fees.</p><h2>Next steps</h2><p>The fastest way to start is a free eligibility check. Our consultants review your documents, confirm your category and handle the full application on your behalf.</p>',
  },
  {
    slug: 'ras-al-khaimah-vip-fast-track-golden-visa-property-investment',
    title: 'Ras Al Khaimah VIP Fast Track Golden Visa Through Property Investment – Complete 2026 Guide',
    excerpt: 'Secure your UAE Golden Visa in just 2–3 working days. Looking for the fastest way to obtain a 10-Year UAE Golden Visa through property investment? Here is how our VIP service works.',
    category: 'RAK Golden Visa',
    tags: 'vip, fast track, property, investor visa',
    publishedAt: '2026-04-01T09:00:00.000Z',
    content:
      '<h2>Secure your UAE Golden Visa in just 2–3 working days</h2><p>Looking for the fastest way to obtain a 10-Year UAE Golden Visa through property investment? Our VIP fast-track service in Ras Al Khaimah is designed for property investors who want a smooth, fast and hassle-free experience.</p><h2>Who qualifies?</h2><ul><li>Owners of property in Ras Al Khaimah valued at AED 2 million or more</li><li>Off-plan buyers who have paid at least 10% with a registered SPA</li><li>Investors combining multiple RAK properties under a single owner</li></ul><h2>What the VIP package includes</h2><ul><li>Fast-track visa approval</li><li>VIP medical fitness test</li><li>VIP biometrics and Emirates ID</li><li>Health insurance</li><li>NOC for Golden Visa and evaluation certificate</li></ul><h2>Documents you will need</h2><ul><li>Pre Title Deed / Oqood</li><li>Sale & Purchase Agreement (SPA)</li><li>NOC from the developer for the Golden Visa</li><li>Clear passport scan and a passport photo on a white background</li><li>Mother’s name, email address, religion and relationship status</li></ul><h2>Package cost</h2><table><thead><tr><th>Description</th><th>Cost (AED)</th></tr></thead><tbody><tr><td>Golden Visa RAK Fast Track Package</td><td>7,500</td></tr><tr><td>Evaluation Certificate</td><td>1,050</td></tr><tr><td>Pre-Approval Certificate</td><td>1,575</td></tr><tr><td>Professional Fees</td><td>5,250</td></tr><tr><td><strong>Total</strong></td><td><strong>AED 15,375</strong></td></tr></tbody></table><h2>Why choose VIP?</h2><p>You spend only two to three working days in the UAE, with appointments pre-booked and pick-up and drop-off arranged. A dedicated specialist manages every step, so you avoid queues and repeat visits.</p>',
  },
  {
    slug: 'ras-al-khaimah-golden-visa-2026-eligibility-costs-rules',
    title: 'Ras Al Khaimah Golden Visa 2026: Eligibility, Real Costs, Rules and How to Apply',
    excerpt: 'The RAK Golden Visa offers eligible applicants a renewable 10-year UAE residence permit, allowing them to live, work, and invest in the country without the need for a local sponsor.',
    category: 'RAK Golden Visa',
    tags: 'eligibility, costs, rules, how to apply',
    publishedAt: '2026-03-02T09:00:00.000Z',
    content:
      '<p>The RAK Golden Visa offers eligible applicants a renewable 10-year UAE residence permit, allowing them to live, work, and invest in the country without the need for a local sponsor. Here is what you need to know in 2026.</p><h2>Eligibility rules for property investors</h2><ul><li>Minimum property value of AED 2 million in Ras Al Khaimah</li><li>Single ownership only — joint ownership is not accepted in RAK</li><li>Off-plan properties qualify with at least 10% paid and a registered SPA</li><li>Mortgaged properties may qualify with a bank NOC</li></ul><h2>The real costs</h2><table><thead><tr><th>Fee component</th><th>Amount (AED)</th></tr></thead><tbody><tr><td>ICP visa issuance (10-year)</td><td>2,800 – 3,800</td></tr><tr><td>Emirates ID (10-year card)</td><td>1,150 – 1,200</td></tr><tr><td>Medical fitness test</td><td>700 – 1,000</td></tr><tr><td>Health insurance</td><td>Plan dependent</td></tr><tr><td>Attestation & processing</td><td>1,500 – 3,000 per person</td></tr></tbody></table><p>Government fees for the main applicant typically total AED 3,500 to AED 5,500. Fees are set by the authorities and may change without notice.</p><h2>How to apply</h2><ol><li><strong>Eligibility assessment</strong> — we review your category and documents.</li><li><strong>Document preparation</strong> — verification against ICP and RAK requirements.</li><li><strong>Submission</strong> — through official ICP Smart Services and RAK channels.</li><li><strong>Medical & Emirates ID</strong> — after approval, complete the medical and biometrics.</li><li><strong>Issuance</strong> — your 10-year residence permit is issued electronically.</li></ol><h2>Common reasons for rejection</h2><ul><li>Property below threshold or unapproved developer</li><li>Incomplete or unclear documents</li><li>Salary or employment criteria not met</li></ul><p>Working with an experienced consultancy minimises these risks and speeds up approval.</p>',
  },
];

export const testimonialPlaceholders = [
  { name: 'Sample client', role: 'Property investor', country: '', rating: 5, text: 'Replace this sample with a real client review in Admin → Testimonials, then switch it to Active.', active: false, order: 0 },
  { name: 'Sample client 2', role: 'Retirement visa', country: '', rating: 5, text: 'Replace this sample with a real client review in Admin → Testimonials, then switch it to Active.', active: false, order: 1 },
  { name: 'Sample client 3', role: 'Family visa', country: '', rating: 5, text: 'Replace this sample with a real client review in Admin → Testimonials, then switch it to Active.', active: false, order: 2 },
];
