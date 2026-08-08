import { test, expect, type Page } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

async function navigateAndWaitFor(page: Page, path: string) {
  await page.goto(`${BASE_URL}${path}`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
}

test.describe('Portfolio Professional Polish', () => {
  // The CLI intro overlay is a one-time gate (gated by localStorage).
  // Tests here should bypass it so they exercise the real app, not the intro.
  // See src/App.tsx: `portfolio-intro-seen` skips the overlay.
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('portfolio-intro-seen', 'true')
    })
  })

  test.describe('ScrollUpButton', () => {
    test('appears after scrolling down 200px', async ({ page }) => {
      await navigateAndWaitFor(page, '/projects')
      // Add content height so the pane is scrollable
      await page.evaluate(() => {
        const pane = document.querySelector('main[data-scroll-pane]')
        if (pane) {
          const footer = pane.querySelector('footer')
          if (footer) footer.style.marginTop = '400px'
        }
      })
      await page.waitForTimeout(300)
      const pane = await page.$('main[data-scroll-pane]')
      await pane?.evaluate((el) => {
        el.scrollTop = 300
        el.dispatchEvent(new Event('scroll', { bubbles: true }))
      })
      await page.waitForTimeout(500)
      const scrollBtn = page.locator('button[aria-label="Scroll to top"]')
      await expect(scrollBtn).toBeVisible()
    })

    test('scrolls to top when clicked', async ({ page }) => {
      await navigateAndWaitFor(page, '/projects')
      await page.evaluate(() => {
        const pane = document.querySelector('main[data-scroll-pane]')
        if (pane) {
          const footer = pane.querySelector('footer')
          if (footer) footer.style.marginTop = '400px'
        }
      })
      await page.waitForTimeout(300)
      const pane = await page.$('main[data-scroll-pane]')
      await pane?.evaluate((el) => {
        el.scrollTop = 300
        el.dispatchEvent(new Event('scroll', { bubbles: true }))
      })
      await page.waitForTimeout(300)
      const scrollBtn = page.locator('button[aria-label="Scroll to top"]')
      await scrollBtn.waitFor({ state: 'visible' })
      await scrollBtn.click()
      await page.waitForTimeout(800)
      const scrollY = await pane?.evaluate((el) => el.scrollTop)
      expect(scrollY).toBe(0)
    })
  })

  test.describe('Back button', () => {
    test('ProjectsView shows back-to-about link', async ({ page }) => {
      await navigateAndWaitFor(page, '/projects')
      const backLink = page.locator('a[aria-label="Back to About"]')
      await expect(backLink).toBeVisible()
    })

    test('FeedbackView shows back-to-projects link', async ({ page }) => {
      await navigateAndWaitFor(page, '/feedback')
      const backLink = page.locator('a[aria-label="Back to Projects"]')
      await expect(backLink).toBeVisible()
    })

    test('ContactView shows back-to-about link', async ({ page }) => {
      await navigateAndWaitFor(page, '/contact')
      const backLink = page.locator('a[aria-label="Back to About"]')
      await expect(backLink).toBeVisible()
    })

    test('Back link navigates to the correct route', async ({ page }) => {
      await navigateAndWaitFor(page, '/projects')
      const backLink = page.locator('a[aria-label="Back to About"]')
      await backLink.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toBe(`${BASE_URL}/about`)
    })
  })

  test.describe('No em dashes in visible text', () => {
    for (const path of ['/about', '/projects', '/feedback', '/contact']) {
      test(`no em dashes on ${path}`, async ({ page }) => {
        await navigateAndWaitFor(page, path)
        const text = await page.locator('body').textContent()
        expect(text).not.toContain('—')
      })
    }
  })

  test.describe('Font consistency', () => {
    test('body uses monospace font (JetBrains Mono)', async ({ page }) => {
      await navigateAndWaitFor(page, '/about')
      const bodyFamily = await page.locator('body').evaluate(el => {
        return window.getComputedStyle(el).fontFamily
      })
      expect(bodyFamily).toMatch(/JetBrains|monospace|ui-monospace/)
    })

    test('prose uses sans-serif font (Inter)', async ({ page }) => {
      await navigateAndWaitFor(page, '/about')
      const proseFamily = await page.evaluate(() => {
        const el = document.querySelector('.prose-body')
        if (!el) return window.getComputedStyle(document.body).fontFamily
        return window.getComputedStyle(el).fontFamily
      })
      expect(proseFamily).toMatch(/Inter|sans-serif|ui-sans/)
    })
  })

  test.describe('No AI-coded design patterns', () => {
    test('no glow, neon, text-shadow, or emoji on page', async ({ page }) => {
      await navigateAndWaitFor(page, '/about')
      const hasShadow = await page.evaluate(() => {
        const all = document.querySelectorAll('*')
        for (const el of all) {
          const style = window.getComputedStyle(el)
          if (style.textShadow && style.textShadow !== 'none') return true
          if (style.filter && style.filter !== 'none') return true
        }
        return false
      })
      expect(hasShadow).toBeFalsy()

      const text = await page.locator('body').textContent()
      const emojiRegex = /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1FAFF}]/u
      expect(text).not.toMatch(emojiRegex)
    })
  })
})

