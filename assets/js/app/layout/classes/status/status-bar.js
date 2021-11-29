const StatusBar = class {

	element

	del (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				$(`${ 
					this.element + ' > nav > #' + item.id 
				}`).remove()
			} else if (item.icon != undefined) {
				$(`${ 
					this.element + ' > nav > .' + item.icon 
				}`).remove()
			}
		})
	}
	
	set (items) {
		var text,
			icon, 
			actived_class

		_.forEach(items, item => {
			if (item.text != undefined) {
				text = item.text
			} else {
				text = ''
			}

			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}

			$(`${ this.element } > nav`).append(
				`<div class='${ 
					item.class + ' ' + actived_class 
				}' title='${ 
					item.title 
				}' onclick='${ 
					item.click 
				}'>${
					text
				}</div>`
			)
		})
	}

	constructor (element) { this.element = element }

	clean () { $(`${ this.element } > nav`).empty() }

	render () { $(this.element).append(`<nav></nav>`) }

}