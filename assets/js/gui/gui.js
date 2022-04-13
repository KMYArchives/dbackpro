window.onload = e => {

	Classes.add([
		el_toolbox
	], 'animate__animated animate__zoomIn animate__faster')

	Events.click( close_btn, e => { Windows.main_window_close() })

	Events.click( minimize_btn, e => { Windows.main_window_minimize() })

}