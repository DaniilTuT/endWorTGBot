const puppeteer = require('puppeteer')
const fs = require("fs");

const getWeather = async (link) => {
    console.log(link)
    await fs.access("E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.png",
        (error) => {
            if (!error) {
                fs.unlinkSync("E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.png")
                console.log("файл удалился")
            }
        })
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${link}`)
    let selector = 'body > section.content.wrap > div.content-column.column1 > section.section.section-content.section-bottom-collapse > div > a.weathertab.weathertab-block.tooltip'
    await page.waitForSelector(`${selector}`)
    await page.click('body > div.cookienotify > div', {
        delay: 0,
        button: "left",
        clickCount: 1,
    })
    const weather = await page.$(`${selector}`)
    await page.screenshot({path: 'E:\\CODEI.TI.schole\\endWorkTGBot\\screen.png'})
    await weather.screenshot({path: "E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.png"});
    await browser.close()
    console.log('weather')
}
//getWeather('https://www.gismeteo.md/weather-cioburciu-46993/')
module.exports = {
    getWeather,
}

