$( e => {

	$(close_btn).on('click', e => { Windows.main_window_close() })

	$(minimize_btn).on('click', e => { Windows.main_window_minimize() })

})