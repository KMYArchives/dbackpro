const SideBar = class {

	element

	set (items) {
		var actived_class

		_.forEach(items, item => {
			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}

			$(this.element).append(
				`<div id='${
					item.id
				}' class='${ 
					item.icon + ' ' + actived_class 
				}' title='${ 
					item.title 
				}' onclick='${ 
					item.click 
				}'></div>`
			)
		})
	}

	del (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				$(`${ 
					this.element + ' > #' + item.id 
				}`).remove()
			} else if (item.icon != undefined) {
				$(`${ 
					this.element + ' > .' + item.icon 
				}`).remove()
			}
		})
	}

	clean () { $(this.element).empty() }

	constructor (element) { this.element = element }

}