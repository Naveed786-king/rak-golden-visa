import { getSiteBundle } from '@/lib/settings';
import { SiteProvider } from '@/components/site/SiteProvider';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Floating from '@/components/site/Floating';
import Preloader from '@/components/site/Preloader';
import InjectScripts from '@/components/site/InjectScripts';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { site, header, footer } = await getSiteBundle();
  return (
    <SiteProvider site={site}>
      {site.showPreloader && <Preloader />}
      <Header site={site} header={header} />
      <main>{children}</main>
      <Footer site={site} footer={footer} />
      <Floating site={site} />
      <InjectScripts html={site.headScripts} target="head" />
      <InjectScripts html={site.bodyScripts} target="body" />
      <div className="h-16 md:hidden" />
    </SiteProvider>
  );
}
