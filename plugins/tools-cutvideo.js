const fs = require('fs');
const { exec } = require('child_process');
let handler = async (m, { conn, args, usedPrefix, command }) => {
  
  let tutor = `Perintah ini untuk memotong durasi video!\n\n`+
  `Kirim atau balas video dengan caption *${usedPrefix+command} <menit>:<detik>(spasi)<menit>:<detik>*\n`+
  `*Contoh :* ${usedPrefix+command} 00:10 00:12`

       if (!args[0]) return m.reply(tutor)
       if (!args[1]) return m.reply(tutor)
       
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        
        if (!/video/.test(mime)) return
          if (/webp/.test(mime)) return
           reply('\n\n   *Sabarr....*   \n\n')
            let media = await conn.downloadAndSaveMediaMessage(q)
            let out = Buffer.alloc(0)
            let ran = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -ss 00:${args[0]} -to 00:${args[1]} -async 1 ${ran}`, (err, stderr, stdout) => {
          fs.unlinkSync(media)
          if (err) m.reply(`*Gagal memotong!*`)
          let buff = fs.readFileSync(ran)
        conn.sendFile(m.chat, buff, ran, 'Succes', m, 0, { thumbnail: Buffer.alloc(0)})
       fs.unlinkSync(ran)
            })
}


handler.help = ['cutvideo <menit>:<detik> <menit>:<detik>']
handler.tags = ['tools']
handler.command = /^(cutvideo)$/i

module.exports = handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}