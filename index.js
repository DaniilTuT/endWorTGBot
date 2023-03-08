const TelegramApi = require('node-telegram-bot-api')
require("dotenv").config
const {token} = require('./helpers/TOKEN')
const {getNews} = require('./helpers/parce1.js')
const {getOption} = require('./helpers/options.js')
const {messages, commands} = require('./helpers/messages.js')
const bot = new TelegramApi(token.TOKEN, {polling: true})

let lastNews = 0;
let Doc = Array;
const getDocument = async () => {
    Doc = await getNews();
}
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === commands.start) {
            return bot.sendMessage(chatId, messages.firstHello)
        }


        if (text === messages.request) {
            await getDocument()
            let document = Doc
            for (let i = 0; i < 5; i++) {
                lastNews++;
                await bot.sendPhoto(chatId, document[i].img)
                if (i === 4) {
                    console.log(i)
                    return  bot.sendMessage(chatId, `${document[i].headline}\n\n${document[i].time}`, getOption('continue', document, i))
                } else {
                    await bot.sendMessage(chatId, `${document[i].headline}\n\n${document[i].time}`, getOption('mess', document, i))
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
        if (lastNews >= 29) {
            return bot.sendMessage(chatId, 'На этом пока всё, заходите к нам через время', {
                reply_markup: JSON.stringify({
                    keyboard: [[{text: messages.request, callback_data: messages.continue}]],
                    resize_keyboard: true
                })
            })
        }
        if (data === messages.continue) {
            await getDocument()
            let document = await Doc
            let lN = lastNews
            for (let i = lN; i < lN + 5; i++) {
                console.log(i)
                lastNews++;
                await bot.sendPhoto(chatId, document[i].img)
                if (lastNews-lN ===5 ) {
                    return bot.sendMessage(chatId, `${document[i].headline}\n\n${document[i].time}`, getOption('continue', document, i))
                } else {
                    await bot.sendMessage(chatId, `${document[i].headline}\n\n${document[i].time}`, getOption('mess', document, i))
                }
            }
        }
    })
}

start()

