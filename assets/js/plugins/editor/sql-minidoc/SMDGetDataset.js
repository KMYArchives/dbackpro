const SMDGetDataset = {

	copy () {
		El.copy(Storage.get('smdGetDef'))
		El.text(SMD.el_msg_dataset, 'Copied with successfully')
		
		El.show(SMD.el_msg_dataset)
		setTimeout( e => El.hide(SMD.el_msg_dataset), 2500)
	},

	get (keyword) {
		if (keyword && !Classes.is_visible(SMD.el_main)) {
            SMDList.hide()

			DBX.select(
				'*',
			).from(
				'sql_minidoc'
			).where({
				name: keyword
			}).then( callback => {
				if (callback.length > 0) {
					this.content(callback[0])
					Storage.set('smdGetDef', callback[0].content)
				}
			})
		} else {
			this.hide()
			Storage.delete('smdGetDef')
		}
	},

	content (callback) {
		if (El.text(SMD.el_def_dataset) != callback.content) {
			El.text(SMD.el_def_dataset, callback.content)
			El.text(SMD.el_keyword_dataset, callback.name)
		}

		this.show()
	},

	show () { El.show(SMD.el_main_dataset) },

	hide () { El.hide(SMD.el_main_dataset) },

}