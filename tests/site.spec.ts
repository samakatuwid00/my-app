import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'
import { intents } from '../src/data/ask'
import { skillGroups } from '../src/data/facts'
import { resolveLocally } from '../src/services/askRouter'

const answer = (id: string) => intents.find((i) => i.id === id)!.answer()

test.describe('shell', () => {
  test('home renders the new header brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header.site .brand')).toContainText('Roger Abay')
  })
})

test.describe('type and ink', () => {
  test('body is Inter Tight on the black ground', async ({ page }) => {
    await page.goto('/')
    const body = await page.evaluate(() => {
      const s = getComputedStyle(document.body)
      return { font: s.fontFamily, bg: s.backgroundColor }
    })
    expect(body.font).toContain('Inter Tight')
    expect(body.bg).toBe('rgb(11, 11, 11)')
  })
})

test('assistant context names every group of work, with Eurasian marked not deployed', () => {
  const context = readFileSync('api/context.ts', 'utf8')
  for (const title of ['iRIMS-V Library System', 'iRIMS-V Accounts', 'Cygnus', 'Eurasian Paradise Resort', 'Cerebrum Sizer']) expect(context).toContain(title)
  expect(answer('projects')).toContain('Eurasian Paradise Resort (not deployed)')
})

test.describe('assistant answers match what the site shows', () => {
  test('location says where, and makes no remote-work claim', () => {
    expect(answer('location')).not.toMatch(/remote/i)
    expect(resolveLocally('do you work remote?') ?? '').not.toMatch(/remote/i)
    expect(resolveLocally('where are you based?')).toMatch(/Pasacao/)
  })
  test('projects groups the work the way the page does', () => {
    const text = answer('projects')
    expect(text).toMatch(/^The iRIMS-V suite, four systems/)
    const [suite, rest] = text.split(/\n\n(?=Also in production)/)
    const [also, log] = rest.split(/\n\n(?=Build log)/)
    for (const title of ['iRIMS-V –', 'iRIMS-V Library System –', 'iRIMS-V Library app (in progress) –', 'iRIMS-V Accounts (in progress) –']) expect(suite).toContain(title)
    for (const title of ['EDULEAVE –', 'LRMIS –']) expect(also).toContain(title)
    for (const title of ['Cygnus', 'Eurasian Paradise Resort', 'schema_mapper', 'Sticky Brain', 'Second Brain', 'Cerebrum Sizer']) {
      expect(log).toContain(title)
      expect(suite).not.toContain(title)
    }
  })
  test('government lists only live systems as built', () => {
    const text = answer('government')
    for (const title of ['iRIMS-V', 'EDULEAVE', 'LRMIS', 'iRIMS-V Library System']) expect(text).toContain(`${title} –`)
    expect(text).not.toContain('iRIMS-V Library app')
  })
  test('"also shipped in production" comes only from live and internal systems', () => {
    const also = skillGroups.find((g) => g.label === 'Also shipped in production')!.items
    expect(also).toContain('Maatwebsite Excel')
    for (const name of ['ClickHouse Three', 'Flutter', 'Electron', 'Kokoro (TTS)', 'TurboVec', 'Hermes CLI', 'Obsidian']) expect(also).not.toContain(name)
  })
})

