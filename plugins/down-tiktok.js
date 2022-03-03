const { MessageType } = require('@adiwajshing/baileys');
const { downloader } = require('../lib/scraper');
const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (args.length < 1) throw `Masukan link video tiktok!!\n\nPenggunaan ${usedPrefix+command} _Link-TikTok_`
 if (!isUrl(args[0])) throw `Masukan link video tiktok!!\n\nPenggunaan ${usedPrefix+command} _Link-TikTok_`
 let res = await downloader(args[0])
 if (/mp3|audio|music/.test(command)){
    conn.sendFile(m.chat, res.medias[2].url, `${res.title}.mp3`, ``, m, false, { mimetype: 'doc/mp3' })
 } else {
 try {
 conn.sendFile(m.chat, res.medias[1].url, `tiktod.mp4`, `*Tiktok Downloader*

♪ *Capt :* ${res.title}
♪ *Url :* ${res.url}
♪ *Kualitas :* ${res.medias[1].quality}
♪ *Ukuran :* ${res.medias[1].formattedSize}`, m)
} catch {
    let res = await titidDown(args[0])
    conn.sendFile(m.chat, res.result.nowm, 'tiktok', '', m)
    }
 }
}
handler.tags = ['downloader']
handler.help = ['mp4', 'nowm', 'mp3'].map(v=>'tiktok'+v+` ${inUrl}`)
handler.command = /^(tt|tiktok)(dl|nowm|mp4|mp3|audio|music)?$/i
module.exports = handler

function titidDown(Url) {
		return new Promise (async (resolve, reject) => {
		await axios.request({
			url: "https://ttdownloader.com/",
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const token = $('#token').attr('value')
			axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
				headers: {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
					"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
				}
			}).then(res => {
				const ch = cheerio.load(res.data)
				const result = {
					status: res.status,
					result: {
						wm: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
						nowm: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href')
						}
				}
				resolve(result)
			}).catch(reject)
		}).catch(reject)
	})

}

function isUrl(url){
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}