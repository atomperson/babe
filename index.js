const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

const fs = require('fs')
const path = require('path')

const port = 8000;

function getAllFilesInfo(dirPath) {
    const itemsInfo = [];
 
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
                });
            }
 
            if (stat.isDirectory()) {
                traverseDirectory(itemPath);
            }
        }
    }
 
    traverseDirectory(dirPath);
    return itemsInfo;
}
 
const folderAndFileList = getAllFilesInfo('/app/.cache/puppeteer/chrome-headless-shell')

const [ appInfo ] = folderAndFileList.filter(item => item.name === 'chrome-headless-shell')

console.log(appInfo, '-----')

async function main() {
  let code = ''
 
  const browser = await puppeteer.launch({
    executablePath: appInfo.path,
  })

  const html = path.join(__dirname, './code.html')

  const page = await browser.newPage()

  await page.goto(`file://${html}`)

  const text = await page.waitForSelector('#text')

  code = await text.evaluate((el) => {
    return el.textContent
  })

  await browser.close()

  return code
}


app.get('/', (req, res) => {
  res.send(JSON.stringify(folderAndFileList, null, '\t'))
})

app.get('/code', async (req, res) => {
  const code = await main()
 
  res.json({
    code: 200,
    data: code,
    msg: '成功'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
