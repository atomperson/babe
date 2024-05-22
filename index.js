const puppeteer = require('puppeteer')

import { join } from 'path'
import puppeteer from 'puppeteer-core'
import { PUPPETEER_REVISIONS } from 'puppeteer-core/lib/cjs/puppeteer/revisions.js'
import { findChrome } from 'find-chrome-bin'

async function init() {
  let chromeInfo = await findChrome({
    max: 95,
    download: {
      puppeteer,
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
