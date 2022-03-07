const cheerio = require('cheerio')
const axios = require('axios')

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (args.length == 0) throw `Masukan link video facebook!!\n\nPenggunaan : ${usedPrefix+command} link`
 if (!isUrl(args[0])) throw erorlink
 try {
 let res = await facebookDownloader(args[0])
 if (res.rezult.link_high == '') return m.reply('\n\n   *Error cuy*   \n\n')
 await m.reply(wait)
  conn.sendFile(m.chat, res.rezult.link_high, `fb-dl`, `_${res.rezult.title} => ${res.rezult.author}_`, m)
 } catch {
throw eror 
 }
}
handler.tags = ['downloader']
handler.help = ['fbdl'].map(v=>v+` ${inUrl}`)
handler.command = /^(fb|facebook)(dl|down)?$/i
module.exports = handler


function isUrl(url){
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

//https://github.com/DikaArdnt
function facebookDownloader(urls) {

    return new Promise(async (resolve, reject) => {
       const data = await axios({
           url: 'https://downvideo.net/',
           method: 'GET',
           headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
           }
       })
       const $ = cheerio.load(data.data)
       const token = $('#token').attr('value')
       const getPost = await axios({
           url: 'https://downvideo.net/download.php',
           method: 'POST',
           headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            "cookie": '_gid=GA1.2.1321544464.1633811193; _ga=GA1.2.1392580783.1633811193; __gads=ID=c73de99d7fa5c467-226981f63ecc00f1:T=1633811193:RT=1633811193:S=ALNI_MaC9fW2mqfT2hm7zODcNNffab1XLg'
           },
           data: new URLSearchParams(Object.entries({ 'URL': urls, 'token': token }))
       })
       const c = cheerio.load(getPost.data)
       const rezult = {
            author: c('div.row').find('div.col-md-12:nth-child(1)').text(),
            title: c('div.row').find('div.col-md-12:nth-child(3) > p').text(),
            thumb: c('div.row').find('div.col-md-12:nth-child(2) > img').attr('src'),
            link_high: c('div.row').find('div.col-md-3 > a').eq(0).attr('href') || c('div.row').find('#sd > a').attr('href') || '',
            link_normal: c('div.row').find('div.col-md-3 > a').eq(1).attr('href') || ''
       }
       resolve({ rezult })
    })
}
