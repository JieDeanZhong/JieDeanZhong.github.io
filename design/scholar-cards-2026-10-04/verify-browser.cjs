// Run against the local site with the bundled Playwright runtime, or PLAYWRIGHT_MODULE.
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    '/Users/jie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
)
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const output = path.resolve('design/scholar-cards-2026-10-04')
const people = [
  [
    'lianjun-zhang',
    'Lianjun Zhang',
    'LioEwqwAAAAJ',
    'https://www.ismsz.cn/Web/KXYJKYTDPage?Id=20&PageId=292',
  ],
  [
    'yongtao-zhu',
    'Yongtao Zhu',
    '9r8TXE8AAAAJ',
    'https://scholar.xjtlu.edu.cn/en/persons/YongtaoZhu/',
  ],
  [
    'kevin-chan',
    'Kevin Chun Chan',
    'rSZrshkAAAAJ',
    'https://scholar.xjtlu.edu.cn/en/persons/ChunChan/',
  ],
]
const results = []
let browser
function pass(test, detail) {
  results.push({ test, result: 'pass', detail })
  console.log('PASS', test, detail || '')
}
;(async () => {
  browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  })
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  })
  const page = await desktop.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(process.env.SCHOLAR_BASE_URL || 'http://localhost:3000/research/')
  await page.getByRole('button', { name: 'Yongtao Zhu, PhD', exact: true }).first().waitFor()
  await page.evaluate(() => document.fonts.ready)
  const card = page.locator('[data-scholar]')
  const trigger = (name) => page.getByRole('button', { name: name + ', PhD', exact: true }).first()
  async function settle() {
    await page.waitForTimeout(450)
  }
  async function close() {
    await page.keyboard.press('Escape')
    await page.mouse.move(0, 0)
    await settle()
  }
  async function open(person, method = 'click') {
    await close()
    const t = trigger(person[1])
    await t.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }))
    await t[method]()
    await settle()
    assert.equal(await card.getAttribute('data-scholar'), person[0])
    assert.equal(await card.count(), 1)
    return t
  }
  async function bounds(label) {
    const m = await card.evaluate((el) => ({
      box: el.getBoundingClientRect().toJSON(),
      innerWidth,
      innerHeight,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      pageOverflow: document.documentElement.scrollWidth > innerWidth,
    }))
    assert(
      m.box.x >= 15 &&
        m.box.y >= 15 &&
        m.box.right <= m.innerWidth - 15 &&
        m.box.bottom <= m.innerHeight - 15,
      JSON.stringify(m)
    )
    assert(!m.pageOverflow && m.scrollWidth <= m.clientWidth, label + ' overflow')
    return m.box
  }
  assert.equal(await page.getByRole('button', { name: /, PhD$/ }).count(), 5)
  pass('all five Research triggers are present')
  for (const p of people) {
    const t = await open(p, 'hover')
    const before = await t.boundingBox()
    const box = await bounds(p[0])
    const scholar = card.getByRole('link', { name: 'Google Scholar', exact: true })
    const linkBox = await scholar.boundingBox()
    const tb = await t.boundingBox()
    await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2)
    await page.mouse.move(linkBox.x + linkBox.width / 2, linkBox.y + linkBox.height / 2, {
      steps: 16,
    })
    await settle()
    assert.equal(await card.count(), 1, 'pointer bridge closes card')
    assert.equal((await t.boundingBox()).y, before.y, 'layout shifted')
    assert.equal(await card.getByRole('heading').innerText(), p[1])
    assert.equal(await card.locator('a[href^="mailto:"]').count(), 0)
    assert.equal(await card.getByRole('button', { name: /copy/i }).count(), 0)
    assert((await scholar.getAttribute('href')).includes('user=' + p[2]))
    assert.equal(
      await card.getByRole('link', { name: 'Profile', exact: true }).getAttribute('href'),
      p[3]
    )
    for (const link of [scholar, card.getByRole('link', { name: 'Profile', exact: true })]) {
      assert.equal(await link.getAttribute('target'), '_blank')
      assert((await link.getAttribute('rel')).includes('noopener'))
    }
    await page.screenshot({ path: `${output}/screenshots/${p[0]}-desktop.png` })
    await card.screenshot({ path: `${output}/screenshots/${p[0]}-card.png` })
    await page.mouse.move(0, 0)
    await page.waitForTimeout(500)
    assert.equal(await card.count(), 0, 'hover exit did not close')
    await open(p)
    await t.click()
    await settle()
    assert.equal(await card.count(), 0, 'second click should close')
    await open(p)
    await page.mouse.click(8, 8)
    await settle()
    assert.equal(await card.count(), 0)
    await open(p)
    await page.keyboard.press('Escape')
    await settle()
    assert.equal(await card.count(), 0)
    assert.equal(await t.evaluate((el) => el === document.activeElement), true)
    pass(
      p[0] + ' desktop hover, pointer bridge, links, click, outside/Esc close, focus return',
      box
    )
  }
  // Switching must keep exactly one correct card, even without closing the previous one.
  await open(people[1])
  await trigger(people[2][1]).click()
  await settle()
  assert.equal(await card.getAttribute('data-scholar'), 'kevin-chan', 'click switch failed')
  assert.equal(await card.count(), 1)
  pass('click directly from Yongtao to Kevin')
  await close()
  for (let i = 0; i < 6; i++) {
    await trigger(i % 2 ? 'Yongtao Zhu' : 'Kevin Chun Chan').hover()
    await page.waitForTimeout(45)
  }
  await page.mouse.move(0, 0)
  await page.waitForTimeout(550)
  assert.equal(await card.count(), 0, 'rapid hover left a ghost')
  await trigger('Yongtao Zhu').hover()
  await settle()
  await trigger('Kevin Chun Chan').hover()
  await settle()
  assert.equal(await card.getAttribute('data-scholar'), 'kevin-chan')
  assert.equal(await card.count(), 1)
  pass('rapid pointer entry/exit and hover switching')
  await close()
  const kt = trigger('Kevin Chun Chan')
  await kt.focus()
  await page.keyboard.press('Enter')
  await settle()
  assert.equal(await card.getAttribute('data-scholar'), 'kevin-chan')
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Google Scholar')
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Profile')
  await page.mouse.move(0, 0)
  await settle()
  assert.equal(await card.count(), 1)
  await page.keyboard.press('Escape')
  await settle()
  assert.equal(await kt.evaluate((el) => el === document.activeElement), true)
  await page.keyboard.press('Space')
  await settle()
  assert.equal(await card.count(), 1)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await settle()
  assert.equal(await card.count(), 0, 'Tab out should close')
  pass('keyboard Enter, Space, Tab link order, hover/focus retention and Tab dismissal')
  // Test every repeated entry, flipping above at the bottom and below at the top.
  const names = page.getByRole('button', { name: /, PhD$/ })
  for (let i = 0; i < 5; i++) {
    await close()
    const t = names.nth(i)
    for (const edge of ['top', 'bottom']) {
      await t.evaluate((el, edge) => {
        const r = el.getBoundingClientRect()
        window.scrollBy({
          top: r.top - (edge === 'top' ? 20 : innerHeight - 45),
          behavior: 'instant',
        })
      }, edge)
      await t.click()
      await settle()
      await bounds('entry' + i + ' ' + edge)
      await close()
    }
  }
  pass('all five triggers and viewport top/bottom collision positioning')
  await page.setViewportSize({ width: 800, height: 600 })
  await open(people[2])
  await bounds('right viewport edge')
  assert((await card.boundingBox()).x < (await trigger('Kevin Chun Chan').boundingBox()).x)
  pass('right edge shifts the entire card inside the viewport')
  await close()
  await page.setViewportSize({ width: 1440, height: 1000 })
  // Visit the actual six destinations via links, recording their new-tab URLs.
  for (const p of people) {
    await open(p)
    for (const label of ['Google Scholar', 'Profile']) {
      const link = card.getByRole('link', { name: label, exact: true })
      const expected = await link.getAttribute('href')
      const popupPromise = page.waitForEvent('popup')
      await link.click()
      const popup = await popupPromise
      await popup.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {})
      assert.equal(popup.url(), expected)
      await popup.close()
    }
  }
  pass('all six links open their configured destinations in a new tab')
  await close()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(people[0])
  assert.equal(await card.evaluate((el) => getComputedStyle(el).transitionDuration), '0s')
  pass('reduced motion disables card transitions')
  await close()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  // Touch context is separate from desktop so hover emulation cannot mask touch bugs.
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  })
  const phone = await mobile.newPage()
  phone.on('pageerror', (e) => errors.push(e.message))
  await phone.goto(process.env.SCHOLAR_BASE_URL || 'http://localhost:3000/research/')
  await phone.getByRole('button', { name: 'Yongtao Zhu, PhD', exact: true }).first().waitFor()
  await phone.evaluate(() => document.fonts.ready)
  for (const width of [320, 360, 390, 600, 768]) {
    await phone.setViewportSize({ width, height: 844 })
    for (const p of people) {
      await phone.touchscreen.tap(4, 200)
      await phone.waitForTimeout(200)
      const t = phone.getByRole('button', { name: p[1] + ', PhD', exact: true }).first()
      await t.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }))
      await t.tap()
      await phone.waitForTimeout(350)
      const c = phone.locator('[data-scholar]')
      assert.equal(await c.getAttribute('data-scholar'), p[0])
      const metric = await c.evaluate((el) => ({
        box: el.getBoundingClientRect().toJSON(),
        w: innerWidth,
        h: innerHeight,
        overflow: el.scrollWidth > el.clientWidth,
        pageOverflow: document.documentElement.scrollWidth > innerWidth,
        images: [...el.querySelectorAll('img')].every((i) => i.complete && i.naturalWidth > 0),
      }))
      assert(
        metric.box.x >= 15 &&
          metric.box.right <= metric.w - 15 &&
          !metric.overflow &&
          !metric.pageOverflow &&
          metric.images,
        JSON.stringify(metric)
      )
      if (width === 390)
        await phone.screenshot({ path: `${output}/screenshots/${p[0]}-mobile.png` })
      if (width === 320)
        await phone.screenshot({ path: `${output}/screenshots/${p[0]}-mobile-320.png` })
      await phone.touchscreen.tap(4, 200)
      await phone.waitForTimeout(250)
      assert.equal(await c.count(), 0)
    }
    pass('touch open/close, image loading and bounds at ' + width + 'px')
  }
  assert.deepEqual(errors, [])
  pass('no browser runtime errors')
  // Minimum route regression coverage required by AGENTS.md.
  for (const route of ['/', '/blog/deriving-ols-estimator/', '/tags/', '/research/trogen/']) {
    const response = await page.goto(
      new URL(route, process.env.SCHOLAR_BASE_URL || 'http://localhost:3000').href
    )
    assert.equal(response.status(), 200)
    assert((await page.locator('main').innerText()).trim().length > 0)
  }
  pass('home, MDX article, tags and Research detail routes render')
  await browser.close()
  fs.writeFileSync(`${output}/browser-results.json`, JSON.stringify(results, null, 2) + '\n')
})().catch(async (e) => {
  fs.writeFileSync(
    `${output}/browser-results.json`,
    JSON.stringify([...results, { result: 'fail', error: e.stack }], null, 2) + '\n'
  )
  console.error(e)
  await browser?.close()
  process.exit(1)
})
