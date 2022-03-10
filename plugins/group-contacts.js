let handler = async (m, { conn, command }) => {
    let { participants, subject } = await conn.groupMetadata(m.chat)
    let pp = []
    if (command == 'member'){
    for (let {jid, name, vname, notify} of participants.filter(l=> l.jid != conn.user.jid)){
pp.push({
displayName: name||vname||notify,
vcard: `BEGIN:VCARD
VERSION:3.0
N:;${name||vname||notify};;;
FN:${name||vname||notify}
item1.TEL;waid=${parseInt(jid)}:+${parseInt(jid)}
item1.X-ABLabel:Ponsel
item2.URL: https://wa.me/${parseInt(jid)}
item2.X-ABLabel: Situs Web
item3.X-ABLabel: - ${subject} -
END:VCARD`
})
}
}
if (command === 'admin'){
        for (let {jid, name, vname, notify} of participants.filter(l=> l.isAdmin && l.jid != conn.user.jid )){
pp.push({
displayName: name||vname||notify,
vcard: `BEGIN:VCARD
VERSION:3.0
N:;${name||vname||notify};;;
FN:${name||vname||notify}
item1.TEL;waid=${parseInt(jid)}:+${parseInt(jid)}
item1.X-ABLabel:Ponsel
item2.URL: https://wa.me/${parseInt(jid)}
item2.X-ABLabel: Situs Web
item3.X-ABLabel: - ${subject} -
END:VCARD`
    })
    } 
}
 conn.sendMessage(m.chat, { contacts: pp }, 'contactsArrayMessage', { quoted: m })
}
handler.tags = ['group']
handler.help = ['member', 'admin']
handler.command = /^(admin|member)$/i
module.exports = handler
