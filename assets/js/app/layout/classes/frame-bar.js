const FrameBar = class {

	element

	render () {
		$(this.element).append(`
			<div class='fas fa-bars'></div>
			<div class='label'>${ document.title }</div>

			<div class='options'>
				<div class='fas fa-toolbox' onclick='toolbox.toggle(this)'></div>
				<div class='far fa-bell' id='toggle-notify'>
					<div class='counter-bubble'></div>
				</div>

				<div class='fas fa-window-minimize' id='minimize'></div>
				<div class='fas fa-times' id='close'></div>
			</div>
		`)
	}

	title (text) {
		$(`${ 
			this.element + ' > .label' 
		}`).text(`${
			text
		}`)
	}

	constructor (element) { this.element = element }

}