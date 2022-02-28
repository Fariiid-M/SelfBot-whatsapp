const { searchRepo } = require('../lib/scraper');
let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) throw conto(usedPrefix, command, 'Masukkan apa yang ingin anda cari!!', inQuery, 'bot whatsapp')
 let o = 1
 let ress = await searchRepo(text)
 let teks = `*GITHUB - REPO SEARCH*\n\n*( ${text} ) => ${ress.items.length} repo di temukan!!*\n\n` 
 for (let res of ress.items){
   teks += `*${o++}.*
*+ Nick name :* ${res.nameRepo}
*+ User name :* ${res.fullNameRepo}
*+ Url :* ${res.url_repo}
*+ Desc :* ${res.description}
*+ Git url :* ${res.git_url}
*+ Ssh url :* ${res.ssh_url}
*+ Clone url :* ${res.clone_url}
*+ Svn url :* ${res.svn_url}
*+ Homepage :* ${res.homepage}
*+ Atargazers :* ${res.stargazers}
*+ Watchers :* ${res.watchers}
*+ Forks :* ${res.forks}
*+ Default branch :* ${res.defaultBranch}
*+ Language :* ${res.language}
*+ isPrivate :* ${res.isPrivate}
*+ isFork :* ${res.isFork}
*+ Created At :* ${res.createdAt}
*+ Update At :* ${res.updatedAt}
*+ Pushed At :* ${res.pushedAt}
─────────
`
}
m.reply(teks)
}
handler.tags = ['search']
handler.help = ['githubrepo'].map(b=>b+` ${inQuery}`)
handler.command = /^(github|search|s)repo$/i
module.exports = handler