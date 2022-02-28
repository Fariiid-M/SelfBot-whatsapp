let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
module.exports = {
  before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    let chat = global.db.data.chats[m.chat]
    let isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink) {
      m.reply(`*LINK GROUP TERDETEKSI*

Maaf, karena kamu mengirim link group saat anti link group aktif, kamu di kick sebentar lagi!`)
         .then(()=>{
         this.groupRemove(m.chat, [m.sender])
         })
      }
    }
    return true
  }
}
