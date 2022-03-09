let handler = async (m, { usedPrefix, command, conn, args }) => {
    let isEnable = /aktif|true|enable|(turn)?on|1/i.test(args[0]?.toLowerCase())
    let chat = db.data.chats[m.chat]
    let setting = db.data.settings[conn.user.jid]
    if (args.length == 0) return conn.send2Button(m.chat, "Mau di aktifkan atau di matikan? pilih di bawah!", "", "On", `${usedPrefix+command} on`, "Off", `${usedPrefix+command} off`)
    //anti view once
    if (/antiviewonce/.test(command)){
        chat.antiviewonce = isEnable;
            m.reply(`*ANTI VIEW-ONCE* ( ${isEnable?'Di Aktifkan':'Di Matikan'} )`)
    //anti delete
    } else if (/antidelete/.test(command)){
           chst.antidelete = isEnable;
            m.reply(`*ANTI DELETE* ( ${isEnable?'Di Aktifkan':'Di Matikan'} )`)  
    //anti call
    } else if (/anticall/.test(command)){
          setting.anticall = isEnable;
            m.reply(`*ANTI CALL* ( ${isEnable?'Di Aktifkan':'Di Matikan'} )`) 
    //auto read
    } else if (/autoread/.test(command)){
           setting.autoread = isEnable;
            m.reply(`*AUTO READ* ( ${isEnable?'Di Aktifkan':'Di Matikan'} )`)                
        //welcome
    } else if (/welcome/.test(command)){
            chat.welcome = isEnable;
            m.reply(`*WELCOME* ( ${isEnable?'Di Aktifkan':'Di Matikan'} )`)                
    }
}

handler.tags = ['owner']
handler.help = ['anticall', 'autoread', 'welcome', 'antiviewonce', 'antidelete'].map(pp=>pp+` ${inOption('on/off')}`)
handler.command = /(anti(call|viewonce|delete)|autoread|welcome)$/i
handler.owner = true
module.exports = handler