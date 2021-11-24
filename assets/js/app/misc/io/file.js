let File = {

	has (file) {
		if (fs.existsSync(file) == true) {
			return true
		} else {
			return false
		}
	},

	read (file) {
		if (this.has(file) == true) {
			return fs.readFileSync(file, 'utf8')
		} else {
			return false
		}
	},

	unlink (file) {
		if (this.has(file) == true) { 
			fs.unlinkSync(file) 
		}
	},

	download (data) {
		download(
			data.url
		).pipe(
			fs.createWriteStream(
				Core.get_file(data.dest, data.file_name)
			)
		)
	},

	new (file, content) {
		fs.writeFileSync(file, content, (data, error) => {
			if (error) {
				return false
			} else {
				return true
			}
		})
	},

	size (file, format = false) {
		var file_size = fs.statSync(file).size
		if (format) { return Format.bytes(file_size) }
		return file_size
	},

	name (file, rem_ext = false) {
		var file_name = path.basename(file)
		
		if (rem_ext) { 
			return Str.slice(
				file_name, '.', 0
			)
		}

		return file_name
	},

	date_time (file, type = 'ctime') {
		var date_time = new Date(
			fs.statSync(file)[type]
		).toLocaleDateString('en-US', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			seconds: 'numeric'
		})
	
		return datetime.create(date_time).format('m-d-Y H:M:S')
	},
	
	new_folder (folder, multiple = false) {
		if (multiple == true) {
			folder.forEach( path => {
				if (this.has(path) == false) { fs.mkdirSync(path) }
			})
		} else {
			if (this.has(path) == false) { fs.mkdirSync(path) }
		}
	},

}