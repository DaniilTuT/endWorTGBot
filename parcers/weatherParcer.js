const puppeteer = require('puppeteer')
const {links} = require("../consts/links");

const getWeather = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${links.weatherApiUrl}`)
    let selector = 'body > section.content.wrap > div.content-column.column1 > section.section.section-content.section-bottom-collapse > div > a.weathertab.weathertab-block.tooltip'
    await page.waitForSelector(`${selector}`)
    await page.click('body > div.cookienotify > div',{
        delay:0,
        button: "left",
        clickCount:1,
    })
    const weather = await page.$(`${selector}`)
    await weather.screenshot({path: "E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.jpg"});
    await browser.close()
    console.log('weather')
}
getWeather()


module.exports = {
    getWeather,
}

