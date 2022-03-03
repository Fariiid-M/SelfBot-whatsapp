let handler = async(m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    m.reply(`─「 *AFK* 」─
    
Name : ${conn.getName(m.sender)} 
${text ? 'Alasan : ' + text : ''}`)
}
handler.command = /^afk$/i

module.exports = handler