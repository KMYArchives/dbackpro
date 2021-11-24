const TopBar = class {

	element

	render () {
		$(this.element).append(`
			<div id='back-page'></div>
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

			$(`${ this.element } > nav > .custom`).append(
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

	iconBack (item) {
		$(`${ this.element + ' > #back-page' }`).attr('onclick', item.click)
		$(`${ this.element + ' > #back-page' }`).attr('title', item.title ? item.title : 'Back page')
		$(`${ this.element + ' > #back-page' }`).attr('class', item.icon ? item.icon : 'fas fa-arrow-left')
	}

	constructor (element) { this.element = element }

	clean () { $(`${ this.element } > nav > .custom`).empty() }

	title (text) { $(`${ this.element + ' > .label' }`).text(text) }

	total (items) { $(`${ this.element + ' > nav > #total' }`).text(items) }

}