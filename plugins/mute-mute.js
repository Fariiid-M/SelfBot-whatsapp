let handler = async (m, { command, conn, participants }) => {
    if (/unmute/.test(command)){
        global.db.data.chats[m.chat].isMute = false
        m.reply('\n\n   Sukses unmute.   \n\n')        
    } else {
    global.db.data.chats[m.chat].isMute = true
    m.reply('\n\n   Sukses mute.   \n\n')
    }
}
handler.help = ['mutechat', 'unmute']
handler.tags = ['owner']
handler.command = /^(un)?mute(chat)?$/i
handler.owner = true

module.exports = handler
