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

			El.append(this.element, `
				<div id='${
					item.id
				}' class='item ${
					actived_class 
				}' onclick='${ 
					item.click 
				}'>
					<div class='${ 
						item.icon
					}'></div>

					<div class='tooltip animate__animated animate__fadeIn animate__faster'>${
						item.title
					}</div>
				</div>
			`)
		})
	}

	del (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				El.remove(`${ 
					this.element + ' > #' + item.id 
				}`)
			} else if (item.icon != undefined) {
				El.remove(`${ 
					this.element + ' > .' + item.icon 
				}`)
			}
		})
	}

	show (items) {
		_.forEach(items, item => {
			El.show(`${ 
				this.element + ' > .' + item 
			}`)
		})
	}

	hide (items) {
		_.forEach(items, item => {
			El.hide(`${ 
				this.element + ' > .' + item 
			}`)
		})
	}

	clean () { El.empty(this.element) }

	constructor (element) { this.element = element }

}