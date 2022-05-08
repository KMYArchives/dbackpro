const FrameBar = class {

	element

	render () {
		El.append(this.element, `
			<div class='fas fa-bars' id='menu-app-btn'></div>
			<div class='label'>${ document.title }</div>

			<div class='options'>
				<div class='fas fa-toolbox' id='toggle-tools' onclick='toolbox.toggle()'></div>
				<div class='far fa-bell' id='toggle-notify'>
					<div class='counter-bubble'></div>
				</div>

				<div class='fas fa-window-minimize' id='minimize'></div>
				<div class='fas fa-times' id='close'></div>
			</div>
		`)
	}

	title (text) {
		El.text(`${ 
			this.element + ' > .label' 
		}`, `${
			text
		}`)
	}

	constructor (element) { this.element = element }

}