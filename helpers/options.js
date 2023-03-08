const {messages} = require("./messages");
const getOption = (Case,Doc,i) => {
    let document = Doc
    switch (Case) {
        case 'mess': {
            let option = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: messages.moreInfo, callback_data: '', url: document[i].link}],

                    ],
                })
            }
            return option
            break
        }
        case 'continue': {
            let option = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: messages.moreInfo, callback_data: '', url: document[i].link}],
                        [{text:messages.continue1, callback_data: messages.continue,}]
                    ],
                })
            }
            return option
            break
        }
        case 'undefined' : {
            let option = {
                reply_markup: JSON.stringify({
                    keyboard: [[{text: messages.request, callback_data: messages.request }]],
                    resize_keyboard:true
                })
            }
            return  option
            break
        }
    }


}

module.exports ={
    getOption
}