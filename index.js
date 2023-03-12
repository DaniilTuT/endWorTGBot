const TelegramApi = require('node-telegram-bot-api')
const {commands} = require('./consts/commands.js')
const {messages} = require('./consts/messages.js')
const {token} = require('./env')
const {getOption} = require('./helpers/getOption.js')
const {tryGet} = require("./helpers/try");
const {getWeather} = require("./parcers/weatherParcer");
const {getDayWeather} = require("./parcers/dayWeatherParcer");
const bot = new TelegramApi(token.TOKEN, {polling: true})
let msgId = {}
let lastNewsIndex = 0;
const start = () => {


    bot.on('message', async msg => {
        const text = msg.text;
        const messageId = msg.message_id
        const chatId = msg.chat.id;

        if (text === commands.start) {
            msgId.chatId = msg.message_id

            return bot.sendMessage(chatId, messages.firstHello, getOption('undefined'))
        }
        if (text === messages.weatherRequest) {
            console.log('hhhhhhhhhhhhhhh')
            return bot.sendMessage(chatId,messages.choose,getOption(`${messages.weatherRequest}`))
        }

        if (text === messages.briefly) {
            await getDayWeather()
            return bot.sendPhoto(chatId, 'E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\weather.jpg', {
                reply_markup: getOption('undefined').reply_markup
            })
        }
        if (text === messages.full) {
            await getWeather()
            return bot.sendPhoto(chatId, 'E:\\CODEI.TI.schole\\endWorkTGBot\\consts\\dayWeather.jpg', {
                reply_markup: getOption('undefined').reply_markup
            })
        }
        if (text === messages.newsRequest) {
            lastNewsIndex = 0;
            let document = [];
            try {
                document = await tryGet()
            } catch (e) {
                document = await tryGet()
            }
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
        // const mText = msg.message.text
        // const messageId = msg.message.message_id
        // const option = msg.message.reply_markup
        const chatId = msg.message.chat.id;
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

