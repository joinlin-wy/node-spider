const fetch = require('./fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const mongodb = require('./mongodb/')
async function fetchData(Word) {
    let data = ''
    try {
        data = await fetch({
            url: 'http://www.youdao.com/w/eng/' + Word + '/',
            encoding: ''
        })
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
    // console.log(data)
    let $ = cheerio.load(data)
    // let spelling = {
    //     '英': $('.baav .phonetic').eq(0).text(),
    //     '美': $('.baav .phonetic').eq(1).text()
    // }
    let explanation = $('#phrsListTab .trans-container li').map(function () {
        return $(this).text()
    }).get()
    // let sentences = $('#examplesToggle #bilingual>ul.ol li').map(function () {
    //     let en = $(this).find('p').eq(0).text().replace(/\n|\t|(\s*$)/g, '')
    //     let zh = $(this).find('p').eq(1).text().replace(/\n|\t|(\s*$)/g, '')
    //     return {
    //         en,
    //         zh
    //     }
    // }).get()
    let word = {
        word: Word,
        // spelling,
        explanation,
        // sentences
    }
    console.log(word)
    return word
}

function getWord(text) {
    var str = ''
    for (var i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) <= 255) {
            str += text[i]
        }
    }
    return str
}

async function updateWord(Word) {
        let word = await fetchData(Word.word)
        await mongodb.operate.updateWord({
            filter: {
                word: word.word
            },
            data: {
                explanation: word.explanation,
                // spelling: word.spelling,
                // sentences: word.sentences
            }
        })
        // let updatedWord = await mongodb.operate.queryWord({
        //     word: word
        // })
}
(async function () {
    let client = null
    try {
        await mongodb.connect().then(() => {
            console.log('connected to mongodb server')
        })
        client = mongodb.client
        let words = await mongodb.operate.getWords({
            query: {explanation: []},
            options: {
                limit: null,
                skip: null
            }

        })
        console.log(words.length);
        // let promises = []
        for (let i = 0; i < words.length; i++) {
            let Word = words[i]
            await updateWord(Word)
            // promises.push(updateWord(Word));
            console.log('total update: '+(i+1))
        }
        // await Promise.all(promises)
        client.close()
    } catch (e) {
        console.error(e)
        client && client.close()
    }
})()