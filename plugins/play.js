let handler = async (m, { conn, command, text, usedPrefix }) => {
 if (!text) throw `Masukan judul/link video youtube!\n\nPenggunaan : ${usedPrefix + command} judul/link video\nContoh : ${usedPrefix + command} video 1 detik`
 try {
 let res = await conn.fetchJson(global.API('anto', '/api/yt/search', { query: text }, 'apikey'))
 var anu = `YT PLAY

👤 *${res.result[0].author.name}*
 ♪ *Judul :* ${res.result[0].title}
 ♪ *Durasi :* ${res.result[0].timestamp}
 ♪ *Di Upload Pada :* ${res.result[0].ago}
 ♪ *Penonton :* ${toCommas(res.result[0].views)}
 ♪ *Deskripsi :* ${res.result[0].description}`
 conn.send2ButtonLoc(m.chat, 
    res.result[0].thumbnail, 
    anu, 
    "Pilih Tipe Media Dibawah", 
    "Video", 
    `${usedPrefix}ytmp4 ${res.result[0].url}`, 
    "Audio", 
    `${usedPrefix}ytmp3 ${res.result[0].url}`, 
    m
    )
 } catch {
	 throw `Tidak di temukan!!`
 }
}
handler.help = ['play'].map(v => v + ` ${inQuery}`)
handler.tags = ['downloader']
handler.command = /^(p|play)$/i


module.exports = handler

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
 while (pattern.test(x))
	 x = x.replace(pattern, "$1,$2");
	return x;
}