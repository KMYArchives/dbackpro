const GUI = {

	toggle_boxes (el) {
		Classes.toggle(el, act_class)
		$('#' + $(el).attr('toggle')).fadeToggle(anim_time)
	
		if ($(el).attr('hide') != undefined) {
			$(el).attr('hide').split(',').forEach( element => { 
				$('#' + element.replace(/\s/g, '')).hide() 
			})
		}
	
		if ($(el).attr('rem-act') != undefined) {
			$(el).attr('rem-act').split(',').forEach( element => { 
				$('.' + element.replace(/\s/g, '')).removeClass(act_class) 
			})
		}
	},

	empty_multiple (elements) {
		elements.forEach( element => {
			$(element).empty()
		})
	},

	message (element, text, delay = 2500, time = anim_time) {
		element = Find.replace_all(
			element, '#', ''
		)
		
		$('#' + element).empty()
		$('#' + element).text(text)
		$('#' + element).fadeIn(time)
		setTimeout( e => { $('#' + element).fadeOut(time) }, delay)
	},

}