const puppeteer = require('puppeteer')

const { join } = require('path')
const puppeteerCore = require('puppeteer-core')
const { PUPPETEER_REVISIONS } = require('puppeteer-core/lib/cjs/puppeteer/revisions.js')
const { findChrome } = require('find-chrome-bin')

async function init() {
  let chromeInfo = await findChrome({
    max: 95,
    download: {
      puppeteerCore,
      path: join('.', 'chrome'),
      revision: PUPPETEER_REVISIONS.chromium
    }
  })
  console.log(chromeInfo)
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser' })
  const page = await browser.newPage()
  await page.goto('https://home-tvt1.onrender.com')

  const text = await page.waitForSelector('#text')

  const final = await text.evaluate((el) => {
    return el.textContent
  })

  console.log(final)

  await browser.close()
}

// main()
