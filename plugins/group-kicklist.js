let handler = async (m, { conn, args, participants }) => {
    if (!args[0]) throw `*Masukan kode nomornya yang mau di kick masal hehe..*`
    let nom = parseInt(args[0]?.substring(0, 4));
    // detect target
    let member = participants.filter(({jid}) => jid.startsWith(nom));
    
    await conn.reply(m.chat, `*${nom}*\n\n@${member.map(({jid, isAdmin, isSuperAdmin}) => jid.reolace(/[^0-9]/g, '') + isSuperAdmin ? '(Owner Group)' : isAdmin ? '(Admin Group)' : '')}`, m, { contextInfo: { mentionedJid: member.map(({jid}) => jid)}})
    
   //kick target
    for (let user of member){
        if (user.jid?.endsWith('@s.whatsapp.net')){
            delay(5000)
            if (user.jid == conn.user.jid) continue
            if (user.jid == m.sender) continue
            if ((user.isAdmin || user.isSuperAdmin)) continue
              conn.groupRemove(m.chat, [user.jid])
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
