module.exports = Object.assign(async function handler(m, { text }) {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw 'Reply Pesan!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Tidak ada teks`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (sticker[hash] && sticker[hash].locked) throw 'Anda tidak memiliki izin untuk mengubah perintah stiker ini...'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Done!`)
}, {
    help: ['cmd'].map(v => 'set' + v + ' '+ inTeks),
    tags: ['database'],
    command: ['setcmd']
})