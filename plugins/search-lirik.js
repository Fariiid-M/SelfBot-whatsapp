let handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) throw conto(usedPrefix, command, 'Masukan judul lagu!!!', '<TitleSong>', 'mentari')
    try {
    let res = await require('../lib/scraper').lirik(text)
    conn.sendFile(m.chat, res.result.thumb, 'lirik', `*LIRIK LAGU* ( *${text}* )

*Judul :* ${res.result.judul}
*Penyanyi :* ${res.result.penyanyi}

${res.result.lirik}`, m)
    } catch {
        throw `*Error*\nMungkin lagu tidak di temukan..`
    }
    }
    handler.tags = ['search']
    handler.help = ['lirik'].map(t=>t+` ${inQuery}`)
    handler.command = /^(lirik|lyrics)(song|lagu|music)?$/i
    module.exports = handler