let fs = require('fs');
let chalk = require('chalk');

//Nomer Owner
global.owner = ['6285890441472'] // Put your number here

// Petunjuk Di Menu
global.inUrl = '<link>'
global.inReason = '<alasan>'
global.inTeks = '<teks>'
global.inQuery = '<pencarian>'
global.inOption = o => '['+o+']'
global.inUser = '@user'
global.inQuestion = '<soal>'
global.inPlease = o => '('+o+')'
global.SymbolMeaning = `*Symbol meaning :*
- *Bantuan perintah ( -help )*
- *Harus di isi* ( < > ) 
 isi sesuai options tanpa symbol <>
- *Pembatas* ( | atau (spasi) )
- *Pilihan* ( [ ] )
 isi sesuai options tanpa symbol []
- *Tag User/member* ( @user )
- *Hal yang harus di lakukan* ( ( ) )`



// Sticker WM

const spack = fs.readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = `𝙵ͥ͢𝚊ͣ𝚛ͫ𝚒͓͒𝚒𝙳͓ͯ - 💓

❑ ιηѕтαgяαм : @faridmhrdkaa
❑ gιтнυв : @Fariiid-M
❑ ωнαтѕαρρ : 6285890441472\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`
  var sticker_author = ``
} else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}

const file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

global.packname = sticker_name
global.author = sticker_author

global.wait = '\n\n _*Wait a minute...*_\n\n'
global.eror = '\n\n _*Error!*_\n\n'
global.erorlink = '\n\n _*Invalid Link!!*_ \n\n'

//Maalaas nulish manual? 
global.conto = (usedPrefix, command, teks, anu, cth) => {
return `${teks}

Penggunaan : ${usedPrefix+command} ${anu}
Contoh : ${usedPrefix+command} ${cth}`
}

global.APIeror = (api) => {
return `Server *${global.APIs[api]}* error, Silahkan coba lagi nanti!`
}

global.key_imgbb = 'b2fe9aa717edd064de6c76a1f400dbec' //get free in imgbb.com

// Url
global.APIs = {
 xcoders: 'https://api-xcoders.xyz'
}

// api
global.APIKeys = {
 'https://api-xcoders.xyz': 'frhn'
}

global.kodeBahasa = `╭─[ *code > country* ]
│
│ *af* > Afrikaans
│ *sq* > Albanian
│ *am* > Amharic
│ *ar* > Arabic
│ *hy* > Armenian
│ *az* > Azerbaijani
│ *eu* > Basque
│ *be* > Belarusian
│ *bn* > Bengali
│ *bs* > Bosnian
│ *bg* > Bulgarian
│ *ca* > Catalan
│ *ceb* > Cebuano
│ *ny* > Chichewa
│ *co* > Corsican
│ *hr* > Croatian
│ *cs* > Czech
│ *da* > Danish
│ *nl* > Dutch
│ *en* > English
│ *eo* > Esperanto
│ *et* > Estonian
│ *tl* > Filipino
│ *fi* > Finnish
│ *fr* > French
│ *fy* > Frisian
│ *gl* > Galician
│ *ka* > Georgian
│ *de* > German
│ *el* > Greek
│ *gu* > Gujarati
│ *ht* > Haitian Creole
│ *ha* > Hausa
│ *haw* > Hawaiian
│ *he* > Hebrew
│ *iw* > Hebrew
│ *hi* > Hindi
│ *hmn* > Hmong
│ *hu* > Hungarian
│ *is* > Icelandic
│ *ig* > Igbo
│ *id* > Indonesian
│ *ga* > Irish
│ *it* > Italian
│ *ja* > Japanese
│ *jw* > Javanese
│ *kn* > Kannada
│ *kk* > Kazakh
│ *km* > Khmer
│ *ko* > Korean
│ *ku* > Kurdish (Kurmanji)
│ *ky* > Kyrgyz
│ *lo* > Lao
│ *la* > Latin
│ *lv* > Latvian
│ *lt* > Lithuanian
│ *lb* > Luxembourgish
│ *mk* > Macedonian
│ *mg* > Malagasy
│ *ms* > Malay
│ *ml* > Malayalam
│ *mt* > Maltese
│ *mi* > Maori
│ *mr* > Marathi
│ *mn* > Mongolian
│ *my* > Myanmar (Burmese)
│ *ne* > Nepali
│ *no* > Norwegian
│ *ps* > Pashto
│ *fa* > Persian
│ *pl* > Polish
│ *pt* > Portuguese
│ *pa* > Punjabi
│ *ro* > Romanian
│ *ru* > Russian
│ *sm* > Samoan
│ *gd* > Scots Gaelic
│ *sr* > Serbian
│ *st* > Sesotho
│ *sn* > Shona
│ *sd* > Sindhi
│ *si* > Sinhala
│ *sk* > Slovak
│ *sl* > Slovenian
│ *so* > Somali
│ *es* > Spanish
│ *su* > Sundanese
│ *sw* > Swahili
│ *sv* > Swedish
│ *tg* > Tajik
│ *ta* > Tamil
│ *te* > Telugu
│ *th* > Thai
│ *tr* > Turkish
│ *uk* > Ukrainian
│ *ur* > Urdu
│ *uz* > Uzbek
│ *vi* > Vietnamese
│ *cy* > Welsh
│ *xh* > Xhosa
│ *yi* > Yiddish
│ *yo* > Yoruba
│ *zu* > Zulu
╰─┈`
let file = require.resolve(__filename)
fs.watchFile(file, () => {
 fs.unwatchFile(file)
 console.log(chalk.redBright("Update 'config.js'"))
 delete require.cache[file]
 require(file)
})
