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

test.describe('CLI intro gate', () => {
  test('shows intro on first visit, then reveals app after auto-proceed', async ({ page }) => {
    // No beforeEach seeds the skip-flag here, so the intro mounts on first load.
    // Wait long enough for the typed sequence + auto-proceed to finish, then
    // assert the app shell is revealed and the skip-flag persisted.
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')

    // The intro overlay's typed $ whoami command line — only present in the intro.
    // This is sufficient to prove the terminal sequence mounted.
    const whoamiCmd = page.locator('text=$ whoami')
    await expect(whoamiCmd).toBeVisible({ timeout: 6000 })

    // Char-by-char typing at 18ms/char; full sequence ~8s + 1.8s auto-proceed
    await page.waitForSelector('main[data-scroll-pane]', { timeout: 14000 })

    // Flag persisted so a reload skips the intro
    await page.reload()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(300)
    // The terminal title-bar ("roger@portfolio ~") is unique to the intro and
    // only appears before the skip-flag gates it. After reload it must be gone.
    expect(await page.locator('text=roger@portfolio ~').count()).toBe(0)
  })
})
