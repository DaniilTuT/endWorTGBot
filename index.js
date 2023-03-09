const TelegramApi = require('node-telegram-bot-api')
require("dotenv").config
const {token} = require('./helpers/TOKEN')
const {getNews} = require('./helpers/parce1.js')
const {getOption} = require('./helpers/options.js')
const {messages, commands} = require('./helpers/messages.js')
const {tryGet} = require("./helpers/try");
const bot = new TelegramApi(token.TOKEN, {polling: true})

let lastNews = 0;
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === commands.start) {
            return bot.sendMessage(chatId, messages.firstHello, getOption('undefined'))
        }

        if (text === messages.request) {
            let document = [];
           try {
               document = await tryGet()
           } catch (e) {
               console.log('ccaattcchh')
               document = await tryGet()
           }
            for (let i = 0; i < 5; i++) {
                lastNews++;
                if (i === 4) {
                    return  bot.sendPhoto(chatId, document[i].img, {caption: `${document[i].headline}\n\n${document[i].time}`,reply_markup:getOption('continue', document, i).reply_markup},)
                } else {
                    await bot.sendPhoto(chatId, document[i].img, {
                        caption : `${document[i].headline}\n\n${document[i].time}`,
                        reply_markup:getOption('mess', document, i).reply_markup
                    })
                }
            }

        }
        return bot.sendMessage(chatId, messages.undefined, getOption('undefined'))
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const mText = msg.message.text
        const messageId = msg.message.message_id
        const option = msg.message.reply_markup
        const chatId = msg.message.chat.id;
        if (data === messages.continue) {
            let document = [];
            try {
                document = await tryGet()
            } catch (e) {
                console.log(e)
                document = await tryGet()
            }
            let lN = lastNews
            for (let i = lN; i < lN + 5; i++) {
                console.log(i)
                console.log(document[i])
                if (i===document.length-1) {
                    return bot.sendMessage(chatId, messages.end, getOption('undefined'))
                }
                lastNews++;
                if (lastNews-lN ===5 ) {
                    return  bot.sendPhoto(chatId, document[i].img, {caption: `${document[i].headline}\n\n${document[i].time}`,reply_markup:getOption('continue', document, i).reply_markup})

                } else {
                    await  bot.sendPhoto(chatId, document[i].img, {caption: `${document[i].headline}\n\n${document[i].time}`,reply_markup:getOption('mess', document, i).reply_markup})
                }
            }
        }
    })
}

start()

