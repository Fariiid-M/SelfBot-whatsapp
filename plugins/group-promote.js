let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!(m.quoted || text)) throw `Penggunaan ${usedPrefix+command} ${inUser}`
    let ownerGroup = m.chat.split("-")[0] + '@s.whatsapp.net'
    let user = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "")+'@s.whatsapp.net'
    if (user?.endsWith('@s.whatsapp.net')){
        await conn.groupMakeAdmin(m.chat, [user]).catch(console.log)
    }
  }
  handler.help = ['promote'].map(v => v + ' '+inUser)
  handler.tags = ['group']
  
  handler.command = /^(promote)$/i
  
  handler.group = true
  
  handler.admin = true
  handler.botAdmin = true
  
  module.exports = handler
  