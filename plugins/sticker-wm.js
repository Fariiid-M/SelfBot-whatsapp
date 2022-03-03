
let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let t1 = text.split("|")[0]
    let t2 = text.split("|")[1] ? text.split("|")[1]: ""
    if (/image/.test(mime)) {
    let img = await q.download()
    conn.sendImageAsSticker(m.chat, img, m, { packname: t1, author: t2||''})
    } else if (/video/.test(mime)) {
    if ((q.msg || q).seconds > 15) return m.reply('Maksimal video berdurasi 10 detik!')
    let img = await q.download()
    conn.sendVideoAsSticker(m.chat, img, m, { packname: t1, author: t2||''})
    } else {
    m.reply(`reply sticker yang ingin di ubah wmnya dengan caption ${usedPrefix+command} <teks>|<teks2>`)
    }
    } catch (e) {
    throw e
    }
    
   }
   
   handler.help = ['wm <teks1>|<teks2>', 'swm <teks1>|<teks2>']
   handler.tags = ['tools']
   handler.command = /^wm|take|(s|sticker|stiker)wm$/i
   
   module.exports = handler