const ShotLink = {

	el_main: '#shotlink',
	el_main_img: '#shotlink-img',
	el_main_bottom: '#shotlink-bottom',

	_get_hostname (link) {
		if (!Validation.hostname(link)) {
			const url = new URL(link)
			return url.hostname
		} else {
			return link
		}
	},

	load () {
		El.empty(this.el_main, `
			<img id='${ Find.replace(ShotLink.el_main_img, '#', '') }'>

			<div class='bottom'>
				<div class='link' id='${ Find.replace(ShotLink.el_main_link, '#', '') }'></div>
				<div class='fas fa-info-circle'></div>
				<div class='fas fa-shield'></div>
			</div>
		`)
	},

	watch () {
		if (editor.getSelection().length > 0 && Validation.url(
			editor.getSelection()
		)) {
			var link = this._get_hostname(
				editor.getSelection()
			)
			
			Attr.set(
				this.el_main_img, 'src', `https://s0.wp.com/mshots/v1/${ link }`
			)

			El.text('.hostname', link)
			Attr.set('.hostname', 'onclick', 'ShotLink.open_link()')

			El.show(this.el_main)
		} else {
			El.hide(this.el_main)
		}
	},

	open_link () {
		var _url

		if (Validation.hostname(
			editor.getSelection()
		)) {
			_url = 'http://' + editor.getSelection()	
		} else {
			_url = editor.getSelection()
		}

		open(_url)
	},

}