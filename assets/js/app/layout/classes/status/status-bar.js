const StatusBar = class {

	element

	del (items) {
		if (items == '*' || items[0] == '*') {
			this.clean()
		} else {
			_.forEach(items, item => {
				$(`${ 
					this.element + ' > nav > .' + item 
				}`).remove()
			})
		}
	}
	
	set (items) {
		var text,
			icon,
			title,
			actived_class

		_.forEach(items, item => {
			if (item.title != undefined) {
				title = item.title
			} else {
				title = ''
			}

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
					title 
				}' onclick="${ 
					item.click 
				}">${
					text
				}</div>`
			)
		})
	}

	constructor (element) { this.element = element }

	clean () { $(`${ this.element } > nav`).empty() }

	render () { $(this.element).append(`<nav></nav>`) }

}