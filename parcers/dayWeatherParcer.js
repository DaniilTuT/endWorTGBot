const puppeteer = require('puppeteer')
const fs = require("fs");
const getDayWeather = async (link) => {
    console.log(link)
    await fs.access("E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.png",
        (error) => {
            if (!error) {
                fs.unlinkSync("E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.png")
                console.log("файл удалился")
            }
        })
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${link}`)
    let selector = 'body > section.content.wrap > div.content-column.column1 > section:nth-child(3) > div > div > div'
    await page.waitForSelector(`${selector}`)
    const weather = await page.$(`${selector}`)
    await weather.screenshot({path: "E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.png"});
    await browser.close()
    console.log('dayweater')
}
module.exports ={
    getDayWeather,
}