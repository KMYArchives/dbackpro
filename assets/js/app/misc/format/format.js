const Format = {

	base64 (string) {
		return string.replace('data:', '').
			replace('image/png', '').
			replace('image/jpeg', '').
			replace('image/gif', '').
			replace('image/webp', '').
			replace('base64,', '')
	},

	int_float (number) {
		var x = 0,
			r = '',
			n = number.toString()
	
		for (var i = n.length; i > 0; i--) {
			r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '')
			x = x == 2 ? 0 : x + 1
		}
	
		return r.split('').reverse().join('')
	},

	bytes (bytes, decimals = 2) {
		bytes = parseInt(bytes)
		if (bytes === 0) { return '0 Bytes' }
	
		var k = 1024,
			dm = decimals < 0 ? 0 : decimals,
			i = Math.floor(Math.log(bytes) / Math.log(k)),
			sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
			
		return parseFloat(
			(bytes / Math.pow(k, i)).toFixed(dm)
		) + ' ' + sizes[i]
	},

	date_time (date_time, locale, options = null) {
		var data
		
		if (options == null) {
			data = {
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				month: 'numeric',
				minute: '2-digit',
				second: '2-digit',
			}
		} else {
			data = {
				day: options.day,
				year: options.year,
				hour: options.hour,
				month: options.month,
				minute: options.minute,
				second: options.second,
			}	
		}

		return new Date(date_time).toLocaleDateString(locale, data)
	},

	percent (value, total, fixed = 2, percent = 100) {
		if ((percent * value) / total > 0) {
			return (
				(percent * value) / total
			).toFixed(fixed)
		} else {
			return 0
		}
	},

	float (size, dec) { return parseFloat(size).toPrecision(dec) },

}