// The intro is a one-time gate, so every test in here starts from a clean
// storage state and drives the sequence deliberately rather than waiting it out.
test.describe('CLI intro and the morph', () => {
  /** The live prompt is the intro's last beat; it is the signal to act. */
  const promptReady = (page: Page) =>
    page.waitForSelector('.prompt-row input', { timeout: 20000 })

  test('boots, wakes Niko, and hands over to the app', async ({ page }) => {
    await page.goto(BASE_URL)
    await promptReady(page)

    // The approved script, in order. `[ ok ]` markers carry the accent.
    await expect(page.getByText('$ ./boot portfolio-os')).toBeVisible()
    await expect(page.getByText('mounting ~/projects (5 systems)')).toBeVisible()
    await expect(page.getByText('boot complete', { exact: false })).toBeVisible()

    // Whoami reads from site.ts, so the name and role must match the app's.
    await expect(page.getByText('Roger A. Abay Jr.', { exact: false }).first()).toBeVisible()

    // Niko is awake in the intro rail, untagged.
    const niko = page.locator('[data-niko-slot] .niko-sprite')
    await expect(niko).toBeVisible()
    expect(await page.locator('[data-niko-slot="intro"]').count()).toBe(1)

    // Enter hands over to /about; the window morphs rather than unmounting.
    await page.locator('.prompt-row input').press('Enter')
    await page.waitForSelector('main[data-scroll-pane]', { timeout: 5000 })
    await page.waitForTimeout(2400) // the FLIP is 600ms, Niko's walk is 1800ms

    expect(new URL(page.url()).pathname).toBe('/about')
    // Docked: the NIKO tag only renders at the dock.
    await expect(page.locator('[data-niko-slot="dock"]')).toHaveCount(1)
    await expect(page.locator('.niko-sprite')).toContainText('NIKO')

    // The flag persisted, so a reload lands straight in the app.
    await page.reload()
    await page.waitForLoadState('networkidle')
    expect(await page.locator('.prompt-row').count()).toBe(0)
  })

  test('Esc skips the sequence', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForSelector('text=$ ./boot portfolio-os', { timeout: 10000 })
    await page.keyboard.press('Escape')
    await page.waitForSelector('main[data-scroll-pane]', { timeout: 5000 })
    expect(new URL(page.url()).pathname).toBe('/about')
  })

  test('the skip hint is visible from the first frame', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page.getByText('[esc] skip')).toBeVisible({ timeout: 3000 })
  })

  test('a typed route morphs straight into it', async ({ page }) => {
    await page.goto(BASE_URL)
    await promptReady(page)
    await page.locator('.prompt-row input').fill('projects')
    await page.locator('.prompt-row input').press('Enter')

    await page.waitForSelector('main[data-scroll-pane]', { timeout: 5000 })
    expect(new URL(page.url()).pathname).toBe('/projects')
  })

  test('an unknown command is echoed and the prompt stays live', async ({ page }) => {
    await page.goto(BASE_URL)
    await promptReady(page)
    await page.locator('.prompt-row input').fill('sudo rm -rf /')
    await page.locator('.prompt-row input').press('Enter')

    await expect(page.getByText('command not found: sudo rm -rf /')).toBeVisible()
    expect(await page.locator('main[data-scroll-pane]').count()).toBe(0)
  })

  test('the seen flag short-circuits the intro', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('portfolio-intro-seen', 'true')
    })
    await page.goto(BASE_URL)
    await page.waitForSelector('main[data-scroll-pane]')
    expect(await page.locator('.prompt-row').count()).toBe(0)
    // He is home already, no walk required.
    await expect(page.locator('[data-niko-slot="dock"]')).toHaveCount(1)
  })
})

