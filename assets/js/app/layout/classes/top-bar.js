const TopBar = class {

	element

	render () {
		$(this.element).append(`
			<div class='label'>New connection</div>
			
			<nav>
				<div class='label' id='total'></div>
				<div class='custom'></div>
			</nav>
		`)
	}

	del (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				$(`${ 
					this.element + ' > nav > .custom > #' + item.id 
				}`).remove()
			} else if (item.icon != undefined) {
				$(`${ 
					this.element + ' > nav > .custom > .' + item.icon 
				}`).remove()
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

			$(`${ this.element } > nav > .custom`).append(
				`<div class='${ 
					item.class + ' ' + actived_class 
				}' title='${ 
					title 
				}' onclick='${ 
					item.click 
				}'>${
					text
				}</div>`
			)
		})
	}

	constructor (element) { this.element = element }

	clean () { $(`${ this.element } > nav > .custom`).empty() }

	title (text) { $(`${ this.element + ' > .label' }`).text(text) }

	total (items) { $(`${ this.element + ' > nav > #total' }`).text(items) }

}