const express = require('express')
const app = express()

const puppeteer = require('puppeteer')

const fs = require('fs')
const path = require('path')

const port = 3000

function getAllFilesInfo(dirPath) {
    const itemsInfo = []

    function traverseDirectory(currentPath) {
        const items = fs.readdirSync(currentPath);

        for (const item of items) {
            const itemPath = path.join(currentPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isFile() || stat.isDirectory()) {
                itemsInfo.push({
                    name: item,
                    path: itemPath,
                    size: stat.size,
                    createdAt: stat.ctime,
                    modifiedAt: stat.mtime,
                    isDirectory: stat.isDirectory()
                })
            }

            if (stat.isDirectory()) {
                traverseDirectory(itemPath)
            }
        }
    }

    traverseDirectory(dirPath);
    return itemsInfo;
}

const folderAndFileList = getAllFilesInfo(path.join(__dirname, 'chrome-headless-shell'))

const [ appInfo ] = folderAndFileList.filter(item => item.name === 'chrome-headless-shell') || []

// const appPath = appInfo && appInfo.path ? appInfo.path.split('/').slice(2).join('/') : null

console.log('-----', appInfo)

async function main() {
  let code = ''

  console.log('开始进入code')
 
  const browser = await puppeteer.launch({
    executablePath: appInfo.path,
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox', '--enable-gpu'],
    // timeout: 0
  })

  const html = path.join(__dirname, './code.html')

  console.log('html path', '----->', html)
    
  const page = await browser.newPage()

  await page.goto(`file://${html}`)

  const text = await page.waitForSelector('#text', { timeout: 0 })

  console.log('text', '----->', text)

  code = await text.evaluate((el) => {
    return el.textContent
  })

  await browser.close()

  return code
}


app.get('/', (req, res) => {
  res.send(JSON.stringify({ code: 200, data: null, msg: '成功' }, null, '\t'))
})

app.get('/code', async (req, res) => {
  const code = await main()

  console.log(code)

  res.json({
    code: 200,
    data: code,
    msg: '成功'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
