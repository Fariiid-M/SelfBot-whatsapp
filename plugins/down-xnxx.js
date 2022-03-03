const { xnxxdl } = require('../lib/scraper');
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length < 1) throw `Masukan link video xnxx!!\n\nPenggunaan ${usedPrefix+command} _Link_`
    if (!isUrl(args[0])) throw `Masukan link video xnxx!!\n\nPenggunaan ${usedPrefix+command} _Link_`
    let res = await xnxxdl(args[0])
    reply(wait)
    try {
        await conn.sendFile(m.chat, res.result.files.HLS, 'ERROR-WKWK', `*${res.result.title}* ( ${res.result.info.replace(/\n/g, "")} )`)
    } catch{
        await conn.sendFile(m.chat, res.result.files.high, 'ERROR-WKWK', `*${res.result.title}* ( ${res.result.info.replace(/\n/g, "")} )`)
    }
}
handler.tags = ['downloader']
handler.help = ['xnxxdl'].map(k=>k+` ${inUrl}`)
handler.command = /^(xnxx(dl)?)$/i
module.exports = handler



function isUrl(url){
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}