test.describe('Niko', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('portfolio-intro-seen', 'true')
      window.sessionStorage.setItem('niko-tip-seen', 'true')
    })
  })

  test('docks in the side rail above the status block', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')
    const dock = page.locator('[data-niko-slot-name="dock"]')
    const status = page.getByText('Open to work')
    const dockBox = await dock.boundingBox()
    const statusBox = await status.boundingBox()
    expect(dockBox).not.toBeNull()
    expect(statusBox).not.toBeNull()
    expect(dockBox!.y + dockBox!.height).toBeLessThanOrEqual(statusBox!.y + 1)
  })

  test('moves into the window chrome below lg', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await navigateAndWaitFor(page, '/about')

    const stage = page.locator('[data-niko-slot]')
    await expect(stage).toHaveAttribute('data-niko-slot', 'navbar')

    // He has to fit the 44px chrome bar, not overhang it onto the content.
    const sprite = await page.locator('.niko-sprite').boundingBox()
    const bar = await page.locator('.h-11').first().boundingBox()
    expect(sprite).not.toBeNull()
    expect(bar).not.toBeNull()
    expect(sprite!.y).toBeGreaterThanOrEqual(bar!.y)
    expect(sprite!.y + sprite!.height).toBeLessThanOrEqual(bar!.y + bar!.height)

    // He walks the strip, so he must never leave it.
    const band = await page.locator('[data-niko-slot-name="navbar"]').boundingBox()
    expect(band).not.toBeNull()
    expect(sprite!.x).toBeGreaterThanOrEqual(band!.x - 1)
    expect(sprite!.x + sprite!.width).toBeLessThanOrEqual(band!.x + band!.width + 1)

    // No dismiss control: he is the brand mark, not an overlay to close.
    expect(await page.locator('button[aria-label="Hide Niko"]').count()).toBe(0)

    // And back to the rail dock when there is a rail again.
    await page.setViewportSize({ width: 1280, height: 860 })
    await expect(stage).toHaveAttribute('data-niko-slot', 'dock')
  })

  test('shrinks to fit the collapsed rail', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')
    await page.getByRole('button', { name: 'Collapse navigation' }).click()

    // The rail width animates over 200ms and the sprite glides after it for
    // another 260ms, so poll until the two boxes actually agree rather than
    // measuring a mid-flight frame.
    const slot = page.locator('[data-niko-slot-name="dock"]')
    await expect
      .poll(async () => {
        const sprite = await page.locator('.niko-sprite').boundingBox()
        const box = await slot.boundingBox()
        if (!sprite || !box) return false
        return (
          sprite.x >= box.x - 1 &&
          sprite.x + sprite.width <= box.x + box.width + 1
        )
      })
      .toBe(true)

    // The name tag does not survive the shrink — it would be unreadable.
    expect(await page.locator('.niko-sprite').innerText()).not.toContain('NIKO')
  })

  test('click to pet fires love', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')
    const sprite = page.locator('.niko-sprite')
    await sprite.click({ force: true })
    // `pet` maps to the `love` movement; the queue is at most two deep, so it
    // lands within a movement or two.
    await expect(sprite).toHaveAttribute('data-niko-move', 'love', { timeout: 8000 })
  })

  test('a dead end renders a real 404 rather than redirecting', async ({ page }) => {
    await navigateAndWaitFor(page, '/does-not-exist')
    expect(new URL(page.url()).pathname).toBe('/does-not-exist')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('no such route', { exact: false })).toBeVisible()
    await expect(page.locator('.niko-sprite')).toHaveAttribute('data-niko-move', 'sad', {
      timeout: 8000,
    })
  })

  test('renders a single static frame under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await navigateAndWaitFor(page, '/about')
    const sprite = page.locator('.niko-sprite')
    const first = await sprite.innerText()
    await page.waitForTimeout(2000)
    expect(await sprite.innerText()).toBe(first)
  })

  test('reduced motion skips the morph entirely', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.removeItem('portfolio-intro-seen'))
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(BASE_URL)
    // The whole log lands at once, so the prompt is there almost immediately.
    await page.waitForSelector('.prompt-row input', { timeout: 5000 })
    await page.locator('.prompt-row input').press('Enter')
    await page.waitForSelector('main[data-scroll-pane]', { timeout: 2000 })
    expect(await page.locator('.prompt-row').count()).toBe(0)
  })
})