test.describe('navigation', () => {
  test('section links and legacy redirects', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL('/')
    await page.goto('/projects')
    await expect(page).toHaveURL('/#work')
    await page.goto('/contact')
    await expect(page).toHaveURL('/#contact')
  })
  test('unknown path is a real 404', async ({ page }) => {
    await page.goto('/nope')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
  test('header turns paper over a paper band', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop header')
    await page.goto('/')
    await expect(page.locator('header.site')).toHaveClass(/dark/)
    await page.evaluate(() => window.scrollTo(0, document.getElementById('services')!.getBoundingClientRect().top + window.scrollY + 120))
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
  test('on a phone the header keeps Hire me and drops the section links', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone only')
    await page.goto('/')
    await expect(page.locator('header.site').getByRole('link', { name: 'Hire me' })).toBeVisible()
    await expect(page.locator('header.site nav.links')).toBeHidden()
  })
  test('Back returns to the work section where the visitor left it', async ({ page }) => {
    // EDULEAVE's button, outside the stacking cards: there a later card can
    // slide over an earlier card's button, and a click has to scroll to reach it.
    await page.goto('/#also')
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('also')!.getBoundingClientRect().top))).toBeLessThan(80)
    await page.evaluate(() => window.scrollBy(0, 200))
    const button = page.locator('a[data-shot="eduleave"]')
    await button.scrollIntoViewIfNeeded()
    // Read on past the section's top before leaving, so a re-run of the #also
    // jump on Back (the bug) lands somewhere else than where the visitor was.
    const left = await page.evaluate(() => window.scrollY)
    expect(left).toBeGreaterThan(await page.evaluate(() => document.getElementById('also')!.getBoundingClientRect().top + window.scrollY) + 40)
    await button.click()
    await expect(page).toHaveURL('/work/eduleave')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await page.goBack()
    await expect(page).toHaveURL('/#also')
    await expect(page.locator('#also')).toBeInViewport()
    await expect.poll(() => page.evaluate((y) => Math.abs(window.scrollY - y), left)).toBeLessThan(8)
  })
  test('a fresh load of another page starts at its top, not where the last page was left', async ({ page }) => {
    // Both page loads are the tab's first history entry (key "default"), so a
    // restorer keyed on location.key alone hands the old page's offset to the new one.
    await page.goto('/#experience')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
    await page.goto('/work/irims-v')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // Restoration runs in a layout effect on the first render; two frames later
    // any offset it applied is already on the page.
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))))
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
  })
  test('the 404 is noindex, the home page is not', async ({ page }) => {
    await page.goto('/nope')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
    await expect(page.locator('head meta[name="robots"][content="noindex"]')).toHaveCount(1)
    await page.getByRole('link', { name: 'Back home' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Roger A\.\s*Abay Jr\./)
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
    await page.goto('/')
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  test('noscript still says who, what, and how to reach him', async ({ page }) => {
    await page.goto('/')
    const ns = page.locator('.noscript')
    await expect(ns).toBeVisible()
    await expect(ns).toContainText('Roger A. Abay Jr.')
    await expect(ns).toContainText('Full-Stack Developer')
    await expect(ns.locator('a[href="mailto:abaygherjr07@gmail.com"]')).toHaveCount(1)
    await expect(ns.locator('a[href="https://github.com/samakatuwid00"]')).toHaveCount(1)
    await expect(ns.locator('a[href^="https://linkedin.com/in/"]')).toHaveCount(1)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary')
  })
})

test.describe('selection', () => {
  test('selected text takes the band ink, inverted, on both inks', async ({ page }) => {
    await page.goto('/')
    const sel = (selector: string) => page.locator(selector).first().evaluate((el) => {
      const s = getComputedStyle(el, '::selection')
      const b = getComputedStyle(el.closest('[data-band]')!)
      return { bg: s.backgroundColor, color: s.color, fg: b.color, band: b.backgroundColor }
    })
    for (const selector of ['.hero p', '#services .head p']) {
      const s = await sel(selector)
      expect(s.bg, selector).toBe(s.fg)
      expect(s.color, selector).toBe(s.band)
    }
    expect((await sel('.hero p')).bg).not.toBe((await sel('#services .head p')).bg)
  })
})

test.describe('hero', () => {
  test('name, tagline, credits', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Roger A\.\s*Abay Jr\./)
    await expect(page.locator('.credits dt')).toHaveText(['Now', 'Before', 'Recognized', 'Education'])
  })
  test('portrait thinks on hover, next line each visit', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/')
    await page.hover('#me')
    await expect(page.locator('.thought')).toBeVisible()
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
    await page.mouse.move(5, 5)
    await page.hover('#me')
    await expect(page.locator('#thought-text')).toHaveText('Still shipping updates to iRIMS-V.')
  })
  test('the thought bubble is described, not announced', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#me')).toHaveAttribute('aria-describedby', 'thought-text')
    await expect(page.locator('#me [aria-live]')).toHaveCount(0)
  })
  test('portrait thought toggles on tap', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch')
    await page.goto('/')
    await page.tap('#me')
    await expect(page.locator('#me')).toHaveClass(/open/)
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
  })
  test('a hash jump leaves the header on the band it landed on', async ({ page }) => {
    await page.goto('/#experience')
    await expect(page.locator('header.site')).toHaveClass(/dark/)
    await page.goto('/#services')
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
})

