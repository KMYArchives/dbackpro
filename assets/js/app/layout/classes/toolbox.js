const Toolbox = class {

	element

	render () {
		$(`${ this.element }`).append(`
			<div class='header'>Tools</div>

			<div class='tab-tools actived' id='official' onclick='ToolboxTabs.official()'>Official</div>
			<div class='tab-tools' id='third-party' onclick='ToolboxTabs.third_party()'>Third Party</div>

			<div class='list'></div>
		`)
	}

	set (items) {
		_.forEach(items, item => {
			$(`${ this.element } > .list`).append(
				`<div id='${
					item.id
				}' class='item' onclick="${ 
					item.click 
				}">${
					item.text
				}</div>`
			)
		})
	}

	del (items) {
		_.forEach(items, item => {
			$(`${ 
				this.element + ' > .list > #' + item.id 
			}`).remove()
		})
	}

	toggle (el_btn) {
		$(this.element).slideToggle(250)
		Classes.toggle(el_btn)
	}

	change_tab (tab) {
		$(`${ this.element } > .tab-tools`).removeClass('actived')
		$(`${ this.element } > .tab-tools#${ tab }`).addClass('actived')
	}

	constructor (element) { this.element = element }

	clean () { $(`${ this.element } > .list`).empty() }

}