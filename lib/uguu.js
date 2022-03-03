//touguu

let FormData = require("form-data");
let fs = require('fs');
let axios = require('axios');
exports.toUguu = async  (path) => {
	const Result = []
	const bodyForm = new FormData();
	bodyForm.append('files[]', fs.createReadStream(path))
	await axios(`https://uguu.se/upload.php`,{
		method: 'POST',
		data: bodyForm,
		headers: {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9,id;q=0.8",
			"content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
		}
	}).then(({ data }) => {
		const result = {
			author: 'Created by Ra',
			status: data.success ? 200 : 404,
			result: {
				url: data.files[0].name,
				namaFile: data.files[0].url,
				size: data.files[0].size,
				hash: data.files[0].hash
			}
		}
		Result.push(result.result.url)
	})
	return Result[0]
}