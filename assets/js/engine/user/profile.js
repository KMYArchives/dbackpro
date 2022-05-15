const Profile = {

	_toggle_exit_icon () {
		if (Storage.has('userData')) {
			El.show('#exit-icon')
		} else {
			El.hide('#exit-icon')
		}
	},

	menu () {
		El.append(el_menu_app, `
			<div class='header'>
				<img alt=''>
				<div class='name' onclick='Login.open()'></div>

				<div class='right'>
					<div class='fas fa-arrow-right-from-bracket' id='exit-icon' title='Logoff' onclick='Login.logoff()'></div>
				</div>
			</div>

			<div class='list'>
				<div class='item'>Setting's</div>
				<div class='item'>My cloud</div>
				<div class='item'>My account</div>
				<div class='item'>Help & Support</div>
			</div>
		`)
	},

	set_name_avatar () {
		if (Storage.has('userData')) {
			var data = JSON.parse(
				Storage.get('userData')
			)

			El.text(
				el_menu_app + ' > .header > .name', data.name
			)
		} else {
			El.text(
				el_menu_app + ' > .header > .name', 'Connect your account'
			)
		}

		Attr.set(
			el_menu_app + ' > .header > img', 'src' , Gravatar.get()
		)

		this._toggle_exit_icon()
	},

}