test.describe('work', () => {
  test('the suite: a collage of four systems, then a card for each in order', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work h2')).toHaveText('The iRIMS-V suite')
    await expect(page.locator('.collage a.piece')).toHaveCount(4)
    await expect(page.locator('.cases article.case h3')).toHaveText(['iRIMS-V Inventory', 'iRIMS-V Library System', 'iRIMS-V Library app', 'iRIMS-V Accounts'])
    await expect(page.locator('.cases article.case .top span:first-child')).toHaveText([/^1 of 4/, /^2 of 4/, /^3 of 4/, /^4 of 4/])
    await expect(page.locator('a[href="https://irimsv-library.net/"]').first()).toBeVisible()
  })
  test('cards alternate inks and the header follows them', async ({ page }) => {
    await page.goto('/')
    const tones = await page.locator('.cases article.case').evaluateAll((els) => els.map((e) => e.getAttribute('data-band')))
    expect(tones).toEqual(['light', 'dark', 'light', 'dark'])
  })
  test('two more systems in production, each with its case study', async ({ page }) => {
    await page.goto('/#also')
    await expect(page.locator('#also .duo h3')).toHaveText(['EDULEAVE', 'LRMIS'])
    await expect(page.locator('#also a[href="https://card.eduleave.com/welcome"]')).toHaveCount(1)
    const links = page.locator('main a[data-shot]')
    await expect(links).toHaveCount(4)
    for (const [i, slug] of ['irims-v', 'irims-v-library', 'eduleave', 'lrmis'].entries()) await expect(links.nth(i)).toHaveAttribute('href', `/work/${slug}`)
  })
  test('each case study page renders its own copy', async ({ page }) => {
    for (const [slug, title] of [['eduleave', 'EDULEAVE'], ['lrmis', 'LRMIS'], ['irims-v-library', 'iRIMS-V Library System']]) {
      await page.goto(`/work/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
      await expect(page.locator('.cs-sec h2')).toHaveText(['Problem', 'Approach', 'Result'])
    }
  })
  test('suite screens show in colour under a live schematic; the build log stays halftoned', async ({ page }) => {
    await page.goto('/#irims-v')
    const frame = page.locator('#irims-v .sf').first()
    await expect(frame.locator('img')).toHaveCSS('filter', 'none')
    expect(await frame.evaluate((el) => getComputedStyle(el, '::after').content)).toBe('none')
    await expect(frame.locator('svg.fig')).toHaveCount(1)
    await expect(frame.locator('svg.fig')).toHaveClass(/\bon\b/)
    const log = page.locator('#cygnus .sf')
    await expect(log.locator('img')).toHaveCSS('filter', /grayscale\(1\)/)
    expect(await log.evaluate((el) => getComputedStyle(el, '::after').backgroundImage)).toContain('radial-gradient')
  })
  test('hover clears the schematic and shows the real screen', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#irims-v')
    const frame = page.locator('#irims-v .sf').first()
    await frame.hover()
    await expect.poll(() => frame.locator('svg.fig').evaluate((el) => getComputedStyle(el).opacity)).toBe('0')
    await expect.poll(() => frame.locator('.scrim').evaluate((el) => getComputedStyle(el).opacity)).toBe('0')
  })
  test('the build log shows every other project, linking only to public source', async ({ page }) => {
    await page.goto('/#more')
    await expect(page.locator('#more .cell h3')).toHaveText(['Cygnus', 'Eurasian Paradise Resort', 'schema_mapper', 'Sticky Brain', 'Second Brain', 'Cerebrum Sizer'])
    await expect(page.locator('#more a.cell')).toHaveCount(1)
    await expect(page.locator('#more a.cell')).toHaveAttribute('href', 'https://github.com/samakatuwid00/sticky-brain')
    await expect(page.locator('#eurasian')).toContainText('Not deployed')
  })
})

test.describe('services', () => {
  test('each offer points to a system on the page that already does it', async ({ page }) => {
    await page.goto('/#services')
    const proofs = page.locator('#services .offer .proof')
    await expect(proofs).toHaveCount(6)
    for (const href of await proofs.evaluateAll((els) => els.map((e) => e.getAttribute('href')!))) {
      expect(await page.locator(href.replace('/', '')).count(), href).toBe(1)
    }
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('live screens are complete and never armed', async ({ page }) => {
      await page.goto('/#irims-v')
      await expect(page.locator('html')).not.toHaveClass(/figs-armed/)
      await expect(page.locator('svg.fig').first()).toHaveClass(/\bon\b/)
      await expect(page.locator('.pet')).toBeHidden()
    })
  })
})

test.describe('proof', () => {
  test('three quotes, no private repo links', async ({ page }) => {
    await page.goto('/#recognition')
    await expect(page.locator('#recognition blockquote')).toHaveCount(3)
    await expect(page.locator('a[href*="samakatuwid00/JARVIS"]')).toHaveCount(0)
    await expect(page.locator('a[href*="second-brain-vault"]')).toHaveCount(0)
    await expect(page.locator('#more')).toContainText('Cygnus')
  })
  test('award is a picture under a drawing of itself, with its caption', async ({ page }) => {
    await page.goto('/#recognition')
    await expect(page.locator('#recognition figure .sf picture img')).toHaveCount(1)
    await expect(page.locator('#recognition figure .sf svg.fig')).toHaveCount(1)
    await expect(page.locator('#recognition figcaption')).toContainText('Full Stack Developer Award')
  })
  test('faq opens', async ({ page }) => {
    await page.goto('/#faq')
    await page.getByText('Where does the system run?').click()
    await expect(page.getByText(/On a Linux VPS I set up and manage/)).toBeVisible()
  })
})

test.describe('contact', () => {
  test('channel tabs switch the address', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('tab', { name: 'GitHub' }).click()
    await expect(page.locator('#reach-v')).toHaveText('github.com/samakatuwid00')
    await expect(page.locator('#reach-v')).toHaveAttribute('href', 'https://github.com/samakatuwid00')
    await expect(page.getByRole('tab', { name: 'GitHub' })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tab', { name: 'Email' })).toHaveAttribute('aria-selected', 'false')
  })
  test('arrow keys move between tabs', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('tab', { name: 'Email' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('tab', { name: 'LinkedIn' })).toBeFocused()
    await expect(page.locator('#reach-v')).toHaveText('linkedin.com/in/roger-abay-30394441b')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await expect(page.getByRole('tab', { name: 'Facebook' })).toBeFocused()
    await expect(page.locator('#reach-v')).toHaveText('facebook.com/niko.0y')
  })
  test('the longest address never widens the page', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('tab', { name: 'LinkedIn' }).click()
    const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
    expect(sw).toBeLessThanOrEqual(cw)
  })
  test('empty form is blocked with a message', async ({ page }) => {
    let posted = false
    await page.route('https://formspree.io/**', (route) => { posted = true; return route.abort() })
    await page.goto('/#contact')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByText(/required|enter/i).first()).toBeVisible()
    await expect(page.locator('#contact [role="alert"]').first()).toBeVisible()
    expect(posted).toBe(false)
  })
  test('a valid message is sent and confirmed', async ({ page }) => {
    const bodies: unknown[] = []
    await page.route('https://formspree.io/**', async (route) => {
      bodies.push(route.request().postDataJSON())
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
    await page.goto('/#contact')
    const form = page.locator('#contact form')
    await form.getByLabel('Name').fill('Test Visitor')
    await form.getByLabel('Email').fill('visitor@example.com')
    await form.getByLabel('Subject').fill('Records system')
    await form.getByLabel(/message|system do/i).fill('We still file leave forms on paper.')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByRole('status').filter({ hasText: /message sent/i })).toBeVisible()
    expect(bodies).toHaveLength(1)
    expect(bodies[0]).toMatchObject({ name: 'Test Visitor', email: 'visitor@example.com', subject: 'Records system' })
  })
})

test.describe('case study', () => {
  test('iRIMS-V page renders from data', async ({ page }) => {
    await page.goto('/work/irims-v')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('iRIMS-V')
    await expect(page.getByText('Integrated Resource Inventory and Mapping System for Region V')).toBeVisible()
    // The mockup has two "All work" links, top and bottom; both go back to the work section.
    const back = page.getByRole('link', { name: /all work/i })
    await expect(back).toHaveCount(2)
    for (const link of await back.all()) await expect(link).toHaveAttribute('href', '/#work')
  })
  test('project without a case study is a 404', async ({ page }) => {
    await page.goto('/work/schema-mapper')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
  test('no placeholder metric rows; next walks the case studies and wraps', async ({ page }) => {
    await page.goto('/work/irims-v')
    await expect(page.locator('.cs-sec h2')).toHaveText(['Problem', 'Approach', 'Result'])
    await expect(page.locator('.cs-sec li')).toHaveCount(5)
    await expect(page.locator('.cs-body .tr, .todo')).toHaveCount(0)
    await expect(page.getByRole('link', { name: /^next/i })).toHaveAttribute('href', '/work/irims-v-library')
    await page.goto('/work/lrmis')
    await expect(page.getByRole('link', { name: /^next/i })).toHaveAttribute('href', '/work/irims-v')
    await page.goto('/work/irims-v')
    await expect(page.locator('.cs-meta a.live')).toHaveAttribute('href', 'https://irimsv.net/')
  })
  test('title names the project, home restores the default', async ({ page }) => {
    await page.goto('/work/irims-v')
    await expect(page).toHaveTitle('iRIMS-V · Roger A. Abay Jr.')
    await page.getByRole('link', { name: /all work/i }).first().click()
    await expect(page).toHaveURL('/#work')
    await expect(page).toHaveTitle('Roger A. Abay Jr. | Full Stack Developer')
  })
  test('the clicked screenshot carries across and back without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()) })
    await page.goto('/#irims-v')
    await page.locator('a[data-shot="irims-v"]').click()
    await expect(page).toHaveURL('/work/irims-v')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('iRIMS-V')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expect(page.locator('.cs-shot')).toHaveCSS('view-transition-name', 'shot')
    await page.getByRole('link', { name: /all work/i }).first().click()
    await expect(page).toHaveURL('/#work')
    await expect.poll(() => page.evaluate(() => document.getElementById('work')?.getBoundingClientRect().top ?? Infinity)).toBeLessThan(80)
    // Between transitions no home preview holds the name, so it can never be duplicated.
    await expect.poll(() => page.evaluate(() =>
      [...document.querySelectorAll('.sf')].filter((el) => getComputedStyle(el).viewTransitionName === 'shot').length,
    )).toBe(0)
    expect(errors).toEqual([])
  })
  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' })
    test('the transition runs without animation and the page still swaps', async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto('/#irims-v')
      await page.locator('a[data-shot="irims-v"]').click()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('iRIMS-V')
      const running = await page.evaluate(() => document.getAnimations().filter((a) => String((a.effect as KeyframeEffect | null)?.pseudoElement ?? '').startsWith('::view-transition')).length)
      expect(running).toBe(0)
      expect(errors).toEqual([])
    })
  })
})

test.describe('assistant', () => {
  // Every assistant test routes the API: the suite must never reach Groq.
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/ask', (r) => r.fulfill({ json: { answer: 'I build Laravel systems.' } }))
  })

  test('button opens the panel; a chip asks and is answered locally', async ({ page }) => {
    let calls = 0
    await page.route('**/api/ask', (r) => { calls++; return r.fulfill({ json: { answer: 'unused' } }) })
    await page.goto('/')
    const button = page.getByRole('button', { name: /ask about my work/i })
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    await expect(dialog).toBeHidden()
    await button.click()
    await expect(dialog).toBeVisible()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(dialog.getByRole('textbox', { name: /your question/i })).toBeFocused()
    await dialog.getByRole('button', { name: /what's your stack/i }).click()
    const log = dialog.getByRole('log')
    await expect(log).toContainText(/what's your stack\?/i)
    await expect(log).toContainText('Most production work is Laravel')
    expect(calls).toBe(0)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(button).toBeFocused()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  test('a typed question goes to the API, with a thinking state', async ({ page }) => {
    let body: unknown = null
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    await page.route('**/api/ask', async (r) => {
      body = r.request().postDataJSON()
      await held
      await r.fulfill({ json: { answer: 'I build Laravel systems.' } })
    })
    await page.goto('/')
    await page.getByRole('button', { name: /ask about my work/i }).click()
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    const input = dialog.getByRole('textbox', { name: /your question/i })
    await input.fill('Do you like jazz?')
    await input.press('Enter')
    await expect(dialog.getByText(/thinking/i)).toBeVisible()
    release()
    await expect(dialog.getByRole('log')).toContainText('I build Laravel systems.')
    await expect(dialog.getByText(/thinking/i)).toBeHidden()
    await expect(input).toHaveValue('')
    expect(body).toEqual({ messages: [{ role: 'user', text: 'Do you like jazz?' }] })
  })

  test('an API failure falls back to the offline reply', async ({ page }) => {
    await page.route('**/api/ask', (r) => r.fulfill({ status: 500, json: { error: 'down' } }))
    await page.goto('/')
    await page.getByRole('button', { name: /ask about my work/i }).click()
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    const input = dialog.getByRole('textbox', { name: /your question/i })
    await input.fill('Do you like jazz?')
    await input.press('Enter')
    await expect(dialog.getByRole('log')).toContainText('outside what I can answer here')
  })

  test('slash opens the panel when nothing else is open', async ({ page }) => {
    await page.goto('/')
    await page.locator('body').click({ position: { x: 5, y: 400 } })
    await page.keyboard.press('/')
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('textbox', { name: /your question/i })).toBeFocused()
    await expect(dialog.getByRole('textbox', { name: /your question/i })).toHaveValue('')
  })

  test('slash is ignored while typing in a field', async ({ page }) => {
    await page.goto('/#contact')
    const name = page.locator('#contact input').first()
    await name.click()
    await page.keyboard.press('/')
    await expect(name).toHaveValue('/')
    await expect(page.getByRole('dialog', { name: /ask about my work/i })).toBeHidden()
  })

  test('an outside click closes the panel', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /ask about my work/i }).click()
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    await expect(dialog).toBeVisible()
    await page.locator('body').click({ position: { x: 5, y: 400 } })
    await expect(dialog).toBeHidden()
  })

  test('the FAQ link opens the panel', async ({ page }) => {
    await page.goto('/#faq')
    await page.locator('#faq').getByRole('button', { name: /ask the assistant/i }).click()
    const dialog = page.getByRole('dialog', { name: /ask about my work/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('textbox', { name: /your question/i })).toBeFocused()
  })
})

test.describe('copy rules', () => {
  test('no em dashes, no horizontal scroll', async ({ page }) => {
    for (const path of ['/', '/work/irims-v', '/nope']) {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.locator('body').innerText(), path).not.toContain('—')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true)
    }
  })
})

test.describe('accessibility', () => {
  for (const path of ['/', '/work/irims-v', '/nope']) {
    test(`one main landmark and one h1 on ${path}`, async ({ page }) => {
      await page.goto(path)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.getByRole('main')).toHaveCount(1)
      await expect(page.getByRole('main').locator('h1')).toHaveCount(1)
    })
  }

  for (const path of ['/', '/work/irims-v']) {
    test(`axe finds no serious or critical violations on ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze()
      const bad = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
    })
  }

  test('skip link is first, hidden until focused, and lands on the content', async ({ page }) => {
    await page.goto('/')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    const offscreen = async () => (await skip.boundingBox())!.y + (await skip.boundingBox())!.height <= 0
    expect(await offscreen()).toBe(true)
    await page.keyboard.press('Tab')
    await expect(skip).toBeFocused()
    expect(await offscreen()).toBe(false)
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()
    await expect(page).toHaveURL('/')
    await page.keyboard.press('Tab')
    // the next stop is inside the content, not back in the header
    expect(await page.evaluate(() => !!document.activeElement?.closest('main'))).toBe(true)
  })

  test('keyboard reaches every control in order, with the matching feedback', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the phone header drops the section links')
    await page.goto('/')
    const order: string[] = []
    const checks: Record<string, boolean> = {}
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab')
      const stop = await page.evaluate(() => {
        const e = document.activeElement as HTMLElement
        const zone = e.closest('#me') ? 'portrait'
          : e.closest('header.site') ? 'header'
          : e.closest('.role-row') ? 'role'
          : e.closest('#faq summary') ? 'faq'
          : e.closest('.tabs') ? 'tab'
          : e.closest('#contact form') ? 'form'
          : e.closest('.ask') ? 'ask'
          : e.closest('.skip') ? 'skip'
          : e.closest('#work, .cases') ? 'work'
          : e.closest('.hero') ? 'hero'
          : 'other'
        return {
          zone,
          highlight: zone === 'role' && e.classList.contains('hl') && !!document.querySelector(`.tl .bar.hl, .tl .mark.hl`),
        }
      })
      if (order.at(-1) !== stop.zone) order.push(stop.zone)
      if (stop.zone === 'portrait') {
        // the bubble fades in, so wait for it rather than reading it mid-transition
        await expect(page.locator('#me .thought')).toHaveCSS('opacity', '1')
        checks.bubble = true
      }
      if (stop.zone === 'role') checks.highlight = (checks.highlight ?? true) && stop.highlight
      if (stop.zone === 'tab') break
    }
    expect(order.filter((z) => z !== 'other')).toEqual(['skip', 'header', 'hero', 'portrait', 'work', 'role', 'faq', 'tab'])
    expect(checks).toEqual({ bubble: true, highlight: true })

    // arrow keys move between the channel tabs, then Tab continues into the form and on to the assistant
    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('tab', { name: 'LinkedIn' })).toBeFocused()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(page.locator('#contact form input').first()).toBeFocused()
    for (let i = 0; i < 12 && !(await page.evaluate(() => !!document.activeElement?.closest('.ask'))); i++) await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: /ask about my work/i })).toBeFocused()
  })

  test('focus ring shows on both inks', async ({ page }, testInfo) => {
    await page.goto('/')
    const ring = async (locator: ReturnType<typeof page.locator>, band: string) => {
      await locator.focus()
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Tab')
      await expect(locator).toBeFocused()
      const s = await locator.evaluate((e) => {
        const c = getComputedStyle(e)
        return { style: c.outlineStyle, width: c.outlineWidth, color: c.outlineColor, band: getComputedStyle(e.closest('[data-band]')!).backgroundColor }
      })
      expect(s.style, band).toBe('solid')
      expect(s.width, band).toBe('2px')
      // the ring is the ink the band is not
      expect(s.color, band).not.toBe(s.band)
      await locator.scrollIntoViewIfNeeded()
      await testInfo.attach(`focus-${band}`, { body: await page.screenshot(), contentType: 'image/png' })
    }
    await ring(page.getByRole('link', { name: 'View work' }), 'dark')
    await ring(page.locator('#irims-v').getByRole('link', { name: 'Case study', exact: true }), 'light')
    await ring(page.locator('#faq summary').first(), 'light-summary')
    await ring(page.getByRole('button', { name: 'Send message' }), 'dark-solid')
  })
})

