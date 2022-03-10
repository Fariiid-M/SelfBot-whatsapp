async function handler(m) {
    if (!m.quoted) throw 'reply pesan!'
    let q = this.serializeM(await m.getQuotedObj())
    if (!q.quoted) throw 'pesan yang anda reply tidak mengandung reply!'
    await q.quoted.copyNForward(m.chat, true)
}
handler.help = ['getquote'].map(pp=>pp+` ${inPlease(' reply pesan ')}`)
handler.tags = ['tools']
handler.command = /^(q|(get|send)quote)$/i
module.exports = handler 
