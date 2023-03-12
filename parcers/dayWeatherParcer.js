const puppeteer = require('puppeteer')
const {links} = require("../consts/links");
const getDayWeather = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${links.weatherApiUrl}`)
    let selector = 'body > section.content.wrap > div.content-column.column1 > section:nth-child(3) > div > div > div'
    await page.waitForSelector(`${selector}`)
    const weather = await page.$(`${selector}`)
    await weather.screenshot({path: "E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.jpg"});
    await browser.close()
    console.log('dayweater')
}
getDayWeather()

module.exports ={
    getDayWeather,
}