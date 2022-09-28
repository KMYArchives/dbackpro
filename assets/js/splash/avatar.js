const Avatar = {

	user () {
		if (Storage.has('userData') && !File.has(
			Core.get_file('app/cache', 'avatar.png')
		)) {
			var data = JSON.parse(
				Storage.get('userData')
			)

			download(
				data.gravatar	
			).pipe(
				fs.createWriteStream(
					Core.get_file('app/cache', 'avatar.png')
				)
			)

			setTimeout( e => {
				El.text(el_splash_text, 'Download user avatar...')
			}, 1000)
		}
	},

    default () {
        download(
            'https://i.imgur.com/k73r6An.png'	
        ).pipe(
            fs.createWriteStream(
                Core.get_file('app/cache', 'avatar.png')
            )
        )

        setTimeout( e => {
            El.text(el_splash_text, 'Download avatar...')
        }, 1000)
    },

}