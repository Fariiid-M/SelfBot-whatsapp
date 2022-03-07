let handler = async (m, { text, conn, command,  isAdmin, isBotAdmin, isOwner }) => {
    if (!text) throw `Masukkan nama baru!!`
      if (/(gc|group|grup)/.test(command)) {
            if (!isBotAdmin && !isOwner) return dfail('botAdmin', m, conn)
            if (!isAdmin) return dfail('admin', m, conn)
            if (!m.isGroup) return dfail('group', m, conn)
              await conn.groupUpdateSubject(m.chat, text);
              m.reply('\n\n   *Sukses*   \n\n')
            } else {
            if (!isOwner) return dfail('owner', m, conn)
             await conn.updateProfileName(text);
             m.reply('\n\n   *Sukses*   \n\n')
        }
}
handler.tags = ['group']
handler.help = ['setnamegrup'].map(V=>V+` ${inTeks}`)
handler.command = /^(setnam(e|a)(gc|gro?up)?)$/i
module.exports = handler