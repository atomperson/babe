const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

const fs = require('fs');
const path = require('path');

let text = ''
 
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
 
const folderPath = '/opt/render/.cache/puppeteer/chrome-headless-shell/linux-125.0.6422.60'

text = JSON.stringify(getAllFilesInfo(folderPath))

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

// main()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(text)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
