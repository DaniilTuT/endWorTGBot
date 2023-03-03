const puppeteer = require('puppeteer')
const {links} = require("./links");
const {exceptions} = require("./exceptions");
const getNews = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(links.goToLink)
    await page.waitForSelector('#__next > div > div.sc-2lx4wp-5.bhpuOP > div.sc-2lx4wp-1.dvJqau > div.q0u02f-0.dVvtmP > div > div > div.sc-14maoea-0.cvVyJn > div.sc-196n8s3-0.frRIbC > div')

    let arr =  await page.evaluate(() => {
        let text = document.querySelector(`#__next > div > div.sc-2lx4wp-5.bhpuOP > div.sc-2lx4wp-1.dvJqau > div.q0u02f-0.dVvtmP > div > div > div.sc-14maoea-0.cvVyJn > div.sc-196n8s3-0.frRIbC > div`).innerText
        return text
        })
    let text = arr;
    let arr1 =  await page.evaluate(() => {
        let html = document.querySelector("#__next > div > div.sc-2lx4wp-5.bhpuOP > div.sc-2lx4wp-1.dvJqau > div.q0u02f-0.dVvtmP > div > div > div.sc-14maoea-0.cvVyJn > div.sc-196n8s3-0.frRIbC > div").innerHTML
        return html
    })

    await browser.close()
    let html = arr1;
    let count = 0;

    let prepareMas = text.split('\n').filter((el,index) => {
        if (index>2) {
            let counter = 0
            let counter1 = 0
            for (let word in exceptions) {
                counter1++
                if (!el.includes(exceptions[word])){
                    counter++
                }
            }
            if (counter === counter1) {
                return el
            }
        }
    })
    let obj = {};
    let lastMass = [];
    for (let i = 0; i < prepareMas.length; i++) {
        if (i % 2 === 0) {
            obj.headline = prepareMas[i]
        }
        else {obj.time = prepareMas[i];
            lastMass.push(obj)
            obj = {}
        }
    }
    console.log(lastMass)
    let count1 = 0;
    let text1;
    while (html.indexOf('https')>-1) {
        text = html.substring(html.indexOf('https'),html.indexOf('https')+150)
        if (text.includes('370x194/')) {
            let id = text.indexOf('.jpg')
            lastMass[count].img= text.slice(0,id+4)
            count++;
        }
        text1 = html.substring(html.indexOf('href="')+6,html.indexOf('href="')+156)
        if (text1.includes('ru/novosti') && text1.includes('h3')  ) {
            let id = text1.indexOf('">')
            lastMass[count1].link = 'https://point.md'+text1.slice(0,id);
            lastMass[count1].id = count1;
            count1++;
        }
        html = html.replace('https', ' ')
        html = html.replace('href="', ' ')

    }
    return lastMass
}
getNews()

module.exports = {
    getNews
}












