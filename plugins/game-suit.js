/* 
    Made by https://github.com/syahrularranger 
    Jangan di hapus credit nya :)
*/
let timeout = 60000
let handler = async (m, { conn, usedPrefix, text }) => {
  conn.suit = conn.suit ? conn.suit : {}
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'Selesaikan suit mu yang sebelumnya'
  if (!(m.quoted || text)) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${owner[0]}`, m.chat, { contextInfo: { mentionedJid: [owner[0] + '@s.whatsapp.net'] } })
  let user = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "")+'@s.whatsapp.net'
  if (isNaN(parseInt(user))) throw `Tag lawan!!`
  if (user?.endsWith('@s.whatsapp.net')){
  // if (user?.includes(conn.user.jid)) return m.reply("   \nTidak bisa bermain dengan bot!\n   ")
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(user))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`
  let id = 'suit_' + new Date() * 1
  let caption = `*SUIT*

@${m.sender.split`@`[0]} menantang @${user.split`@`[0]} untuk bermain suit

Silahkan @${user.split`@`[0]} 
`.trim()
  let footer = `Ketik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak`
  conn.suit[id] = {
    chat: await conn.send2Button(m.chat, caption, footer, 'Terima', 'ok', 'Tolak', 'tolak', m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }),
    id: id,
    p: m.sender,
    p2: user,
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Waktu suit habis_`, m)
      delete conn.suit[id]
    }, timeout), timeout
  }
} else {
  throw `Tag lawan!!`
}
}
handler.tags = ['game']
handler.help = ['suit'].map(v => v + ' '+inUser)
handler.command = /^(suit)$/i
handler.limit = false
handler.group = true

module.exports = handler