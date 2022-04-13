const StatusBar = class {

	element

	del (items) {
		if (items == '*' || items[0] == '*') {
			this.clean()
		} else {
			_.forEach(items, item => {
				El.remove(`${ 
					this.element + ' > nav > .' + item 
				}`)
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

			El.append(`${ this.element } > nav`, `
				<div class='${ 
					item.class + ' ' + actived_class 
				}' title='${ 
					title 
				}' onclick="${ 
					item.click 
				}">${
					text
				}</div>
			`)
		})
	}

	constructor (element) { this.element = element }

	clean () { El.empty(`${ this.element } > nav`) }

	render () { El.append(this.element, `<nav></nav>`) }

}