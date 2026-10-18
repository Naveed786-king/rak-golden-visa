import { getLocalizedBundle, getSetting } from '@/lib/settings';
import { getI18n } from '@/lib/i18n/server';
import { SiteProvider } from '@/components/site/SiteProvider';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Floating from '@/components/site/Floating';
import Preloader from '@/components/site/Preloader';
import InjectScripts from '@/components/site/InjectScripts';
import DesignEffects from '@/components/site/DesignEffects';
import { designCss, designBodyClass, googleFontsUrl } from '@/lib/design';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { locale, dict } = await getI18n();
  const [{ site, header, footer }, tr, design] = await Promise.all([getLocalizedBundle(locale), getSetting('translation'), getSetting('design')]);
  const languages = tr.showSwitcher ? tr.enabled : ['en'];
  const fonts = googleFontsUrl([design.fonts.heading, design.fonts.body, design.fonts.arabic]);
  return (
    <SiteProvider site={site} locale={locale} dict={dict} languages={languages}>
      {fonts && <link rel="stylesheet" href={fonts} precedence="default" />}
      <style dangerouslySetInnerHTML={{ __html: designCss(design) }} />
      <div className={designBodyClass(design)}>
      {site.showPreloader && <Preloader />}
      <Header site={site} header={header} />
      <main>{children}</main>
      <Footer site={site} footer={footer} />
      <Floating site={site} />
      <InjectScripts html={site.headScripts} target="head" />
      <InjectScripts html={site.bodyScripts} target="body" />
      <div className="h-16 md:hidden" />
      <DesignEffects />
      </div>
    </SiteProvider>
  );
}
