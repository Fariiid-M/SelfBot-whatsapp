const { igStalk } = require('../lib/scraper');
let handler = async (m, { conn, text }) => {
    if (!text) throw `kontl`
    let res = await igStalk(text.replace("@", ""))
    console.log(res)
    let tehs = `*INSTAGRAM STALK*

- *User Name :* ${res.fullName}
- *Nick Name :* ${res.username}
- *Id :* ${res.id}
- *Followers :* ${res.followers}
- *Following :* ${res.following}
- *Vrified :* ${res.isVerified?'Yes':'No'}
- *Private :* ${res.isPrivate?'Yes':'No'}
- *Recent User :* ${res.isRecentUser?'Yes':'No'}
- *Bussines Account :* ${res.isBusinessAccount?'Yes':'No'}
- *Posts Count :* ${res.postsCount}
- *Highlight Count :* ${res.highlightCount}
- *Bio :* 
${res.bio}

- *Profile Url :* ${res.profilePicHD}`
conn.sendFile(m.chat, res.profilePicHD, 'IG-STALK.error', tehs, m)
}
handler.tags = ['internet']
handler.help = ['igstalk'].map(v => v + ` <username>`)
handler.command = /^(igstalk|stalkig)/i
module.exports = handler