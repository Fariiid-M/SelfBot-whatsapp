let handler = async (m, { conn, participants }) => {
    global.db.data.chats[m.chat].isMute = true
    m.reply('\n\n   Sukses mute.   \n\n')
}
handler.help = ['mutechat']
handler.tags = ['owner']
handler.command = /^mute(chat)?$/i
handler.owner = true

module.exports = handler
