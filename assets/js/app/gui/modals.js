const Modals = {

	show (modal) {
		$(mask).fadeIn()
		$(modal).fadeIn()
	
		$(menu_user).fadeOut()
		$('header > nav > .fa-bars').removeClass(act_class)
	},

	close_all () {
		if (Classes.is_visible(modal)) {
			$(mask).fadeOut()
			$(modal).fadeOut()
		}
	},

	close_all_esc () {
		document.addEventListener('keydown', event => {
			if (event.key === 'Escape') { this.close_all() }
		})
	},

}