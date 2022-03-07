let handler = async (m, { conn, command, text }) => {
    let type = command.replace(/^set(menu|help|\?)/, '').toLowerCase()
    if (type == 'model') {
        conn.menu = typeof conn.menu == 'object' ? conn.menu : {}
        let modelnya = 'loc';
        if (/(butt?)?loc(ation)?|(butt?)?lok(asi)?/i.test(text.toLowerCase())) modelnya = 'loc'
        if (/(butt?)?do(k\c)(ument?)?/i.test(text.toLowerCase())) modelnya = 'doc'
        if (/gif/i.test(text.toLowerCase())) modelnya = 'gif'
        if (text){
        conn.menu.model = modelnya
        m.reply('Sukses mengubah ke model *'+conn.menu?.model+'*')
    } else {
        conn.menu.model = 'loc'
        m.reply('Sukses reset ke tampilan button location..')
    }
    }
    if (type == '') {
      if (text) {
        conn.menu = text
        conn.reply(m.chat, 'Menu berhasil diatur\n' + info, m)
      } else {
        conn.menu = {}
        conn.reply(m.chat, 'Menu direset', m)
      }
    } else {
      conn.menu = typeof conn.menu == 'object' ? conn.menu : {}
      if (text) {
        conn.menu[type] = text
        conn.reply(m.chat, 'Menu ' + type + ' berhasil diatur\n' + info, m)
      } else {
        delete conn.menu[type]
        conn.reply(m.chat, 'Menu ' + type + ' direset', m)
      }
    }
  }
  handler.help = ['', 'before', 'header', 'body', 'footer', 'after', 'model'].map(v => 'setmenu' + v + ' <teks>')
  handler.tags = ['owner']
  handler.command = /^set(menu|help|\?)(before|header|body|footer|after|model)?$/i
  handler.owner = true
  module.exports = handler
  
  let info = `
  Universal:
  %% (%)
  %p (Prefix)
  %totalcmd (total commmand)
  %all (hit all command)
  %sall (sukses hit all command)
  %oname (Nama owner)
  %nobot (nomer bot)
  %namabot (nama bot)
  %weton (Weton Hari ini)
  %week (Hari)
  %date (Tanggal)
  %dateIslamic (Tanggal islam)
  %uptime (Uptime Bot)
  %readmore (pesan baca selengkapnya)
  
  Bagian Menu Header & Footer:
  %category (Kategori)
  
  Bagian Menu Body:
  %cmd (Command)

  Bagian model menu:
  [ location / document / gif ]
  `.trim()