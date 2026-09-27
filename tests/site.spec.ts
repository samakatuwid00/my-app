import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

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
