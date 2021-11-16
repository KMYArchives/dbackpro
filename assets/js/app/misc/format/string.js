const Str = {
	
	capitalize (string) {
		if (typeof string !== 'string') return ''
		return string.charAt(0).toUpperCase() + string.slice(1)
	},
	
	cut (string, length, ending = '...') {
		if (string.length > length) {
			return string.slice(0, length - ending.length) + ending
		} else {
			return string
		}
	},

	parse (json_content) { return JSON.parse(json_content) },

	slice (string, char, slice) { return string.split(char)[slice] },
	
	percent (x, y, p = 100, f = 1) { return (x * p / y).toFixed(f) },

	get_last_param (string) { return string.split('/').slice(-1)[0] },

	remove_protocols (string) { return Find.replace(string, /(^\w+:|^)\/\//, '') },
	
	stringify (json_content, indent = 4) { return JSON.stringify(json_content, null, indent) },

}