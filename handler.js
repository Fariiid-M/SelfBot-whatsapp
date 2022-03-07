const util = require('util');
const simple = require('./lib/simple');
const { Goodbye3, Welcome3 } = require('knights-canvas');
const { MessageType } = require('@adiwajshing/baileys');

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
  async handler(chatUpdate) {
    // console.log(chatUpdate)
    if (!chatUpdate.hasNewMessage) return
    if (!chatUpdate.messages && !chatUpdate.count) return
    let m = chatUpdate.messages.all()[0]
    try {
      simple.smsg(this, m)
      switch (m.mtype) {
        case MessageType.image:
        case MessageType.video:
        case MessageType.audio:
          if (!m.key.fromMe) await delay(1000)
          if (!m.msg.url) await this.updateMediaMessage(m)
          break
      }
      try {
        let user = global.db.data.users[m.sender]
        if (typeof user !== 'object') global.db.data.users[m.sender] = {}
        if (user) {
          if (!isNumber(user.afk)) user.afk = -1
          if (!('afkReason' in user)) user.afkReason = ''
        } else global.db.data.users[m.sender] = {
          name: this.getName(m.sender),
          afk: -1,
          afkReason: ''
        }

        let chat = global.db.data.chats[m.chat]
        if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
        if (chat) {
          if (!('isMute' in chat)) chat.isMute = false
          if (!('welcome' in chat)) chat.welcome = false
          if (!('sWelcome' in chat)) chat.sWelcome = ''
          if (!('sBye' in chat)) chat.sBye = ''
        } else global.db.data.chats[m.chat] = {
          isMute: false,
          welcome: false,
          sWelcome: '',
          sBye: ''
        }

        var setting = global.db.data.settings[this.user.jid]
        if (typeof setting !== 'object') global.db.data.settings[this.user.jid] = {}
        if (setting) {
          if (!('anticall' in setting)) setting.anticall = false
          if (!('antiviewonce' in setting)) setting.antiviewonce = true
          if (!('antidelete' in setting)) setting.antidelete = true
          if (!('autoread' in setting)) setting.autoread = false
          if (!('self' in setting)) setting.self = true
        } else global.db.data.settings[this.user.jid] = {
          anticall: false,
          autoread: false,
          self: true,
          antiviewonce: true,
          antidelete: true,
        }
      } catch (e) {
        console.error(e)
      }
      if (!m.fromMe && setting.self) return
      if (typeof m.text !== 'string') m.text = ''
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!plugin.all) continue
        if (typeof plugin.all !== 'function') continue
        try {
          await plugin.all.call(this, m, chatUpdate)
        } catch (e) {
          if (typeof e === 'string') continue
          console.error(e)
        }
      }
      if (m.isBaileys) return
      let usedPrefix
      let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

      let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isOwner = isROwner || m.fromMe
      let groupMetadata = m.isGroup ? this.chats.get(m.chat).metadata || await this.groupMetadata(m.chat) : {} || {}
      let participants = m.isGroup ? groupMetadata.participants : [] || []
      let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
      let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
      let isAdmin = user?.isAdmin || user?.isSuperAdmin || false // Is User Admin?
      let isBotAdmin = bot?.isAdmin || bot?.isSuperAdmin || false // Are you Admin?
      let isBlocked = this.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid).includes(m.sender) // Is User Blocked?
      
      if (db.data.settings[this.user.jid].self && !m.fromMe) return //Self Bot??
      
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isOwner,
          isAdmin,
          isBotAdmin,
          chatUpdate,
          isBlocked,
        })) continue
        if (typeof plugin !== 'function') continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
            let chat = global.db.data.chats[m.chat]
            if (!['mute-set.js', 'group-info.js'].includes(name) && chat && chat.isMute && !isOwner) return // Except this
           }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin && !isOwner) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }

          m.isCommand = true
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isOwner,
            isAdmin,
            isBotAdmin,
            chatUpdate,
            isBlocked
          }
          try {
            await plugin.call(this, m, extra)
          } catch (e) {
            // Error occured
            m.error = e
            console.error(e)
            if (e) {
              let text = util.format(e.message ? e.message : e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), '#apikey#')
              m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
         }
          break
        }
      }
    } finally {
      //console.log(global.db.data.users[m.sender])
      let user, stats = global.db.data.stats
      if (m) {
     
        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (m.error == null) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }

      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
      if (setting.autoread) this.chatRead(m.chat).catch(() => { })
    }
  },
  async participantsUpdate({ jid, participants, action }) {
    let chat = global.db.data.chats[jid] || {}
    let tehs = ''
    switch (action) {
      case 'add':
      case 'remove':
        if (chat.welcome) {
          
          //GroupMetadata
          let groupMetadata = await this.groupMetadata(jid)
          for (let user of participants) {

            //Profile user
            let pp
            try {
            pp = await this.getProfilePicture(user)
           } catch {
           pp = "https://telegra.ph/file/12e0ed1cff84f2a5aed91.png"
           }

           //Teks Welcome
           tehs = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Selamat datang @user 👋').replace('@subject', groupMetadata.subject).replace('@desc', groupMetadata.desc ? groupMetadata.desc : '' ) : 
          (chat.sBye || this.bye || conn.bye || 'Selamat tinggal @user!')).replace(/@user/g, '@' + user.split`@`[0]).replace(/#readmore/g, String.fromCharCode(8206).repeat(4001))
                   
        let wel = await new Welcome3()
                  .setAvatar(pp)
                  .setUsername(parseInt(user))
                  .toAttachment();
        let bye = await new Goodbye3()
                  .setAvatar(pp)
                  .setUsername(parseInt(user))
                  .toAttachment();

                  this.sendMessage(jid, {
                    locationMessage: { 
                      jpegThumbnail: action === 'add' ? wel.toBuffer() : bye.toBuffer() 
                    },
                    contentText: tehs,
                    footerText: '',
                    buttons: [{ 
                      buttonId: `.infogc`, 
                      buttonText: { 
                        displayText: '𝖎𝖓𝖋𝖔 𝖌𝖗𝖔𝖚𝖕 🪶' 
                      }, 
                      type: 1 
                    }],
                    headerType: 6
                  }, MessageType.buttonsMessage, { 
                    contextInfo: { 
                      mentionedJid: this.parseMention(tehs) 
                    }})
          }
        }
        break;
      }
  },
  async delete(m) {
    if (m.key.fromMe) return
    if (!db.data.settings[this.user.jid].antidelete) return
    await this.sendButton(owner[0]+'@s.whatsapp.net', `
Terdeteksi @${m.participant.split`@`[0]} *( ${m.key.remoteJid.endsWith('@g.us') ? 'Group '+this.getName(m.key.remoteJid) : m.key.remoteJid == 'status@broadcast' ? 'Story WhatsApp' : this.getName(m.key.remoteJid)} )* telah menghapus pesan...`.trim(), '', 'Matikan', '.antidelete off', m.message)
    this.copyNForward(owner[0]+'@s.whatsapp.net', m.message).catch(e => console.log(e, m))
  },
  async onCall(json) {
    if (!db.data.settings[this.user.jid].anticall) return
    let jid = json[2][0][1]['from']
    let isOffer = json[2][0][2][0][0] == 'offer'
    if (jid && isOffer) {
      const tag = this.generateMessageTag()
      const nodePayload = ['action', 'call', ['call', {
        'from': this.user.jid,
        'to': `${jid.split`@`[0]}@s.whatsapp.net`,
        'id': tag
      }, [['reject', {
        'call-id': json[2][0][2][0][1]['call-id'],
        'call-creator': `${jid.split`@`[0]}@s.whatsapp.net`,
        'count': '0'
      }, null]]]]
      await this.sendJSON(nodePayload, tag)
      this.reply(jid.split`@`[0]+'@s.whatsapp.net', 'Dimohon untuk tidak menelpon...')
      .then(()=>{
        this.blockUser(jid, "add")
      })
    }
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    owner: 'Perintah ini hanya dapat digunakan oleh _*Owner Bot*_!',
    group: 'Perintah ini hanya dapat digunakan di grup!',
    private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
    admin: 'Perintah ini hanya untuk *Admin* grup!',
    botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan perintah ini!',
   }[type]
  if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
