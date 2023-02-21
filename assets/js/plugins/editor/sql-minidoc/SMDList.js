const SMDList = {

	list () {
		if (El.html(SMD.el_list_list) == '') {
			DBX.select(
				'name',
			).from(
				'sql_minidoc'
			).then( callback => {
				_.forEach( callback, element => {
					El.append(SMD.el_list_list, `
						<div class='item' onclick="SMDGetDataset.get('${ element.name }')">${
							element.name
						}</div>
					`)
				})
			})
		}
	},

	show () {
		if (!Classes.is_visible(SMD.el_main)) {
			this.list()
			SMDGetDataset.hide()
			El.show(SMD.el_list_main)
		}
	},

	hide () {
		El.hide(SMD.el_list_main)
		Storage.set('smdListVisible', false)
	},

	search () {
		if (El.value(SMD.el_list_search) != '') {
			El.empty(SMD.el_list_list)

			DBX.select(
				'name',
			).from(
				'sql_minidoc'
			).where(
				'name', 'like', `%${ El.value(SMD.el_list_search) }%`
			).then( callback => {
				_.forEach( callback, element => {
					El.append(SMD.el_list_list, `
						<div class='item' onclick="SMDGetDataset.get('${ element.name }')">${
							element.name
						}</div>
					`)
				})
			})
		} else {
			El.empty(SMD.el_list_list)
			this.list()
		}
	},

}