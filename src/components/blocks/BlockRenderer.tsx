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
import { Tabs, Rejections, Accordion, Faq, Testimonials, Partners, Services, Blog, CalculatorBlock, Contact, LeadFormBlock, EstimateBlock } from './DynamicBlocks';
import { blockCss, blockFonts, googleFontsUrl } from '@/lib/design';
import { getSetting } from '@/lib/settings';

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
  estimate: EstimateBlock,
  contact: Contact,
  leadForm: LeadFormBlock,
  html: Html,
};

export default async function BlockRenderer({ blocks, site }: { blocks: Block[]; site: SiteSettings }) {
  const design = await getSetting('design');
  const defaultAnim = design.animation.enabled && design.animation.style && design.animation.style !== 'none' ? design.animation.style : undefined;
  const fonts = googleFontsUrl(blockFonts(blocks));
  return (
    <>
      {fonts && <link rel="stylesheet" href={fonts} precedence="default" />}
      {blocks
        .filter((b) => b && !b.data?.hidden)
        .map((b) => {
          const C = b.type === 'hero' ? null : MAP[b.type];
          if (b.type !== 'hero' && !C) return null;
          const style = b.data?.style || {};
          const css = blockCss(b.id, style);
          const anim = style.animation ? (style.animation === 'none' ? undefined : style.animation) : b.type === 'hero' ? undefined : defaultAnim;
          return (
            <div key={b.id} id={`b-${b.id}`} className="blk" data-anim={anim} data-type={b.type}>
              {b.type === 'hero' ? <Hero data={b.data} /> : C ? <C data={b.data || {}} site={site} /> : null}
              {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
            </div>
          );
        })}
    </>
  );
}
