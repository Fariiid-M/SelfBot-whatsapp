let handler = async (m, { conn, args, participants }) => {
    if (!args[0]) throw `*Masukan kode nomornya yang mau di kick masal hehe..*`
    let ownerGroup = m.chat.split("-")[0] + '@s.whatsapp.net' || groupMetadata.owner
    
    // detect target
    let array = []
    for (let i of participants){
        i.jid.startsWith(parseInt(args[0]?.substring(0, 4))) ? array.push(i.jid) : ''
    }

    //kick target
    for (let user of array){
        if (user?.endsWith('@s.whatsapp.net')){
            let userr = participants.find(u => u.jid == user)
            delay(5000)
            if (user == conn.user.jid) continue
            if (user == m.sender) continue
            if ((userr.isAdmin || userr.isSuperAdmin)) continue
              conn.groupRemove(m.chat, [user])
        } 
    }
}
handler.tags = ['owner']
handler.help = ['kicklist <kode-nomor>']
handler.command = /^(kicklist|listkick)$/i
handler.owner = true
handler.botAdmin = true
module.exports = handler


const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))
