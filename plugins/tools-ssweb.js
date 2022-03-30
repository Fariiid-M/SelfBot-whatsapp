let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length == 0) throw conto(usedPrefix, command, `Masukan link yang ingin di screenshoot!!`, inUrl, 'https://google.com')
   let una = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
    try {
      conn.sendFile(m.chat, API('https://nurutomo.herokuapp.com', '/api/ssweb', { url: una, delay: 1000, type: 'png'}), 'ssweb.png', una, m)
    } catch{
      throw erorlink
    }
  }
  handler.tags = ['tools']
  handler.help = ['ssweb'].map(v => v + ` ${inUrl}`)
  handler.command = /^ss(web)?$/i
  module.exports = handler
