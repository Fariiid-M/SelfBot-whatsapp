let handler = async (m, { conn, usedPrefix }) => {
    let res = await conn.getStories();
     let ress = await res.map(({count, messages}, i) => `
*Index :* ${i}
*Name :* @${messages[1]?.participant ? messages[1]?.participant.replace("@s.whatsapp.net", "") : messages[0]?.participant.replace("@s.whatsapp.net", "")}
*Nomor :* ${messages[1]?.participant  ? parseInt(messages[1]?.participant) : parseInt(messages[0]?.participant)}
*Total :* ${count}
`).join`\n`
     m.reply(`*List Story*

${ress}

*Ambil : ${usedPrefix}getsw <nomor> <index>*`)
}
handler.tags = ['owner']
handler.help = ['listsw']
handler.command = /^(list(sw|story|status))$/i
handler.owner = true
module.exports = handler