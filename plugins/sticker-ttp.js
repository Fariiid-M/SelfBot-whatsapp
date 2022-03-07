let { ttp } = require('../lib/canvas');
let handler = async (m,{ usedPrefix, command, conn, text }) => {
    let teg = `Text to picture. Contoh:\n` +
    `${usedPrefix}ttp Halo sayang\n` +
    `${usedPrefix}ttpc red Halo (warna merah)\n` +
    `${usedPrefix}ttpc red Halo -blue (warna merah stroke biru)\n` +
    `${usedPrefix}ttpc red+blue Halo (warna gradasi merah-biru)\n` +
    `${usedPrefix}ttpc red+blue Halo -white (warna gradasi merah-biru stroke putih)\n`
    if (!text) return m.reply(teg)
    if (/-help/i.test(text.toLowerCase())) return m.reply(teg)
    m.reply(wait)
    let ttpBuff
    if (/pc/i.test(command)) {
        let col1 = text.includes('+') ? text.split(`+`)[0] : text.split(' ')[0] 
        let col2 = text.split(`+`)[1]?.split(' ')[0] || ''
        let strk = text.split(`-`)[1]
        let txt = text.split(' ')[1]?.split('-')[0]
        ttpBuff = await ttp(txt, col1, col2, strk).catch(e => {
            throw e
            })
    } else {
        let txt = m.quoted?.text || text
        ttpBuff = await ttp(txt).catch(e => { 
            throw e
        })
    }
    conn.sendImageAsSticker(m.chat, ttpBuff, m, { packname: packname, author: author })
}
handler.tags = ['tools']
handler.help = ['ttp <teks>', 'ttpc <warna>+<gradasi?> <teks> -<stroke?>']
handler.command = /^(ttpc?)$/i
module.exports = handler
