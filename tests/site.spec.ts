import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'

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

test('assistant context excludes hidden projects', () => {
  const context = readFileSync('api/context.ts', 'utf8')
  expect(context).not.toContain('Eurasian')
  expect(context).toContain('iRIMS-V Library System')
  expect(context).toContain('Cygnus')
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
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 200))
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
  test('phone menu opens full screen and closes on Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone only')
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
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
    await page.goto('/#work')
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
})

test.describe('work', () => {
  test('four featured systems in order, Eurasian absent', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work article.case h3')).toHaveText(['iRIMS-V', 'EDULEAVE', 'LRMIS', 'iRIMS-V Library System'])
    await expect(page.getByText('Eurasian')).toHaveCount(0)
    await expect(page.locator('a[href="https://irimsv-library.net/"]').first()).toBeVisible()
  })
  test('no placeholder result rows', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .facts dt', { hasText: 'Result' })).toHaveCount(0)
  })
  test('head counts the systems in words', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .head p')).toHaveText(/^Four systems in production\./)
  })
  test('only iRIMS-V has a case study; the rest preview to their live site', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .btn', { hasText: 'Case study' })).toHaveCount(1)
    await expect(page.locator('#work article.case').first().locator('a[data-shot]')).toHaveAttribute('href', '/work/irims-v')
    await expect(page.locator('#work article.case').nth(1).locator('a:has(.ht)')).toHaveAttribute('href', 'https://eduleave.com/welcome')
  })
  test('screenshots are halftoned grayscale', async ({ page }) => {
    await page.goto('/#work')
    const img = page.locator('#work article.case .ht img').first()
    await expect(img).toHaveCSS('filter', /grayscale\(1\)/)
    const dots = await page.locator('#work article.case .ht').first().evaluate((el) => getComputedStyle(el, '::after').backgroundImage)
    expect(dots).toContain('radial-gradient')
  })
  test('hover clears the dot screen', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#work')
    const ht = page.locator('#work article.case .ht').first()
    await ht.hover()
    await expect.poll(() => ht.evaluate((el) => getComputedStyle(el, '::after').opacity)).toBe('0')
  })
  test('more work table lists the non-featured systems', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .tr .name')).toHaveText(['schema_mapper', 'iRIMS-V Library app'])
    await expect(page.locator('#work .tr > .ui.soft')).toHaveText(['Internal', 'In progress'])
  })
})

test.describe('services', () => {
  test('figures play once in view', async ({ page }) => {
    await page.goto('/#services')
    await expect(page.locator('#flow')).toHaveClass(/armed/)
    await expect(page.locator('#flow li.fig-records')).toHaveClass(/\bon\b/)
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('figures are complete and never armed', async ({ page }) => {
      await page.goto('/#services')
      await expect(page.locator('#flow')).not.toHaveClass(/armed/)
      await expect(page.locator('#flow li')).toHaveCount(4)
    })
  })
})

test.describe('experience', () => {
  test('timeline and rows', async ({ page }) => {
    await page.goto('/#experience')
    await expect(page.locator('#timeline .bar')).toHaveCount(4)
    await expect(page.locator('.role-row')).toHaveCount(4)
    await expect(page.locator('.role-row > .ui').first()).toHaveText('2025 – Present')
  })
  test('row hover highlights its bar', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#experience')
    await page.hover('.role-row[data-k="co"]')
    await expect(page.locator('#timeline')).toHaveClass(/focus/)
    await expect(page.locator('#timeline .bar[data-k="co"]')).toHaveClass(/hl/)
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('timeline is complete and never armed', async ({ page }) => {
      await page.goto('/#experience')
      await expect(page.locator('#timeline')).not.toHaveClass(/armed/)
      await expect(page.locator('#timeline .bar')).toHaveCount(4)
    })
  })
})

