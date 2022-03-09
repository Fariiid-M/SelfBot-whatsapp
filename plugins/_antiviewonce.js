module.exports = {
    async before(m) {
        if (m.key.formMe) return
        if (!db.data.chats[m.chat].antiviewonce) return
        let q = m.quoted ? m.quoted : m
        if (q.mtype == 'viewOnceMessage') {
            await this.sendButton(m.chat, `Terdeteksi @${m.sender.split`@`[0]} telah mengirim pesan ViewOnce..`.trim(), '', 'Matikan', '.antiviewonce off', m)
           this.copyNForward(m.chat, await this.loadMessage(m.chat, q.id), false, { readViewOnce: true })
        }
    }
}