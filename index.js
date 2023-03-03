const TelegramApi = require('node-telegram-bot-api')
require("dotenv").config
const {token} = require('./helpers/TOKEN')
const {getNews} = require('./helpers/parce.js')
const {messages,commands} = require('./helpers/messages.js')
const bot = new TelegramApi(token.TOKEN, {polling: true})

let lastNews = 0;
let Doc = '';
const getDocument =async () => {
    Doc = await getNews();
}
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === commands.start) {
            return  bot.sendMessage(chatId, messages.firstHello)
        }

        if (text === messages.request) {
            await getDocument()
            console.log(document)
            let document = Doc
            for (let i = 0; i < 5; i++) {
                lastNews++;
                await bot.sendPhoto(chatId, document[i].img)
                await bot.sendMessage(chatId, `${document[i].headline}\n${document[i].time}`, {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [[{text: messages.moreInfo, callback_data: '', url: document[i].link}]],
                    })
                })
            }
            return bot.sendMessage(chatId,'Продолжить?',{
                reply_markup: JSON.stringify({
                    inline_keyboard: [[{text:'Дальше?', callback_data: messages.continue,}]],
                })
            })
        }

        return bot.sendMessage(chatId, messages.undefined,{
            reply_markup: JSON.stringify({
                keyboard: [[{text: messages.request, callback_data: messages.continue }]],
                resize_keyboard:true
            })
        })
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const mText = msg.message.text
        const messageId = msg.message.message_id
        const option = msg.message.reply_markup
        const chatId = msg.message.chat.id;
        if (lastNews >=29){
            return bot.sendMessage(chatId,'На этом пока всё, заходите к нам через время',{
                reply_markup: JSON.stringify({
                    keyboard: [[{text: messages.request, callback_data: messages.continue }]],
                    resize_keyboard:true
                })
            })
        }
        if (data === messages.continue) {
            console.log('ghj')
            getDocument()
            let document = Doc
            console.log(document)
            let lN = lastNews
            for (let i = lN; i < lN+5; i++) {
                lastNews++;
                await bot.sendPhoto(chatId, document[i].img)
                await bot.sendMessage(chatId, `${document[i].headline}\n${document[i].time}`, {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [[{text: messages.moreInfo, callback_data: '', url: document[i].link}]],
                    })
                })
            }
            return bot.sendMessage(chatId,messages.continue,{
                reply_markup: JSON.stringify({
                    inline_keyboard: [[{text: messages.continue1, callback_data: commands.continue,}]],
                })
            })
        }
    })
}

start()

