let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `Masukan link repo github!\nPenggunaan :  ${usedPrefix+command} _Url Repo_`
    if (!regex.test(args[0])) throw "Link Error!"
    try {
    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    await m.reply(wait)
    conn.sendFile(m.chat, url, filename, null, m)
    } catch {
        throw 'Eror, mungkin repo di private??' 
    }
}
handler.help = ['gitclone'].map(v => v + ' <RepoUrl>')
handler.tags = ['downloader']
handler.command = /gitclone/i

module.exports = handler