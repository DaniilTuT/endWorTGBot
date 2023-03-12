const puppeteer = require('puppeteer')
const {links} = require("../consts/links");
const getNews = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`${links.newsApiUrl}`)

    await page.waitForSelector('#block_left_column_content')

    let html = await page.evaluate(() => {
        let html = document.querySelector('#block_left_column_content').innerHTML
        return html
    })
    await browser.close()

    let lastMass = [];

    while (html.includes('<a')) {
        let obj = {};

        let text = html.substring(html.indexOf('<a'), html.indexOf('class="list-thumbs__time time"') + 46)

        if (text.includes('img')) {

            let headline = text.slice(text.indexOf('__title') + 10, text.indexOf('__title') + 150)
            obj.headline = headline.slice(0, headline.indexOf('</a>') - 1)

            let img = text.slice(text.indexOf('src="') + 5, text.indexOf('src="') + 160)
            obj.img = img.slice(0, img.indexOf('" alt'))

            let link = text.slice(text.indexOf('href="') + 6, text.indexOf('.html') + 5)
            obj.link = link


            let time = text.slice(text.indexOf('list-thumbs__time time"'))
            obj.time = time.slice(time.indexOf('"') + 2)
            lastMass.push(obj)
        }
        html = html.replace(`${text}`, ' ')
    }
    (lastMass >  []) ?console.log(`lastMass был выведен? ${lastMass[0].headline}`): 0
    return lastMass
}


module.exports = {
    getNews
}