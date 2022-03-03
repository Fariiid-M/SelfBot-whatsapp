module.exports = {
    async before(m) {
        if (m.key.formMe) return
        if (!db.data.settings[this.user.jid].antiviewonce) return
        let q = m.quoted ? m.quoted : m
        if (q.mtype == 'viewOnceMessage') {
            await this.sendButton(owner[0]+'@s.whatsapp.net', `Terdeteksi @${m.sender.split`@`[0]} telah mengirim pesan ViewOnce..`.trim(), '', 'Matikan', '.vo on', m)
           this.copyNForward(owner[0]+'@s.whatsapp.net', await this.loadMessage(m.chat, q.id), false, { readViewOnce: true })
        }
    }
}