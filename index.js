const express = require('express')
const app = express()

const BrowserLess = require('browserless')

const browser = BrowserLess()

// const fs = require('fs')
// const path = require('path')

const port = 8000;


console.log(browser)

// async function main() {
//   let code = ''
 
//   const browser = await puppeteer.launch({
//     executablePath: appInfo.path,
//   })

//   const html = path.join(__dirname, './code.html')

//   const page = await browser.newPage()

//   await page.goto(`file://${html}`)

//   const text = await page.waitForSelector('#text')

//   code = await text.evaluate((el) => {
//     return el.textContent
//   })

//   await browser.close()

//   return code
// }


app.get('/', (req, res) => {
  res.send(JSON.stringify({ code: 200, data: 'page', msg: '成功' }, null, '\t'))
})

app.get('/code', async (req, res) => {
  // const code = await main()
 
  res.json({
    code: 200,
    data: code,
    msg: '成功'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
