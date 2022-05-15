const Login = {

	_error (text) {
		El.show(el_error_login)
		El.text(el_error_login, text)
		
		Classes.add(el_error_login, 'error')
		Classes.remove(el_error_login, 'info')

		setTimeout( e => {
			El.hide(el_error_login)
		}, 3000)
	},

	_input (input) {
		if (input == 'email') {
			return xss(
				El.value('#login-email')
			)
		} else if (input == 'password') {
			return xss(
				El.value('#login-password')
			)
		}
	},

	_return (code) {
		switch (code) {
			case 'email-invalid': return this._error('Email is not valid.');
			case 'error-login-auth-email': return this._error('The email is wrong.');
			case 'error-login-auth-pass': return this._error('The password is wrong.');
			case 'email-pass-required': return this._error('Email and password are required.');
		}
	},

	open () {
		if (!Storage.has('userData')) {
			Classes.remove(el_menu_app_btn, act_class)
			El.hide(el_menu_app)

			Windows.login_open()
		}
	},

	logoff () {
		if (Storage.has('userData')) {
			UserDB.delete()
			El.hide(el_menu_app)
			Classes.remove(el_menu_app_btn, act_class)
		}
	},

	connect () {
		if (this._input('email') == '' || this._input('password') == '') {
			this._return('email-pass-required')
		} else {
			if (!Validation.email(
				this._input('email')
			)) {
				this._return('email-invalid')
			} else {
				var login_data = new FormData()
				login_data.append('origin', 'app')
				login_data.append('email', this._input('email'))
				login_data.append('pass', this._input('password'))

				fetch(`${ Apis.core() }login/login`, {
					method: 'POST',
					body: login_data
				}).then(
					json => json.json()
				).then( response => {
					if (response.return == 'success' && !Storage.has('userData')) {
						UserDB.insert({
							id: response.id,
							name: response.details.name,
							email: response.details.email,
							username: response.details.username,
							gravatar: response.details.gravatar,
							avatar: Core.get_file('app/cache', 'avatar.png')
						})
					} else {
						this._return(response.return)
					}
				})
			}
		}
	},

	toggle_password (input) {
		if (Attr.get(input, 'type') == 'password') {
			Attr.set(input, 'type', 'text')
			Classes.change('#toggle-password', 'fa-eye', 'fa-eye-slash')
		} else {
			Attr.set(input, 'type', 'password')
			Classes.change('#toggle-password', 'fa-eye-slash', 'fa-eye')
		}
	},

}