const express = require('express')
const app = express()

const BrowserLess = require('browserless')

const browser = BrowserLess()

// const puppeteer = require('puppeteer')

// const fs = require('fs')
// const path = require('path')

const port = 8000

// function getAllFilesInfo(dirPath) {
//     const itemsInfo = []

//     function traverseDirectory(currentPath) {
//         const items = fs.readdirSync(currentPath);

//         for (const item of items) {
//             const itemPath = path.join(currentPath, item);
//             const stat = fs.statSync(itemPath);

//             if (stat.isFile() || stat.isDirectory()) {
//                 itemsInfo.push({
//                     name: item,
//                     path: itemPath,
//                     size: stat.size,
//                     createdAt: stat.ctime,
//                     modifiedAt: stat.mtime,
//                     isDirectory: stat.isDirectory()
//                 })
//             }

//             if (stat.isDirectory()) {
//                 traverseDirectory(itemPath)
//             }
//         }
//     }

//     traverseDirectory(dirPath);
//     return itemsInfo;
// }

// const folderAndFileList = getAllFilesInfo(path.join(__dirname, 'chrome-headless-shell'))

// const [ appInfo ] = folderAndFileList.filter(item => item.name === 'chrome-headless-shell') || []

// const appPath = appInfo && appInfo.path ? appInfo.path.split('/').slice(2).join('/') : null

// console.log('-----', appInfo, '------', path.join(__dirname, appPath))

// async function main() {
//   let code = ''
 
//   const browser = await puppeteer.launch({
//     executablePath: path.join(__dirname, appPath),
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
  res.send(JSON.stringify({ code: 200, data: null, msg: '成功' }, null, '\t'))
})

app.get('/code', async (req, res) => {
  // const code = await main()

  const context = await browser.createContext()

  const text = await context.text('https://wantyou.stormkit.dev')

  console.log(text)

  browser.close()
 
  res.json({
    code: 200,
    data: text,
    msg: '成功'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
