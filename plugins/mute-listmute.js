let handler = async (m, { conn }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isMute)
    m.reply(`
╭─「 Daftar Mute Chat 」
│ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown.' : conn.getName(jid)}
│ ${jid}
`.trim()).join('\n') : ''}
╰────`.trim())
}
handler.help = ['mutelist']
handler.tags = ['info']
handler.command = /^(listmute|mutelist)$/i

module.exports = handler