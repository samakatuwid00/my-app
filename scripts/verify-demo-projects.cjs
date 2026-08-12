// Verify portfolio demo-project integration on the dev server
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  // Skip the CLI intro boot gate.
  await page.addInitScript(() => localStorage.setItem('portfolio-intro-seen', 'true'));
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto('http://localhost:5175/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const cards = page.locator('button[aria-label^="View"]');
  const count = await cards.count();
  console.log('cards:', count);
  if (count !== 8) throw new Error('expected 8 cards, got ' + count);

  for (const [title, expectVideo, expectPoster, expectGithub] of [
    ['JARVIS HUD', true, false, true],
    ['Sticky Brain', true, false, true],
    ['Second Brain', false, true, true],
  ]) {
    await cards.filter({ hasText: title }).first().click();
    await page.waitForTimeout(700);
    const modal = page.locator('[role="dialog"], .modal, [data-modal]').last();
    const inModal = await page.evaluate(() => {
      const v = document.querySelector('video');
      const img = document.querySelector('img[alt*="preview"]');
      return {
        video: v ? { src: v.querySelector('source')?.src.split('/').pop(), poster: v.poster.split('/').pop() } : null,
        img: img ? img.src.split('/').pop() : null,
        links: [...document.querySelectorAll('a')].map((a) => a.textContent.trim() + '|' + a.href).filter(Boolean),
      };
    });
    console.log(title, JSON.stringify(inModal));
    if (expectVideo && !inModal.video) throw new Error(title + ': no video');
    if (expectPoster && !inModal.img) throw new Error(title + ': no poster image');
    if (!expectVideo && !expectPoster) throw new Error(title + ': expected some media');
    if (expectGithub && !inModal.links.some((l) => l.includes('github.com'))) {
      throw new Error(title + ': no GitHub link');
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  console.log('errors:', errors.length ? errors : 'none');
  await browser.close();
  if (errors.length) process.exit(2);
  console.log('VERIFY OK');
})();
