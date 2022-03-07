let handler = async (m, { conn, args }) => {
    conn.deleteMessage("status@broadcast", {
        id: args[0],
        remoteJid: "status@broadcast",
        fromMe: true
     })
     .then(_=>m.reply('Sukses...'))
}
handler.tags = ['owner']
handler.help = ['delsw <id>']
handler.command = /(del(sw|status|story))$/i
handler.owner = true
module.exports = handler