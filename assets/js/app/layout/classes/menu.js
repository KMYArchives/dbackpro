const MenuBox = class {

	element

	set (items) {
		_.forEach(items, item => {
			El.append(this.element, `
				<div id='${
					item.id
				}' class='item' onclick='${ 
					item.click 
				}'>${
					item.text
				}</div>
			`)
		})
	}

	del (items) {
		_.forEach(items, item => {
			El.remove(`${ 
				this.element + ' > #' + item.id 
			}`)
		})
	}

	hide () {
		El.hide(el_menu_actions)
		if (El.has(el_menu_actions)) { Classes.remove('#menu-manager', act_class) }
	}

	toggle () {
		El.toggle(el_menu_actions)
		Classes.toggle('#menu-manager', act_class)
	}

	clean () { El.empty(this.element) }

	constructor (element) { this.element = element }

}