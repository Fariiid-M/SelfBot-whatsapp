let cheerio = require('cheerio')
let axios = require('axios')
let Crypto = require('crypto')

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw conto(usedPrefix, command, 'masukan wallpaper apa yang ingin anda cari!!!', inQuery, 'pantai')
wallpaper(text)
.then((res) => {
  if (res.length == 0) return m.reply(text+" tidak di temukan!")
  let get = res[Crypto.randomInt(0, res.length)]
   conn.sendButtonImg(m.chat, get, text, "", 'Next', `${usedPrefix+command} ${text}`, m)
                  .catch(_ => {
       conn.sendButton(m.chat, `*Error!!!*`, ``, 'Coba Lagi', `${usedPrefix+command} ${text}`, m)
                  })
  //conn.sendMessage(m.chat, { image: { url: get }}, { quoted: m })
})

}
handler.tags = ['search']
handler.help = ['wallpaper'].map(v => v + ` ${inQuery}`)
handler.command = /^(wps|wallpaper)$/i
module.exports = handler

function wallpaper(query) {
return new Promise((resolve, reject) => {
  axios.get("https://www.wallpaperflare.com/search?wallpaper="+query).then(async tod => {
  const $ = cheerio.load(tod.data)
    hasil = []
      $("#gallery > li > figure> a").each(function(i, cuk) {
    const img = $(cuk).find("img").attr('data-src');
    let result = img==='undefined'?"":img
    hasil.push(result)
  })
  resolve(hasil)
  }).catch(reject);
  });

}