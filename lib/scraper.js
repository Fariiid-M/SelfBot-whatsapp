

const cheerio = require('cheerio')
const axios = require('axios')
const request = require('request')
const fetch = require('node-fetch')
const qs = require("qs")


exports.xnxxdl = async (URL) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
                creator: 'Senku/rapa https://github.com/senkuXZ', 
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}



exports.gempa = async () => {
return new Promise((resolve, reject) => {
axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg').then((response) => {
const $ = cheerio.load(response.data)
const urlElems = $('table.table-hover.table-striped')
for (let i = 0; i < urlElems.length; i++) {
const urlSpan = $(urlElems[i]).find('tbody')[0]
if (urlSpan) {
const urlData = $(urlSpan).find('tr')[0]
var Kapan = $(urlData).find('td')[1]
var Letak = $(urlData).find('td')[2]
var Magnitudo = $(urlData).find('td')[3]
var Kedalaman = $(urlData).find('td')[4]
var Wilayah = $(urlData).find('td')[5]
var lintang = $(Letak).text().split(' ')[0]
var bujur = $(Letak).text().split(' ')[2]
var hasil = {
Waktu: $(Kapan).text(),
Lintang: lintang,
Bujur: bujur,
Magnitudo: $(Magnitudo).text(),
Kedalaman: $(Kedalaman).text().replace(/\t/g, '').replace(/I/g, ''),
Wilayah: $(Wilayah).text().replace(/\t/g, '').replace(/I/g, '').replace('-','').replace(/\r/g, '').split('\n')[0],
Map: $('div.row > div > img').attr('src')
}
resolve(hasil);
console.log(hasil)
}
}
})
})
}


exports.katabijak = async (input) => {
return new Promise((resolve, reject) => {
fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
.then(res => res.text())
.then(res => {
const $ = cheerio.load(res)
data = []
$('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
auttor = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
biyyo = $(this).find('span[class="auteur-beschrijving"]').text().trim()
quot = $(element).find('q[class="fbquote"]').text().trim()
data.push({ 
author: auttor, 
bio: biyyo, 
quote: quot 
})
})
data.splice(2, 1)
if (data.length == 0) return resolve({ 
status: false 
})
resolve({ 
status: true, 
data 
})
}).catch(reject)
})
}

