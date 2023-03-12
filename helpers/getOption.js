const {messages} = require("../consts/messages");
const getOption = (option, document, i) => {
    switch (option) {
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
        case messages.weatherRequest: {
            return {
                reply_markup: JSON.stringify({
                    keyboard: [
                        [
                            {text: messages.full, callback_data: messages.full},
                            {text: messages.briefly, callback_data: messages.briefly}
                        ],
                        [{text: messages.goBack, callback_data: messages.goBack}]
                    ],
                    resize_keyboard: true
                })
            }
        }
        default : {
            return {
                reply_markup: JSON.stringify({
                    keyboard: [
                        [{text: messages.newsRequest, callback_data: messages.newsRequest}],
                        [{text: messages.weatherRequest, callback_data: messages.weatherRequest}]
                    ],
                    resize_keyboard: true
                })
            }
        }
    }


}

module.exports = {
    getOption
}