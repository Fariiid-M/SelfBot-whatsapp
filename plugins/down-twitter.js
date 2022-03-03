const cheerio = require('cheerio')
const fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw conto(usedPrefix, command, "Masukkan link video twitter!!!", "<Link Video Twitter>", "https://twitter.com/gofoodindonesia/status/1229369819511709697")
  if (!/twitter.com/.test(args[0])) throw conto(usedPrefix, command, "Masukkan link video twitter!!!", "<Link Video Twitter>", "https://twitter.com/gofoodindonesia/status/1229369819511709697")
  try {
    let res = await require('../lib/scraper').twdown(args[0])
  conn.sendFile(m.chat, res.HD, 'twitter', res.desc, m)
  } catch {
    throw eror 
  }
 }
handler.help = ['twitter'].map(v => v + ` ${inUrl}`)
handler.tags = ['downloader']
handler.command = /^(twitter|tw)(dl|down|mp4)?$/i
module.exports = handler