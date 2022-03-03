let handler = async (m, { conn, command,  isAdmin, isBotAdmin, isOwner }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)){
        if (/webp/.test(mime)) return m.reply('Gas Support Sticker Kak Hehhehheh');
        if (/(gc|group|grup)/.test(command)) {
            if (!isBotAdmin && !isOwner) return dfail('botAdmin', m, conn)
            if (!isAdmin) return dfail('admin', m, conn)
            if (!m.isGroup) return dfail('group', m, conn)
            let media = await q.download()
            await conn.updateProfilePicture(m.chat, media)
        } else {
            if (!isOwner) return dfail('owner', m, conn)
            let media = await q.download()
            await conn.updateProfilePicture(conn.user.jid, media)
        }
    } else {
        throw `\n\n   Balas atau kirim gambarnya bossss...   \n\n`
    }
}
handler.tags = ['group']
handler.help = ['setppgrup'].map(V=>V+` ${inPlease(' reply/send image ')}`)
handler.command = /^(setpp(gc|gro?up)?)$/i
module.exports = handler