test.describe('back to top', () => {
  test('appears after a screen of scrolling and returns to the top with focus in the content', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Back to top' })
    await expect(button).toBeHidden()
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
    await expect(button).toBeVisible()
    await button.click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expect(page.getByRole('main')).toBeFocused()
    await expect(button).toBeHidden()
  })
})

test('experience role rows are named groups', async ({ page }) => {
  await page.goto('/#experience')
  const rows = page.locator('.role-row')
  await expect(rows).toHaveCount(4)
  for (const row of await rows.all()) {
    await expect(row).toHaveAttribute('role', 'group')
    await expect(row).toHaveAccessibleName(/\S/)
  }
})

test.describe('hero', () => {
  test('the header name waits until the hero name scrolls away', async ({ page }) => {
    await page.goto('/')
    const brandName = page.locator('header.site .brand b')
    await expect(brandName).toBeHidden()
    await page.evaluate(() => window.scrollTo(0, 900))
    await expect(brandName).toBeVisible()
    await page.goto('/work/irims-v')
    await expect(brandName).toBeVisible()
  })
  test('on a tablet the portrait sits under the introduction', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    const portrait = await page.locator('#me .portrait').boundingBox()
    const name = await page.locator('.hero h1').boundingBox()
    expect(portrait!.y).toBeGreaterThan(name!.y + name!.height)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(768)
  })
  test('the applied-AI line is there, and shorter on a phone', async ({ page, isMobile }) => {
    await page.goto('/')
    const line = page.locator('.hero .applied')
    await expect(line).toBeVisible()
    await expect(line).toContainText(isMobile ? 'Applied AI: a voice assistant' : 'Applied AI where it earns its place')
  })
  test('the portrait is compact on a phone', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'desktop keeps the 300px portrait')
    await page.goto('/')
    const box = await page.locator('#me .portrait').boundingBox()
    expect(box?.width).toBeLessThanOrEqual(220)
  })
})
