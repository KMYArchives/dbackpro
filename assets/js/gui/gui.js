window.onload = e => {

	Classes.add([
		el_toolbox,
		el_menu_app
	], 'animate__animated animate__zoomIn animate__faster')

	Events.click( close_btn, e => { Windows.main_window_close() })

	Events.click( minimize_btn, e => { Windows.main_window_minimize() })

	Events.click( el_menu_app_btn, e => {
		El.hide(el_toolbox)
		Classes.remove('#toggle-tools', act_class)

		Classes.toggle(el_menu_app_btn, act_class)
		El.toggle(el_menu_app)
	})

}