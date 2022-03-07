const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const {
  hostname,
  totalmem,
  freemem,
  platform
} = require('os');
let { 
sizeFormatter 
} = require('human-readable');
const {
  MessageType
} = require('@adiwajshing/baileys');
//anu
let format = sizeFormatter({
std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

let tags = {
  'group': 'GROUP',
  'downloader': 'DOWNLOADER',
  'game': 'FUN',
  'search': 'SEARCHING',
  'tools': 'ALAT',
  'internet': 'INTERNET',
  'info': 'INFORMASI',
  'owner': 'OWNER',
  'database': 'DATABASE'
}

const defaultMenu = {
  before: ` ҈҈     *꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷*
      

      *﹝ʙᴏᴛ ɪɴғᴏ﹞*
*✘⃟💕 Name : %namabot*
*✘⃟💕 Nomor : %nobot*
*✘⃟💕 Prefix : [ multi prefix ]*
*✘⃟💕 Owner : @${owner[0]} ( %oname )*

     *﹝ᴛɪᴍᴇ ɪɴғᴏ﹞*
*✘⃟🗞️ Date : %week %weton, %date*
*✘⃟🗞️ Date - islamic : %dateIslamic*

     *﹝sᴇʀᴠᴇʀ ɪɴғᴏ﹞* 
*✘⃟💻 HostName : ${hostname()}*
*✘⃟💻 Platform : ${platform()}*
*✘⃟💻 Ram : ${format(totalmem() - freemem())} / ${format(totalmem())}*
*✘⃟💻 Runtime : %uptime ( %muptime )*

     *﹝ᴄᴏᴍᴍᴀɴᴅ ɪɴғᴏ﹞* 
*✘⃟🎋 Command total : %totalcmd*
*✘⃟🎋 Command hit : %all*
*✘⃟🎋 Command success : %sall*

%readmore`.trimStart(),
  header: '   〝 *%category* 〞   \n',
  body: '  ✘⃟-͓ͯ҈҈҈҉҉҉҉҈҈҈҈҈҉҉҉҉҈҈҈҉҉҉҈҈҈҉҉҉҈҈҈҈҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҉҈҈҈҈҈҈҈̫̫   *%cmd*',
  footer: '\n',
  after: ``,
}


let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    
//info cmd
let sortedCmd = Object.entries(global.db.data.stats).map(([key, value]) => {
  return { ...value, name: key }
  }).map(toNumber('total')).sort(sort('total'))
  
  let all = 0;
  let sall = 0;
  for (let i of sortedCmd){
  all += i.total
  sall += i.success
  }
    let totalcmd = Object.values(global.plugins).length
    let namabot = conn.user.name
    let oname = await conn.getName(owner[0]+'@s.whatsapp.net')
    let nobot = parseInt(conn.user.jid)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = [
      'Pahing', 
      'Pon', 
      'Wage', 
      'Kliwon', 
      'Legi'
    ][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer 
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      })
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, 
      totalcmd,
      all,
      sall,
      oname,
      nobot,
      namabot,
      name,
      uptime, 
      muptime,
      week,
      weton,
      date,
      dateIslamic,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    //Ngejar keren aja bang hehe, simpelin aja biar makin enteng

    //cecan atututu muahmuah
    let cerray = [
      'https://telegra.ph/file/0101a08ebea0f21cf75c8.jpg',
      'https://telegra.ph/file/eaa2c92aa9ac095592875.jpg',
      'https://telegra.ph/file/1bf1e7b71449bded27ef3.jpg'
    ]

    //get random in medsos
    let linkarray = [ 
      'https://www.youtube.com/watch?v=89XQC7ey8DU',
      'https://www.instagram.com/p/Cast6YYB0Uz/?utm_medium=copy_link',
      'https://m.facebook.com/story.php?story_fbid=109231958249015&id=100074866341717'
    ]

    //mimetype dari dio x koders 
    let marray = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]

      //aestetik tik tik tik slebew 
    let arr = [
      'https://i.ibb.co/X3SQXgy/b6027077e78f18851fea7a70c33328fa.jpg',
      'https://i.ibb.co/bvHQ6GV/b663ba45d12ef45aae78448ac54c9792.jpg',
      'https://i.ibb.co/kc7Hw9c/f1643e5d0e1e596cca7fd4d92a446e7f.jpg',
      'https://i.ibb.co/BtPgLhG/036492dd36f7fc55e1f5ee705a4080e0.jpg'
    ]

    //get buffer
    async function buper(arr){
    return await getBuffer(pRandom(arr))
    }

    //model??
     if (/loc/i.test(conn.menu?.model)) {
         conn.sendButtonLoc(m.chat, pRandom(arr), text, conn.menu?.after || defaultMenu.after || '© 파리드', 'DASHBOARD', _p+'dashboard')
      } else if (/doc/i.test(conn.menu?.model)) {
          conn.sendMessage(m.chat, { 
              "contentText": text, 
              "footerText": conn.menu?.after || defaultMenu.after || '© 파리드', 
              "buttons": [ 
                { 
                  "buttonId" : `${_p}dashboard`, 
                  "buttonText": { 
                    "displayText": "DASHBOARD" 
                    }, 
                    type : "RESPONSE" 
                    }
                    ], 
                    "headerType" : 'DOCUMENT', 
                    "documentMessage": { 
                      url: "https://mmg.whatsapp.net/d/f/Ag9iWM60gulM4kKAyAx2T2C2w_KbS9jGaDt51KNgtvj6.enc", 
                      mimetype: `${pRandom(marray)}`, 
                      title: "MAU AMBIL ? HEHHE KETAHUAN KAN", 
                      fileSha256: "lesrwA4VMSbMObxPeniRbUmg/Yp6ZdlDs66/+1BflVQ=", 
                      fileLength: '88887',
                       pageCount: 08, 
                       mediaKey: "E7znyqCqqn/ihgL5O/OUXywIdIO3+9HfNpkZiJBl8NU=", 
                       fileName: "• 『 S𝖊𝖑𝖋 𝕭𝖔𝖙 』 •", 
                       fileEncSha256: "n+Wfm4YBKgMEYi1BkoueKvPAkRoVoP0xK7GLYVARQGM=", 
                       mediaKeyTimestamp: '1630998696', 
                       jpegThumbnail: await buper(arr),
                    }
                    }, MessageType.buttonsMessage, {
                      sendEphemeral: true,
                      contextInfo: { 
                        "externalAdReply": {
                        "title": "SELF BOT WHATSAPP",
                        "body": "",
                        "mediaType": "2",
                        "thumbnailUrl": "https://telegra.ph/file/d5fc74e55a2efc3cb610b.jpg",
                        "mediaUrl": pRandom(linkarray),
                        "thumbnail": await buper(cerray),
                        "sourceUrl": ""
                        }, mentionedJid: conn.parseMention(text)
                       },
                        quoted: {
                          key: { 
                            participant: '8616710606201@s.whatsapp.net', 
                          },
                          message: { 
                            orderMessage: { 
                              itemCount: 2022,
                              status: 1,
                              surface: 70000,
                              message: 'WANGSAF BOT',
                              orderTitle: ``,
                              sellerJid: '0@s.whatsapp.net',
                              height: '720',
                              width: '720',
                              thumbnail: buper(cerray)
                            }
                          }
                        }
                        })
       } else if (/gif/i.test(conn.menu?.model)) {
         let meqia = await fs.readFileSync('./src/asupan.mp4');
         conn.sendGif(m.chat, meqia, text, m, { contextInfo: { mentionedJid: conn.parseMention(text) }})
       } else {
        conn.sendButtonLoc(m.chat, pRandom(arr), text, conn.menu?.after || defaultMenu.after || '© 파리드', 'DASHBOARD', _p+'dashboard')
       }

   } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['info']
handler.command = /^(menu|help|\?)$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pRandom(items){
  return items[Math.floor(Math.random() * items.length)];
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
      return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

async function getBuffer(url, options) {
  try {
    options ? options : {}
    const res = await require('axios')({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (e) {
    console.log(`Error : ${e}`)
  }
}