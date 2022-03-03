let handler = async (m, { conn, command, usedPrefix }) => {
   if (/self/.test(command)){
    db.data.settings[conn.user.jid].self = true
       m.reply(`\n\n   *Sukses, self mode*   \n\n`)
   } else if (/public/.test(command)){
    db.data.settings[conn.user.jid].self = false
    m.reply(`\n\n   *Sukses, public mode*   \n\n`)
   } else {
       m.reply(db.data.settings[conn.user.jid].self ? '*Self Mode*' : '*Public Mode*')
   }
}
handler.tags = ['owner']
handler.help = ['self', 'public', 'mode']
handler.command = /(self|public|mode)$/i
handler.owner = true
module.exports = handler