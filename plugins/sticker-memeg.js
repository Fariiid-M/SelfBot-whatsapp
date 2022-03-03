const uploadImage = require('../lib/imgbb');
let handler = async (m, { conn, text, usedPrefix, command }) => {
 let [atas, bawah] = text.split`|`
 let q = m.quoted ? m.quoted : m
 let mime = (q.msg || q).mimetype || ''
 if (!mime) throw conto(usedPrefix, command, `Perintah ini untuk menambahkan teks di gambar.\nNote : \n- Jika anda ingin menambahkan teks atasnya saja ( ${usedPrefix+command} <teks> )\n- Jika anda ingin menambahkan teks bawahnya saja ( ${usedPrefix+command} | <teks> )\n- kirirm perintah dengan membalas atau mengirim gambar`, `<teksAtas>|<teksBawah> + ( balas/kirim gmbar )`,`Hai|ayang`)
 if (!/video|image\/(jpe?g|png|webp)/.test(mime)) throw `Media tipe ${mime} tidak didukung!\nKhusus gambar atau sticker!!`
 let metia = await conn.downloadAndSaveMediaMessage(m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m)
 let url = await uploadImage(metia)
 let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas || '-')}/${encodeURIComponent(bawah || '-')}.png?background=${url.url}`
     if (/image/.test(mime)) conn.sendImageAsSticker(m.chat, meme, m, { packname: packname, author: author})
     if (/video/.test(mime)) conn.sendVideoAsSticker(m.chat, meme, m, { packname: packname, author: author})
}
handler.help = ['stikermeme'].map(v=>v+` ${inTeks+'|'+inTeks+' +'+inPlease(' Reply/send media ')}`)
handler.tags = ['tools']
handler.command = /^(s(ticker|tiker)?(meme|mim))$/i

module.exports = handler