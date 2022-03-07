let handler = async (m, { conn, args, command, usedPrefix }) => {

    if (args.length === 0) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
    if (!isUrl(args[0])) throw conto(usedPrefix, command, "Masukan link video instagram!!!","<Link Video Instagram>", "https://www.instagram.com/tv/CXtzJ3bsd8k/?utm_medium=copy_link")
    if (args[0].includes('/stories/')) throw `Maaf kak, belum support ig story hehe`
    try {
    let res = await require('../lib/scraper').igDl(args[0])
    conn.sendFile(m.chat, res.link, 'igdl', `*INSTAGRAM DOWNLOADER*
    
    *Desc* : ${res.desc}
    *Source :* ${res.LinkAwal}
    *Url Download :* ${res.link}
    `, m)
    } catch {
       throw error  
    }
    }
    handler.tags = ['downloader']
    handler.help = ['instagram'].map(v=>v+` ${inUrl}`)
    handler.command = /^(ig|insta|instagram)(dl|down)?$/i
    module.exports = handler
    function isUrl(url){
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    }