const puppeteer = require('puppeteer')

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
