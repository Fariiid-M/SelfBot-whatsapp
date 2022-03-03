const { gempa } = require('../lib/scraper');
let handler = async (m, { conn }) => {
    let _ = await gempa()
    let teks = `*INFO GEMPA*

*Waktu :* ${_.Waktu}
*Bujur :* ${_.Bujur}
*Besaran :* ${_.Magnitudo}
*Kedalaman :* ${_.Kedalaman}
*Wilayah :* ${_.Wilayah}`
    conn.sendFile(m.chat, _.Map, 'gempa.jpg', teks, m)
}
handler.tags =  ['info']
handler.help = ['Gempa']
handler.command = /^(gempa)$/i
module.exports = handler