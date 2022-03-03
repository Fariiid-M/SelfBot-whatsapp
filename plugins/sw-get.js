let handler = async (m, { conn, text }) => {
    let [i1, i2] = text.split`|`
    if (isNaN(i1) && isNaN(i2)) throw `Itu bukan nomer..`
    let res = await conn.getStories();
    try {
    let _m = conn.serializeM(JSON.parse(JSON.stringify(res[parseInt(i1)].messages[parseInt(i2)]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    await _m.copyNForward(m.chat, true).then(_ => conn.reply(m.chat, `Sukses mengambil story dari @${parseInt(res[parseInt(i1)].messages[parseInt(i2)].participant)}`, _))
} catch {
    throw `tidak di temukan..`
}
}
handler.tags = ['owner']
handler.help = ['colongsw'].map(k=>k+` <index>|<index>`)
handler.command = /^((colong|get)(sw|story|status))$/i
handler.owner = true
module.exports = handler