import type { Block } from './types';
import type { SiteSettings } from '@/lib/defaults';
import Hero from './Hero';
import {
  PageHeader,
  IntroSplit,
  Steps,
  Features,
  Visit,
  About,
  Checklist,
  Table,
  Offer,
  Compare,
  CtaBanner,
  Pricing,
  Stats,
  ImageText,
  RichText,
  Html,
} from './ContentBlocks';
import { Tabs, Rejections, Accordion, Faq, Testimonials, Partners, Services, Blog, CalculatorBlock, Contact, LeadFormBlock } from './DynamicBlocks';

const MAP: Record<string, (p: { data: any; site: SiteSettings }) => any> = {
  pageHeader: PageHeader,
  introSplit: IntroSplit,
  steps: Steps,
  features: Features,
  visit: Visit,
  about: About,
  tabs: Tabs,
  checklist: Checklist,
  table: Table,
  offer: Offer,
  compare: Compare,
  rejections: Rejections,
  cta: CtaBanner,
  blog: Blog,
  testimonials: Testimonials,
  partners: Partners,
  faq: Faq,
  services: Services,
  pricing: Pricing,
  stats: Stats,
  accordion: Accordion,
  imageText: ImageText,
  richtext: RichText,
  calculator: CalculatorBlock,
  contact: Contact,
  leadForm: LeadFormBlock,
  html: Html,
};

export default function BlockRenderer({ blocks, site }: { blocks: Block[]; site: SiteSettings }) {
  return (
    <>
      {blocks
        .filter((b) => b && !b.data?.hidden)
        .map((b) => {
          if (b.type === 'hero') return <Hero key={b.id} data={b.data} />;
          const C = MAP[b.type];
          if (!C) return null;
          return <C key={b.id} data={b.data || {}} site={site} />;
        })}
    </>
  );
}
