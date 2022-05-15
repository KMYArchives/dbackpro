const UserDB = {

	get () {
		DBX.select(
			DBX.raw('COUNT(*) AS total')
		).where({
			name: 'account'
		}).from(
			'configs'
		).then( callback => {
			if (callback[0].total > 0) {
				DBX.select(
					'value'
				).where({
					name: 'account'
				}).from(
					'configs'
				).then( callback => {
					Storage.set('userData', callback[0].value)
					Gravatar.download()
				})
			} else {
				Storage.delete('userData')
			}
		})
	},

	delete () {
		DBX.delete().from(
			'configs'
		).where({
			name: 'account'
		}).then( callback => {
			Gravatar.delete()
			Storage.delete('userData')

			Profile.set_name_avatar()
		})
	},

	insert (data) {
		DBX.select(
			DBX.raw('COUNT(*) AS total')
		).where({
			name: 'account'
		}).from(
			'configs'
		).then( callback => {
			if (callback[0].total == 0) {
				DBX.insert({
					name: 'account',
					slug: Slug.range(36, 48),
					value: JSON.stringify(data),
					added_in: datetime.create().format('Y-m-d H:m:S'),
				}).into(
					'configs'
				).then( callback => {
					this.get()
					Windows.login_close()
				})
			}
		})
	},

}