const GUI = {

	version: '2.0.3',

	toggle_boxes (el) {
		Classes.toggle(el, act_class)
	
		if (Attr.has(el, 'hide')) {
			Attr.get(el, 'hide').split(',').forEach( element => { 
				El.hide(
					'#' + element.replace(/\s/g, '')
				)
			})
		}
	
		if (Attr.has(el, 'rem-act')) {
			Attr.get(el, 'rem-act').split(',').forEach( element => { 
				Classes.hide(
					'#' + element.replace(/\s/g, '')
				)
			})
		}
	
		El.show('#' + Attr.get(el, 'toggle'))
	},

	message (element, text, delay = 2500) {
		element = element.replace(
			/\s/g, ''
		)

		El.empty(element)
		El.text(element, text)
		El.show(element)
		
		setTimeout( e => { El.hide(element) }, delay)
	},
	
	get_func_checked (element, icon = 'fa-check') {
		if (Classes.has(element, icon) == true) { return true }
		return false
	},

}