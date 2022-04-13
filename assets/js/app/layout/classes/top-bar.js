const TopBar = class {

	element

	render () {
		El.append(this.element, `
			<div class='label'></div>
			
			<nav>
				<div class='label' id='total'></div>
				<div class='custom'></div>
			</nav>
		`)
	}

	del (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				El.remove(`${ 
					this.element + ' > nav > .custom > #' + item.id 
				}`)
			} else if (item.icon != undefined) {
				El.remove(`${ 
					this.element + ' > nav > .custom > .' + item.icon 
				}`)
			}
		})
	}
	
	set (items) {
		var text,
			title,
			actived_class

		_.forEach(items, item => {
			if (item.text != undefined) {
				text = item.text
			} else {
				text = ''
			}

			if (item.title != undefined) {
				title = item.title
			} else {
				title = ''
			}

			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}

			El.append(`${ this.element } > nav > .custom`, `
				<div class='${ 
					item.class + ' ' + actived_class 
				}' title='${ 
					title 
				}' onclick='${ 
					item.click 
				}'>${
					text
				}</div>
			`)
		})
	}

	constructor (element) { this.element = element }

	clean () { El.empty(`${ this.element } > nav > .custom`) }

	title (text) { El.text(`${ this.element + ' > .label' }`, text) }

	total (items) { El.text(`${ this.element + ' > nav > #total' }`, items) }

}