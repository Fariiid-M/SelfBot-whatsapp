// Masih make wa mot?
// - 
// alergi wa mot


let handler = async (m, { usedPrefix, command, conn, args }) => {
if  (args.length == 0) throw conto(usedPrefix, command, `Kirim perintah ${usedPrefix+command} <nomer> (spasi) <index>\nKirim perintah ${usedPrefix+command} <nomer> (spasi) all (get all story)`, `<nomer> (spasi) <index>`, `${owner[0]} 1`)
    let target;
    let index;
    if (m.quoted){
         target = m.quoted.sender
         index = args[0]
        } else {
            target = parseInt(args[0]) + '@s.whatsapp.net'
            index = args[1]
        }
    let res = await conn.getStories();
     try {
        for (let po of res){
            let no = po.messages[0].participant || po.messages[1].participant

            //detect target
            if (no == target) {

                //get all ?
                if (/all/.test(index)){
                 for (let ko of po.messages){
                    if (!ko.message) continue
                    let _m = conn.serializeM(JSON.parse(JSON.stringify(ko), (_, v) => {
                        if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
                            return Buffer.from(v.data)
                        }
                        return v
                    }))
                    await _m.copyNForward(m.chat, true)
                }
               } else {

                //milih dewe
                if (isNaN(target.split("@")[0])) return m.reply('Nomor salah..')
                if (isNaN(index)) return m.reply('Mau ambil sw yang ke berapa? dimulai dari angka 0..')
                let _m = conn.serializeM(JSON.parse(JSON.stringify(po.messages[parseInt(index)]), (_, v) => {
                        if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
                            return Buffer.from(v.data)
                        }
                        return v
                    }))
                     await _m.copyNForward(m.chat, true).then(pes => conn.reply(m.chat, `Sukses mengambil story @${parseInt(target)}`, pes))
            }
        }
        }
    } catch {
        throw `\n\n   *Tidak di temukan..*   \n\n`
    }
}
handler.tags = ['owner']
handler.help = ['colongsw', 'getsw'].map(k=>k+` <nomor> <index>`)
handler.command = /^((colong|get)(sw|story|status))$/i
handler.owner = true
module.exports = handler