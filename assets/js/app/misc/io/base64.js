const Base64 = {

	encode (file) {
		return new Buffer(
			fs.readFileSync(file)
		).toString('base64')
	},

	decode (b64, file) {
		fs.writeFileSync(
			file, new Buffer(b64, 'base64')
		)
	},

	bota (string) { return btoa(string) },
	
	atoa (string) { return atoa(string) },

}