let Session = {

	get (key) {
		var content = sessionStorage.getItem(key)

		if (Array.isArray(content) == true) {
			return Str.parse(content)
		} else {
			return content
		}
	},

	has (key) {
		if (!Find.in_array(this.get(key), [ null, undefined ])) {
			return true
		} else {
			return false
		}
	},

	delete (key) {
		if (Array.isArray(key) != true) {
			if (sessionStorage.removeItem(key)) {
				return true
			} else {
				return false
			}
		} else {
			key.forEach( item => { 
				sessionStorage.removeItem(item) 
			})
			
			return true
		}
	},

	set (key, value) {
		var content

		if (Array.isArray(value) == true) {
			content = Str.parse(value)
		} else {
			content = value
		}

		if (sessionStorage.setItem(key, content)) {
			return true
		} else {
			return false
		}
	},

}