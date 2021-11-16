const Topbar = class {

	element

	render () {
		$(this.element).append(`
			<div id='back-page'></div>
			<div class='label'>New connection</div>
			
			<nav>
				<div class='label total'></div>
			</nav>
		`)
	}

	iconBack (item) {
		$(`${ this.element + ' > #back-page' }`).attr('onclick', item.click)
		$(`${ this.element + ' > #back-page' }`).attr('title', item.title ? item.title : 'Back page')
		$(`${ this.element + ' > #back-page' }`).attr('class', item.icon ? item.icon : 'fas fa-arrow-left')
	}

	del_menu_item (items) {
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
	
	set_menu_item (items) {
		var actived_class

		_.forEach(items, item => {
			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}

			$(`${ this.element } > nav`).append(
				`<div class='${ 
					item.icon + ' ' + actived_class 
				}' title='${ 
					item.title 
				}' onclick='${ 
					item.click 
				}'></div>`
			)
		})
	}

	constructor (el) { this.element = el }

	clean_menu_items () { $(`${ this.element } > nav`).empty() }

	title (text) { $(`${ this.element + ' > .label' }`).text(text) }

	total (items) { $(`${ this.element + ' > nav > .total' }`).text(items) }

}