exports.searchRepo = async (repo) => {
    return new Promise( async (resolve, reject) => {
        await axios.get(`https://api.github.com/search/repositories?q=${repo}`)
            .then(response => {
                if(response.status == 200){
                    const results = response.data.items
                    
                    data = {}
                    data.code = response.status
                    data.message = "ok"
                    data.totalCount = response.data.total_count
                    data.items = []
                    data.creator = "Zhirrr" // ( https://github.com/ZefianAlfian )

                    if(data.totalCount != 0){
                        results.forEach((res) => {
                            data.items.push({
                                id: res.id,
                                nodeId: res.node_id,
                                nameRepo: res.name,
                                fullNameRepo: res.full_name,
                                url_repo: res.html_url,
                                description: res.description,
                                git_url: res.git_url,
                                ssh_url: res.ssh_url,
                                clone_url: res.clone_url,
                                svn_url: res.svn_url,
                                homepage: res.homepage,
                                stargazers: res.stargazers_count,
                                watchers: res.watchers,
                                forks: res.forks,
                                defaultBranch: res.default_branch,
                                language: res.language,
                                isPrivate: res.private,
                                isFork: res.fork,
                                createdAt: res.created_at,
                                updatedAt: res.updated_at,
                                pushedAt: res.pushed_at,
                                author: {
                                    username: res.owner.login,
                                    id_user: res.owner.id,
                                    avatar_url: res.owner.avatar_url,
                                    user_github_url: res.owner.html_url,
                                    type: res.owner.type,
                                    isSiteAdmin: res.owner.site_admin
                                }
                            })
                        })
                    }else{
                        data.items = "Repositories not found"
                    }

                    resolve(data)
                }else{
                    reject({
                        code: 500,
                        success: false,
                        message: "Server Bermasalah"
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
 }


 // Dpet dri dika ardnt ( https://github.com/DikaArdnt )
exports.emoji = async (emoticon) => {
const emojii = encodeURI(`${emoticon}`)
var link = await axios.get(`https://emojipedia.org/${emojii}/`)
var $ = cheerio.load(link.data)
var apple = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var google = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var samsung = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var microsoft = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var whatsapp = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var twitter = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var facebook = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var jooxpixel = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var openmoji = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var emojidex = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var messager = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var LG = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var HTC = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
var mozilla = $('body > div.container > div.content').find('article > section.vendor-list > ul > li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src');
const result = {
app: apple,
go: google,
sa: samsung,
mi: microsoft,
wa: whatsapp,
tw: twitter,
fb: facebook,
pi: jooxpixel,
op: openmoji,
ed: emojidex,
mes: messager,
lg: LG,
htc: HTC,
moz: mozilla
}
return result
}


exports.katabijak = async (input) => {
return new Promise((resolve, reject) => {
fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
.then(res => res.text())
.then(res => {
const $ = cheerio.load(res)
data = []
$('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
auttor = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
biyyo = $(this).find('span[class="auteur-beschrijving"]').text().trim()
quot = $(element).find('q[class="fbquote"]').text().trim()
data.push({ 
author: auttor, 
bio: biyyo, 
quote: quot 
})
})
data.splice(2, 1)
if (data.length == 0) return resolve({ 
status: false 
})
resolve({ 
status: true, 
data 
})
}).catch(reject)
})
}

exports.lirik = async (querry) => {
	return new Promise(async (resolve, reject) => {
		await axios.request({
			url: "https://www.musixmatch.com/search/" + querry,
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"cache-control": "max-age=0",
				"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\""
			}
		}).then(async res => {
			const ch = cheerio.load(res.data)
			let Url = ch('#search-all-results').find('div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a').attr('href')
			await axios.request({
				url: "https://www.musixmatch.com"+ Url,
				method: "GET",
				data: null,
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"cache-control": "max-age=0",
					"if-none-match": "W/\"252c5-LEqIxy/rzHPI2QxgG5//NcL3YjQ\"",
					"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
				}
			}).then(({ data }) => {
				const $ = cheerio.load(data)
				let judul = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1').text().trim()
				let artis = $('#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span').text().trim()
				let thumb = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img').attr('src')
				let lirik = []
				$('#site > div > div > div > main > div > div > div.mxm-track-lyrics-container').find('div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
					let isi = $(b).find('span').text().trim()
					lirik.push(isi)
				})
				const result = {
					author: "Mecha-Labs",
                    result: {
						judul: judul.replace('Lyrics', ''),
						penyanyi: artis,
						thumb: "https:" + thumb,
						lirik: lirik[0]
					}
				}
				resolve(result)
			}).catch(reject)
		})
	})
}


exports.cerpen = async() => {
	try {
	const link = await axios.get("http://cerpenmu.com/")
	const c = cheerio.load(link.data)
	let kumpulan = []
	c('#sidebar > div').each(function (real, ra) {
		c(ra).find('ul > li').each(function (i, rayy) {
			let random = c(rayy).find('a').attr('href')
			kumpulan.push(random)
		})
	})
	var acak = kumpulan[Math.floor(Math.random() * (kumpulan.length))]
	let Otw = await axios.get(`${acak}`)
	const C = cheerio.load(Otw.data)
	let otw = []
	C('#content > article > article').each(function (a, b) {
		let random = C(b).find('h2 > a').attr('href')
		otw.push(random)
	})
	var Acak = otw[Math.floor(Math.random() * (otw.length))]
	let Link = await axios.get(`${Acak}`)
	let $ = cheerio.load(Link.data)
	let judul = $('#content').find('article > h1').text().trim()
	let karangan = $('#content').find('article > a:nth-child(2)').text().trim()
	let Isi = []
	$('#content > article > p').each(function (wm, Ra) {
		let isi = $(Ra).text().trim()
		Isi.push(isi)

	})
	let cerita = []
	for (let i of Isi) {
		cerita += i
	}
	const data = {
	 res: {
			Judul: judul,
			Penulis: karangan,
			sumber: Acak,
			cerita: cerita
		}
	}
	return data
} catch (err) {
	const res404 = {
		status: 500,
		author: 'MechaBots',
		Pesan: 'Udah Ga work?:/ cp: 082149344210'
	}
	return res404
}
}


exports.twdown = async (link) => {
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}
exports.igDl = async (Link) => {
	const hasil = []
	const Form = {
		url: Link,
		submit: ""
	}
	await axios(`https://downloadgram.org/`, {
		method: "POST",
		data:  new URLSearchParams(Object.entries(Form)),
		headers: {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9,id;q=0.8",
			"cache-control": "max-age=0",
			"content-type": "application/x-www-form-urlencoded",
			"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
			"cookie": "_ga=GA1.2.1695343126.1621491858; _gid=GA1.2.28178724.1621491859; __gads=ID=8f9d3ef930e9a07b-2258e672bec80081:T=1621491859:RT=1621491859:S=ALNI_MbqLxhztDiYZttJFX2SkvYei6uGOw; __atuvc=3%7C20; __atuvs=60a6eb107a17dd75000; __atssc=google%3B2; _gat_gtag_UA_142480840_1=1"
		},
		referrerPolicy: "strict-origin-when-cross-origin",
	}).then(async res => {
		const $ = cheerio.load(res.data)
		let url = $('#downloadBox').find('a').attr('href');
		await axios(Link, {
			method: "GET",
			data: null,
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"cache-control": "max-age=0",
				"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
				"cookie": "ig_did=08A3C465-7D43-4D8A-806A-88F98384E63B; ig_nrcb=1; mid=X_ipMwALAAFgQ7AftbrkhIDIdXJ8; fbm_124024574287414=base_domain=.instagram.com; shbid=17905; ds_user_id=14221286336; csrftoken=fXHAj5U3mcJihQEyVXfyCzcg46lHx7QD; sessionid=14221286336%3A5n4czHpQ0GRzlq%3A28; shbts=1621491639.7673564; rur=FTW"
			},
			referrerPolicy: "strict-origin-when-cross-origin"
		}).then(respon => {
			const ch = cheerio.load(respon.data)
			let title = ch('title').text().trim()
			const result = {
				link: url,
				desc: title,
				LinkAwal: Link
			}
			hasil.push(result)
		})
	})
	return hasil[0]
}

 // Dpet dri dika ardnt ( https://github.com/DikaArdnt )
exports.downloader = async (url) => {
    return new Promise((resolve, reject) => {
        axios({
         url: 'https://aiovideodl.ml/', 
         method: 'GET',
         headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
          }
          }).then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://aiovideodl.ml/wp-json/aio-dl/video-data/`,
                headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8","user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
                },
                formData: {
                url: url,
                token: token
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                res.status = 200
                resolve(res);
            });
        })
    })
}
