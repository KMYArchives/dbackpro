const SMDGet = {

	get () {
		if (this.selection().length > 0) {
			DBX.select(
				'*',
			).from(
				'sql_minidoc'
			).where({
				name: this.selection().toLowerCase()
			}).then( callback => {
				if (callback.length > 0) {
					SMDList.hide()
					
					this.content(callback[0])
					Storage.set('smdGetDef', callback[0].content)
				}
			})
		} else {
			this.hide()
			Storage.delete('smdGetDef')
		}
	},

	copy () {
		El.copy(Storage.get('smdGetDef'))
		El.text(SMD.el_msg, 'Copied with successfully')
		
		El.show(SMD.el_msg)
		setTimeout( e => El.hide(SMD.el_msg), 2500)
	},

	content (callback) {
		if (El.text(SMD.el_def) != callback.content) {
			El.text(SMD.el_def, callback.content)
			El.text(SMD.el_keyword, callback.name)
		}

		this.show()
	},

	show () { El.show(SMD.el_main) },

	hide () { El.hide(SMD.el_main) },

	selection () { return editor.getSelection() },

}