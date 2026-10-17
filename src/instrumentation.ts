// Runs once when the website server starts.
// Fills in any missing translations in the background (all 9 extra languages).
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.DISABLE_AUTO_TRANSLATE === '1') return;
  setTimeout(async () => {
    try {
      const { getSetting } = await import('./lib/settings');
      const cfg = await getSetting('translation');
      if (!cfg.autoTranslate || cfg.provider === 'off') return;
      const { enqueueAll } = await import('./lib/i18n/jobs');
      await enqueueAll(false);
      console.log('[translate] background translation started');
    } catch (e) {
      console.error('[translate] startup failed:', (e as Error).message);
    }
  }, 20_000);
}
