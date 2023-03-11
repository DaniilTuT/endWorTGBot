const {messages} = require("../consts/messages");
const getOption = (option , document, i) => {
    switch (option ) {
        case 'mess': {
            return {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: messages.moreInfo, callback_data: '', url: document[i].link}],

                    ],
                })
            }
        }
        case 'continue': {
            return {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: messages.moreInfo, callback_data: '', url: document[i].link}],
                        [{text: messages.continue1, callback_data: messages.continue,}]
                    ],
                })
            }
        }
        default : {
            return {
                reply_markup: JSON.stringify({
                    keyboard: [[{text: messages.request, callback_data: messages.request}]],
                    resize_keyboard: true
                })
            }
        }
    }


}

module.exports = {
    getOption
}