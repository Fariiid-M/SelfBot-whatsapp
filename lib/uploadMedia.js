const imgbbUploader = require("imgbb-uploader");
let key = global.key_imgbb

module.exports = (media) => new Promise(async (resolve, reject) => {
imgbbUploader(key, media)
 .then((res) => resolve(res))
 .catch((err) => reject(err))
})