const puppeteer = require('puppeteer')

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/opt/render/.cache/puppeteer/chrome-headless-shell/linux-125.0.6422.60/chrome-headless-shell-win64/chrome-headless-shell',
  })
  const page = await browser.newPage()

  await page.goto('https://home-tvt1.onrender.com')

  const text = await page.waitForSelector('#text')

  const final = await text.evaluate((el) => {
    return el.textContent
  })

  console.log(final)
  
  await browser.close()
}

main()
