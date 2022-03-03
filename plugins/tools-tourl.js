const uploadFile = require('../lib/uploadFile');
const uploadImage = require('../lib/uploadImage');
const uploadMedia = require('../lib/imgbb');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  if (/webp/.test(mime)){
    let metia = await conn.downloadAndSaveMediaMessage(m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m)
    let res = await uploadMedia(metia)
    m.reply(res.url)
  } else {
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`${link}`)
  }
}
handler.help = ['tourl'].map(v => v + ` ${inPlease('Reply Media')}`)
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i

module.exports = handler