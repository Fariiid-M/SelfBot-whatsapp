const {
   instagramdl,
   instagramdlv2,
   instagramdlv3,
   instagramdlv4
 } = require('@bochilteam/scraper');
 
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length === 0) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
    if (!isUrl(args[0])) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
    if (!/(https?\:\/\/)?(www\.)?instagram\.com\/(reel|p|s)/i.test(args[0])) throw `Invalid link!`
    const results = await instagramdl(args[0]?.replace(/[><]/g, ''))
        .catch(async _ => await instagramdlv2(args[0]?.replace(/[><]/g, '' ``)))
        .catch(async _ => await instagramdlv3(args[0]?.replace(/[><]/g, '')))
        .catch(async _ => await instagramdlv4(args[0]?.replace(/[><]/g, '')))
    
    for (let { url } of results) conn.sendFile(m.chat, url, 'instagram', `🔗 *Url :* ${url}`, m, false).catch(_ => _)
    
}
handler.help = ['instagram'].map(v=> v + ` ${inUrl}`)
handler.command = /^(ig|insta|instagram)(dl|down)?$/i

module.exports = handler


function isUrl(url){
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}




// let handler = async (m, { conn, args, command, usedPrefix }) => {

//     if (args.length === 0) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
//     if (!isUrl(args[0])) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
//     if (args[0].includes('/stories/')) throw `Maaf kak, belum support ig story hehe`
//     try {
//     let res = await require('../lib/scraper').igDl(args[0])
//     conn.sendFile(m.chat, res.link, 'igdl', `*INSTAGRAM DOWNLOADER*
    
//     *Desc* : ${res.desc}
//     *Source :* ${res.LinkAwal}
//     *Url Download :* ${res.link}
//     `, m)
//     } catch {
//        throw eror  
//     }
//     }
//     handler.tags = ['downloader']
//     handler.help = ['instagram'].map(v=>v+` ${inUrl}`)
//     handler.command = /^(ig|insta|instagram)(dl|down)?$/i
//     module.exports = handler
//     function isUrl(url){
//         return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
//     }
