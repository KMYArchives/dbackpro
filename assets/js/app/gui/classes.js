const Classes = {
	
	has (element, selected = act_class) {
		if (!($(element).parent().find(element).hasClass(selected))) {
			return true
		} else {
			return false
		}
	},

	replace (rem, add, selected = act_class) {
		$(add).addClass(selected)
		rem.forEach( rem_class => { $(rem_class).removeClass(selected) })
	},

	toggle (el, selected = act_class, find = el) {
		var display = $(el).parent().find(find)
		
		if (!(display.hasClass(selected))) {
			display.addClass(selected)
		} else {
			display.removeClass(selected)
		}
	},

	is_visible (ui_element) { return $(ui_element).is(':visible') },

}