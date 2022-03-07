let handler = async (m, { conn, text }) => {
    if (!m.quoted) return m.reply('Balas pesan 1x lihat atau pesan view once!!')
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Itu bukan pesan viewOnce...'
    await m.quoted.copyNForward(m.chat, true, { readViewOnce: true }).catch(_ => m.reply('Mungkin dah pernah dibuka bot'))
}

handler.help = ['readviewonce']
handler.tags = ['tools']

handler.command = /^(read(view)?once)/i

module.exports = handler