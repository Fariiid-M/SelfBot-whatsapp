const { sticker } = require('../lib/sticker');
const { MessageType } = require('@adiwajshing/baileys');
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw conto(usedPrefix, command, 'Fitur ini di buat untuk menggabungkan 2 emoji menjadi 1.', '<emoji1>|<emoji2>', '😁|😆')
let [emoji1, emoji2] = text.split`|` 
if (!emoji1) return m.reply(conto(usedPrefix, command, 'Fitur ini di buat untuk menggabungkan 2 emoji menjadi 1.', '<emoji1>|<emoji2>', '😁|😆'))
if (!emoji2) return m.reply(conto(usedPrefix, command, 'Fitur ini di buat untuk menggabungkan 2 emoji menjadi 1.', '<emoji1>|<emoji2>', '😁|😆'))
  let e1 = emoji1.replace(/[><]/g, '')
  let e2 = emoji2.replace(/[><]/g, '')
  try {
  let anu = await conn.fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(e1)}_${encodeURIComponent(e2)}`)
  let stek = await sticker(false, anu.results[0].url, global.packname, global.author)
  conn.sendMessage(m.chat, stek, MessageType.sticker, {
    quoted: m
  })
  } catch (e) {
  throw `Tidak dapat menggabungkan emoji ${e1} dengan ${e2}`
 }
}
handler.tags = ['tools']
handler.help = ['emojimix <emoji1>|<emoji2>']
handler.command = /^(emojimix)$/i
module.exports = handler