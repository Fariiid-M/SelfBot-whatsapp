let handler = async (m, { conn, text, usedPrefix, command, groupMetadata }) => {
    if (!(m.quoted || text)) throw `Penggunaan ${usedPrefix+command} <NomerTarget>`
    let ownerGroup = m.chat.split("-")[0] + '@s.whatsapp.net' || groupMetadata.owner
    let user = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "")+'@s.whatsapp.net'
    if (user?.endsWith('@s.whatsapp.net')){
    if (user?.includes(ownerGroup)) return m.reply("   \nTidak bisa mengeluarkan owner group!\n   ")
    conn.groupRemove(m.chat, [user])
} 
      }
  handler.help = ['kick', 'tendang'].map(v => v +` ${inUser}`)
  handler.tags = ['group']
  handler.command = /^(kick|tendang)$/i
  handler.group = true
  handler.admin = true
  handler.botAdmin = true
  
  handler.fail = null
  
  module.exports = handler
  