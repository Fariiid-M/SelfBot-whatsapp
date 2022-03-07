let linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
  let [, code] = text.match(linkRegex) || []
  if (!code) throw 'Link invalid'
  let res = await conn.query({
    json: ["query", "invite", code],
    expect200: true
  })
  if (!res) throw res
  console.log(res)
  let caption = `*GROUP LINK INSPECTOR*

*Nama Grup :* ${res.subject}
- Terakhir di ubah oleh *@${res.subjectOwner.replace("@c.us","")}*
- Di ubah pada :
     - Tanggal : *${formatDate(res.subjectTime * 1000)}*
     - Jam     : *${formatTime(res.subjectTime * 1000).split(' ')[1]}*

*ID :* ${res.id}
*Di Buat Oleh :* @${parseInt(res.owner)}
*Di Buat pada :
    - Tanggal : *${formatDate(res.creation * 1000)}*
    - Jam     : *${formatTime(res.creation * 1000).split(' ')[1]}*

┌┈
├ *Edit info grup :* ${res.restrict?`Hanya admin`:`Semua peserta`}
├ *Kirim pesan :* ${res.announce?`Hanya admin`:`Semua peserta`}
├ *Pesan sementara :* ${res.ephemeralDuration?`Aktif`:`mati`}
│
├ *Jumlah Member :* ${res.size}
├ *Member Yang Diketahui :* ${res.participants ? '\n├ ' + res.participants.map((user, i) => ++i + ' @' + user.id.split`@`[0]).join('\n├ ').trim() : ' Tidak ada'}
└┈

*Deskripsi :*
${res.desc ? `${res.desc}` : 'Tidak Ada'}

- Terakhir di ubah oleh *@${res.descOwner.replace("@c.us","")}*
- Di ubah pada :
     - Tanggal : *${formatDate(res.descTime * 1000)}*
     - Jam     : *${formatTime(res.descTime * 1000).split(' ')[1]}*`.trim()

  let pp;
  try{
      pp = await conn.getProfilePicture(res.id)
  } catch {
      pp = 'https://raw.githubusercontent.com/dngda/bot-whatsapp/main/src/png/group.png'
  }
  try {
  conn.sendFile(m.chat, pp, 'pp.jpg',caption, m, null, {
        contextInfo: {
          mentionedJid: conn.parseMention(caption)
        }
  })
  } catch {
  m.reply(caption, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(caption)
    }
  })
}
}
handler.help = ['inspect']
handler.tags = ['tools']

handler.command = /^(inspect(link)?)$/i

module.exports = handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatTime(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }