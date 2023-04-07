const TelegramApi = require('node-telegram-bot-api')
const {commands} = require('./consts/commands.js')
const {messages} = require('./consts/messages.js')
const {fullList} = require("./consts/const");
const {token} = require('./env')
const {capitalize} = require('./helpers/capitalize')
const {getOption} = require('./helpers/getOption.js')
const {getNews} = require("./parcers/newsParcer");
const {getWeather} = require("./parcers/weatherParcer");
const {getDayWeather} = require("./parcers/dayWeatherParcer");

const bot = new TelegramApi(token.TOKEN, {polling: true})

let lastLocation = {}
let lastNewsIndex = 0;
let isSearch = false
const start = () => {


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === commands.start) {
            return bot.sendMessage(chatId, messages.firstHello, getOption('undefined'))
        }
        if (text === messages.weatherRequest) {
            return bot.sendMessage(chatId, messages.chooseLocation, getOption(`chooseLocation`))
        }
        if (Object.keys(fullList).includes(capitalize(text))) {
            lastLocation.chatId = fullList[capitalize(text)]
            console.log(capitalize(text))
            return bot.sendMessage(chatId, messages.chooseLocation, getOption(`${messages.weatherHandRequest}`,text))
        }
        if (text.includes(messages.full)) {
            await getDayWeather(lastLocation.chatId)
            return bot.sendPhoto(chatId, 'E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.png', {
                reply_markup: getOption('undefined').reply_markup
            })
        }
        if (text.includes(messages.briefly)) {
            await getWeather(lastLocation.chatId)
            return bot.sendPhoto(chatId, 'E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.png', {
                reply_markup: getOption('undefined').reply_markup
            })
        }
        if (text === messages.newsRequest) {
            lastNewsIndex = 0;
            await getNews()
            let document = await Doc
            for (let i = 0; i < 5; i++) {
                lastNewsIndex++;
                if (i === 4) {
                    return bot.sendPhoto(chatId, document[i].img, {
                        caption: `${document[i].headline}\n\n${document[i].time}`,
                        reply_markup: getOption('continue', document, i).reply_markup
                    },)
                } else {
                    await bot.sendPhoto(chatId, document[i].img, {
                        caption: `${document[i].headline}\n\n${document[i].time}`,
                        reply_markup: getOption('mess', document, i).reply_markup
                    })
                }
            }

        }
        return bot.sendMessage(chatId, messages.undefined, getOption('undefined'))
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === messages.chooseYourself) {
            isSearch = true
        }
        if (data.includes('https')) {
            console.log(data)
            lastLocation.chatId = data
            return bot.sendMessage(chatId, messages.chooseLocation, getOption(`${messages.weatherRequest}`, `${data}`))
        }
        if (data === messages.continue) {
            let document = [];
            try {
                document = await tryGet()
            } catch (e) {
                console.log(e)
                document = await tryGet()
            }
            let lN = lastNewsIndex
            for (let i = lN; i < lN + 5; i++) {
                console.log(i)
                console.log(document[i])
                if (i === document.length - 1) {
                    return bot.sendMessage(chatId, messages.end, getOption('undefined'))
                }
                lastNewsIndex++;
                if (lastNewsIndex - lN === 5) {
                    return bot.sendPhoto(chatId, document[i].img, {
                        caption: `${document[i].headline}\n\n${document[i].time}`,
                        reply_markup: getOption('continue', document, i).reply_markup
                    })

                } else {
                    await bot.sendPhoto(chatId, document[i].img, {
                        caption: `${document[i].headline}\n\n${document[i].time}`,
                        reply_markup: getOption('mess', document, i).reply_markup
                    })
                }
            }
        }
    })
}

start()

