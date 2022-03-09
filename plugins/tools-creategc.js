let handler  = async (m, { conn, text, isOwner }) => {
    let [namagc, partici] = text.split('|')
    if (!namagc) throw 'Format Salah!!!'
    if (!partici) throw 'Tag user sebagai member baru!'
    let mem = conn.parseMention(`@${parseInt(m.sender)} ${partici}`)
    let ha = await conn.groupCreate(namagc, mem).catch(console.error)
    console.log(JSON.stringify(ha));
    await m.reply(`*GROUP CREATE*

\`\`\`Group Telah Dibuat @${m.sender.replace(/@.+/, '')}\`\`\`


${JSON.stringify(ha.participants)}`)
     conn.groupMakeAdmin(ha.gid, [m.sender])
   if (!isOwner) {
      await conn.modifyChat(ha.gid, 'delete', {
            includeStarred: false
          }).catch(console.error)
         conn.groupLeave(ha.gid)
    }
}
 handler.help = ['buatgrup'].map(p=>p+` <nama> | ${inUser}`)
 handler.tags = ['tools']
 handler.command = /^(buatgrup|cgc)$/i
 module.exports = handler