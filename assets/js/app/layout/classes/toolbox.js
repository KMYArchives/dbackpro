const Toolbox = class {

	element

	render () {
		El.append(`${ this.element }`, `
			<div class='header'>Tools</div>

			<div class='tab-tools actived' id='official' onclick='ToolboxTabs.official()'>Official</div>
			<div class='tab-tools' id='third-party' onclick='ToolboxTabs.third_party()'>Third Party</div>

			<div class='list'></div>
		`)
	}

	set (items) {
		_.forEach(items, item => {
			El.append(`${ this.element } > .list`, `
				<div id='${
					item.id
				}' class='item' onclick="${ 
					item.click 
				}">${
					item.text
				}</div>
			`)
		})
	}

	del (items) {
		_.forEach(items, item => {
			El.remove(`${ 
				this.element + ' > .list > #' + item.id 
			}`)
		})
	}

	toggle () {
		El.hide(el_menu_app)
		Classes.remove(el_menu_app_btn, act_class)

		El.toggle(this.element, act_class)
		Classes.toggle('#toggle-tools', act_class)
	}

	constructor (element) { this.element = element }

	clean () { El.empty(`${ this.element } > .list`) }

}