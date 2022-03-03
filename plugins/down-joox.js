const { joox } = require('../lib/scrape_joox')

const isUrl = str => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(str)
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw conto(usedPrefix, command, `*Perintah ini untuk mencari lagu joox berdasarkan pencarian*`, `<title>`, `mentari pagi`)
    if (isUrl(text)) throw conto(usedPrefix, command, `*Perintah ini untuk mencari lagu joox berdasarkan pencarian*`, `<title>`, `mentari pagi`)
    let json = await joox(text)
    let result = json.data[Math.floor(Math.random() * json.data.length)]
    let pesan = `
*Penyanyi:* ${result.penyanyi}
*Judul:* ${result.lagu}
*Album:* ${result.album}
*Diterbitkan:* ${result.publish}
*Link:* ${result.mp3}
`.trim()
    await conn.sendFile(m.chat, result.img, 'error.jpg', pesan, m, false, { thumbnail: Buffer.alloc(0) })
    await conn.sendFile(m.chat, result.mp3, 'error.mp3', '', m, false, { mimetype: 'audio/mp4' })
}

handler.help = ['joox'].map(v => v + ' <judul>')
handler.tags = ['downloader']
handler.command = /^joox$/i
module.exports = handler