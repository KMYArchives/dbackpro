const RealTime = {

	tasks () {
		setInterval( e => {
			Gravatar.auto_download()
			ListConnections.auto_refresh_list()
		}, 1000)
	},

}