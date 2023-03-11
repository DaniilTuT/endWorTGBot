const {getNews} = require("../parcers/parce");

const tryGet = async () => {
    try {
        console.log('try')
        let doc = await getNews()
        console.log(doc)
        return doc
    }
    catch (e) {
        console.log('catch')
        console.log(e)
       await tryGet()
    }
}

module.exports = {
    tryGet
}