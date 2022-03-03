let handler = async (m, { args, participants }) => {
    
    // detect target
    let array = []
    for (let i of participants){
        i.jid.startsWith(parseInt(args[0]?.substring(0, 4))) ? array.push(i.jid) : ''
    }
    m.reply(`*LIST NOMOR ( ${parseInt(args[0]?.substring(0, 4))} )*\n\n`+array.map(p=>`- @${p.split("@")[0]}`).join`\n`)
}
handler.tags = ['group']
handler.help = ['listno <kode-negara>']
handler.command = /^(listno)$/i
handler.group = true
handler.admin = true
module.exports = handler
