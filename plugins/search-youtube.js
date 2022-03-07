const { WAMessageProto } = require('@adiwajshing/baileys');
const { template } = require('lodash');
const yts = require('yt-search');
let handler = async (m, { usedPrefix, command, conn, text }) => {
    if (!text) throw conto(usedPrefix, command, 'Masukan apa yang mau di cari!!', inQuery, 'lagu campursari jawa')
    try {
    let opts = { query: text }
   yts( opts, function ( err, r ) {
	if ( err ) return m.reply(`${err}`);
    let result = r.videos

    //Jika make wa bussines komenin aja dari line sini/12 sampai line 52
    let array = []
    result.forEach(res => {
        array.push({
            title: res.author.name,
            rows: [
                {
                    title: `🎞️ MP4 : ${res.title} ( ${res.timestamp} )`, 
                    rowId: `${usedPrefix}ytmp4 ${res.url}`,
                    description: res.description || 'No desc..'
                },
                {
                    title: `🎶 MP3 : ${res.title} ( ${res.timestamp} )`, 
                    rowId: `${usedPrefix}ytmp3 ${res.url}`,
                    description: res.description || 'No desc..'
                },
                {
                    title: `ℹ️ INFO : ${res.title} ( ${res.timestamp} )`, 
                    rowId: `${usedPrefix}play ${res.url}`,
                    description: res.description || 'No desc..'
                }                
            ]
        })
    })
    let waMessageList = conn.prepareMessageFromContent(m.chat, WAMessageProto.Message.fromObject({
        listMessage: WAMessageProto.ListMessage.fromObject({
          buttonText: 'click here',
          footerText: '*bot whatsapp*',
          description: `*YT - SEARCH*
\`\`\`
Hasil pencarian dari\`\`\` *${text}*
\`\`\`Di temukan (\`\`\` *${result.length}* \`\`\`) video
Klik di bawah dan pilih lalu kirim untuk mengambil media!!
 \`\`\``,
          listType: 1,
          sections: array
        })
      }), { 
            quoted: m
        })
        conn.relayWAMessage(waMessageList, { 
          waitForAck: true 
        })
        // di bawah ini khusus buat yang wa bussines yang ga support sama list message
//         let txt = `─ ─ ─ 「 *YOUTUBE SEARCH* 」 ─ ─ ─

// *Hasil Pencarian :* ${text}
// *Total video yang di temukan :* ${result.length}\n\n`
// let l = 1
// for (let i of result){
// txt += `
// ${l++}. *${i.author.name}* 
// *+ JUDUL :* ${i.title?i.title:'-'}
// *+  ID :* ${i.videoId?i.videoId:'-'}
// *+  UPLOAD :* ${i.ago?i.ago:'-'}
// *+  DITONTON :* ${i.views?i.views:'-'}
// *+  DURATION :* ${i.timestamp?i.timestamp:'-'}
// *+  URL :* ${i.url?i.url:'-'}
// ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━
// `
// }
// m.reply(`${txt}`)


    })
} catch {
    throw `\n\n   *Tidak di temukan!!*   \n\n`
}    
}
handler.tags = ['search']
handler.help = ['yts'].map(kk=>kk+` ${inQuery}`)
handler.command = /^(yts|search|yt|youtube)$/i
module.exports = handler