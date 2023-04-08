const {messages} = require("../consts/messages");
const {mainList, fullList} = require("../consts/linksForWeather");
const {capitalize} = require("./capitalize");
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
                            {text: Object.keys(fullList)[Object.values(fullList).indexOf(document)]+' '+messages.full, callback_data: messages.full},
                            {text: Object.keys(fullList)[Object.values(fullList).indexOf(document)]+' '+messages.briefly, callback_data: messages.briefly}
                        ],
                        [{text: messages.goBack, callback_data: messages.goBack}]
                    ],
                    resize_keyboard: true
                })
            }
        }
        case messages.incorrectLocation: {
            return {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            {text: messages.yes, callback_data: messages.yes},
                            {text: messages.no, callback_data:messages.no}
                        ],
                    ],
                    resize_keyboard: true
                })
            }
        }
        case messages.weatherHandRequest: {
            console.log('0000000000000')
            console.log(document+'000')
            return {
                reply_markup: JSON.stringify({
                    keyboard: [
                        [
                            {text: capitalize(document)+' '+messages.full, callback_data: messages.full},
                            {text:  capitalize(document)+' '+messages.briefly, callback_data: messages.briefly}
                        ],
                        [{text: messages.goBack, callback_data: messages.goBack}]
                    ],
                    resize_keyboard: true
                })
            }
        }
        case 'chooseLocation' : {
            return {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            {text: Object.keys(mainList)[0], callback_data: Object.values(mainList)[0]},
                            {text: Object.keys(mainList)[1], callback_data: Object.values(mainList)[1]}
                        ],
                        [
                            {text: Object.keys(mainList)[2], callback_data: Object.values(mainList)[2]},
                            {text: Object.keys(mainList)[3], callback_data: Object.values(mainList)[3]}
                        ],
                        [
                            {text: Object.keys(mainList)[4], callback_data: Object.values(mainList)[4]},
                            {text: Object.keys(mainList)[5], callback_data: Object.values(mainList)[5]}
                        ],
                        [
                            {text: Object.keys(mainList)[6], callback_data: Object.values(mainList)[6]},
                            {text: Object.keys(mainList)[7], callback_data: Object.values(mainList)[7]}
                        ],
                        [
                            {text:messages.chooseYourself, callback_data: messages.chooseYourself},
                        ],
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