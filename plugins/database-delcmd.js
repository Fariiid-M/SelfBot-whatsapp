module.exports = Object.assign(async function handler(m, { text, isOwner }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `Tidak ada hash`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked && !isOwner) throw 'Anda tidak memiliki izin untuk menghapus perintah stiker ini...'
    delete sticker[hash]
    m.reply(`\n\n   Suksess..   \n\n`)
}, {
    help: ['cmd'].map(v => 'del' + v + ' '+inTeks),
    tags: ['database'],
    command: ['delcmd']
})