test.describe('proof and experiments', () => {
  test('three quotes, no private repo links', async ({ page }) => {
    await page.goto('/#recognition')
    await expect(page.locator('#recognition blockquote')).toHaveCount(3)
    await expect(page.locator('a[href*="samakatuwid00/JARVIS"]')).toHaveCount(0)
    await expect(page.locator('a[href*="second-brain-vault"]')).toHaveCount(0)
    await expect(page.locator('#experiments')).toContainText('Cygnus')
  })
  test('award is a halftoned picture with its caption', async ({ page }) => {
    await page.goto('/#recognition')
    await expect(page.locator('#recognition figure .ht picture img')).toHaveCount(1)
    await expect(page.locator('#recognition figcaption')).toContainText('Full Stack Developer Award')
  })
  test('experiments link only where a public repo exists', async ({ page }) => {
    await page.goto('/#experiments')
    await expect(page.locator('#experiments .index > *')).toHaveCount(3)
    await expect(page.locator('#experiments .index > a')).toHaveCount(1)
    await expect(page.locator('#experiments .index > a')).toHaveAttribute('href', 'https://github.com/samakatuwid00/sticky-brain')
    await expect(page.locator('#experiments .index > .item', { hasText: 'Second Brain' })).toContainText('Private')
    await expect(page.locator('#experiments')).not.toContainText('Link after repo cleanup')
    await expect(page.locator('#experiments .index .ht img')).toHaveCount(3)
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
    await expect(page.getByRole('tab', { name: 'GitHub' })).toBeFocused()
    await expect(page.locator('#reach-v')).toHaveText('github.com/samakatuwid00')
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
    await page.goto('/work/lrmis')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
  test('no placeholder metric rows and no self-referencing next link', async ({ page }) => {
    await page.goto('/work/irims-v')
    await expect(page.locator('.cs-sec h2')).toHaveText(['Problem', 'Approach', 'Result'])
    await expect(page.locator('.cs-sec li')).toHaveCount(5)
    await expect(page.locator('.cs-body .tr, .todo')).toHaveCount(0)
    await expect(page.getByRole('link', { name: /^next/i })).toHaveCount(0)
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
    await page.goto('/#work')
    await page.locator('#work a[data-shot="irims-v"]').click()
    await expect(page).toHaveURL('/work/irims-v')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('iRIMS-V')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expect(page.locator('.cs-shot')).toHaveCSS('view-transition-name', 'shot')
    await page.getByRole('link', { name: /all work/i }).first().click()
    await expect(page).toHaveURL('/#work')
    await expect.poll(() => page.evaluate(() => document.getElementById('work')?.getBoundingClientRect().top ?? Infinity)).toBeLessThan(80)
    // Between transitions no home preview holds the name, so it can never be duplicated.
    await expect.poll(() => page.evaluate(() =>
      [...document.querySelectorAll('.ht')].filter((el) => getComputedStyle(el).viewTransitionName === 'shot').length,
    )).toBe(0)
    expect(errors).toEqual([])
  })
  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' })
    test('the transition runs without animation and the page still swaps', async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto('/#work')
      await page.locator('#work a[data-shot="irims-v"]').click()
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

  test('slash is ignored while the phone menu is open', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the menu sheet only opens on phones')
    await page.goto('/')
    await page.getByRole('button', { name: /menu/i }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await page.keyboard.press('/')
    await expect(page.getByRole('dialog', { name: /ask about my work/i })).toBeHidden()
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
    test.skip(isMobile, 'the phone header folds its links into the menu')
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
          : e.closest('#work') ? 'work'
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
    expect(order.filter((z) => z !== 'other')).toEqual(['skip', 'header', 'portrait', 'hero', 'work', 'role', 'faq', 'tab'])
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
    await ring(page.locator('#work').getByRole('link', { name: 'Case study', exact: true }), 'light')
    await ring(page.locator('#faq summary').first(), 'light-summary')
    await ring(page.getByRole('button', { name: 'Send message' }), 'dark-solid')
  })
})
