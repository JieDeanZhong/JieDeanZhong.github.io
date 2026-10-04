const {
  chromium,
} = require('/Users/jie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const output = path.resolve('design/four-dot-header-preview-2026-10-04')
fs.mkdirSync(`${output}/screenshots`, { recursive: true })
async function go(page, url) {
  try {
    return await page.goto(url, { waitUntil: 'domcontentloaded' })
  } catch (error) {
    if (!String(error).includes('ERR_ABORTED')) throw error
    // A newly compiled route can be interrupted by the development HMR reload.
    return await page.goto(url, { waitUntil: 'domcontentloaded' })
  }
}
;(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  })
  const results = []
  const errors = []
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    page.on('pageerror', (e) => errors.push(e.message))
    for (const variant of ['a', 'b', 'c']) {
      await go(page, `http://localhost:3000/?logoPreview=${variant}`)
      await page.locator(`[data-logo-preview="${variant}"]`).waitFor()
      await page.evaluate(() => document.fonts.ready)
      // Hide only the development toolbar, which is not part of the site.
      await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' })
      for (const width of [320, 360, 390, 640, 768, 1024, 1280, 1440]) {
        await page.setViewportSize({ width, height: width < 640 ? 844 : 800 })
        await page.locator(`[data-logo-preview="${variant}"]`).waitFor()
        if (width < 640) {
          // The existing mobile menu loads dynamically after hydration.
          await page.getByRole('button', { name: 'Toggle Menu', exact: true }).waitFor()
        }
        const metrics = await page.locator('header').evaluate((header) => {
          const brand = header.querySelector('[data-logo-preview]')
          const controls = brand.nextElementSibling
          const svg = brand.querySelector('svg')
          const name = brand.querySelector('span')
          return {
            width: innerWidth,
            brand: brand.getBoundingClientRect().toJSON(),
            controls: controls.getBoundingClientRect().toJSON(),
            mark: svg.getBoundingClientRect().toJSON(),
            gap: getComputedStyle(brand).gap,
            nameSize: getComputedStyle(name).fontSize,
            overflow: document.documentElement.scrollWidth > innerWidth,
            animations: svg.getAnimations({ subtree: true }).length,
          }
        })
        assert(!metrics.overflow, JSON.stringify(metrics))
        const expectedWidth = width < 640 ? { a: 33, b: 44, c: 49.5 } : { a: 44, b: 55, c: 66 }
        assert.equal(metrics.mark.width, expectedWidth[variant], 'comparison variant changed')
        assert(metrics.brand.right + 15 <= metrics.controls.left, JSON.stringify(metrics))
        assert(metrics.controls.right <= width - 15, JSON.stringify(metrics))
        if (width < 640) assert(metrics.controls.width >= 72, 'mobile navigation not loaded')
        assert(Math.abs(metrics.mark.width / metrics.mark.height - 200 / 36.364) < 0.02)
        assert.equal(metrics.animations, 0)
        assert.equal(await page.locator('header img[src*="signature"]').count(), 0)
        if (width >= 640) {
          for (const name of ['Research', 'Blog', 'News', 'About']) {
            const link = page.locator('header').getByRole('link', { name, exact: true })
            assert(await link.isVisible())
            const box = await link.boundingBox()
            assert(box.x > metrics.brand.right && box.x + box.width <= width - 15)
          }
        }
        if (width === 1280 || width === 390) {
          await page.waitForFunction(() =>
            [...document.images].every((i) => i.complete && i.naturalWidth > 0)
          )
          const device = width === 1280 ? 'desktop' : 'mobile'
          await page.screenshot({ path: `${output}/screenshots/${variant}-${device}.png` })
          await page.screenshot({
            path: `${output}/screenshots/${variant}-${device}-header.png`,
            clip: { x: 0, y: 0, width, height: 108 },
          })
        }
        results.push({ variant, viewport: width, result: 'pass', ...metrics })
      }
    }

    await go(page, 'http://localhost:3000/research/')
    const brand = page.getByRole('link', { name: 'Jie Dean Zhong — Home', exact: true })
    await brand.focus()
    assert.equal(await brand.evaluate((el) => el === document.activeElement), true)
    assert.equal(await brand.evaluate((el) => getComputedStyle(el).outlineStyle), 'solid')
    assert.equal(await brand.locator('svg').getAttribute('aria-hidden'), 'true')
    await page.keyboard.press('Enter')
    await page.waitForURL('http://localhost:3000/')
    results.push({
      test: 'single accessible home link, keyboard focus and Enter navigation',
      result: 'pass',
    })

    const phone = await browser.newContext({
      viewport: { width: 320, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
    })
    const mobile = await phone.newPage()
    mobile.on('pageerror', (e) => errors.push(e.message))
    await go(mobile, 'http://localhost:3000/?logoPreview=b')
    await mobile.getByRole('button', { name: 'Toggle Menu', exact: true }).tap()
    await mobile.getByRole('dialog').getByRole('link', { name: 'Research', exact: true }).waitFor()
    await mobile.getByRole('dialog').getByRole('link', { name: 'Research', exact: true }).tap()
    await mobile.waitForURL('http://localhost:3000/research/')
    await mobile
      .getByRole('dialog')
      .getByRole('link', { name: 'Research', exact: true })
      .waitFor({ state: 'hidden' })
    await mobile.waitForTimeout(350)
    await mobile.getByRole('link', { name: 'Jie Dean Zhong — Home', exact: true }).tap()
    await mobile.waitForURL('http://localhost:3000/')
    await mobile.getByRole('button', { name: 'Search', exact: true }).tap()
    await mobile.getByRole('combobox').waitFor()
    await mobile.keyboard.press('Escape')
    results.push({
      test: '320px touch menu, Research navigation, home link and search',
      result: 'pass',
    })

    for (const route of ['/blog/deriving-ols-estimator/', '/tags/']) {
      const response = await go(page, `http://localhost:3000${route}`)
      assert.equal(response.status(), 200)
      assert(
        await page.getByRole('link', { name: 'Jie Dean Zhong — Home', exact: true }).isVisible()
      )
    }
    assert.deepEqual(errors, [])
    results.push({
      test: 'MDX and tags render with the updated header; no runtime errors',
      result: 'pass',
    })
    fs.writeFileSync(`${output}/browser-results.json`, JSON.stringify(results, null, 2) + '\n')
    console.log(`${results.length} checks passed`)
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
