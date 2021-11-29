const FrameBar = class {

	element

	render () {
		$(this.element).append(`
			<div class='label'>${ document.title }</div>

			<div class='options'>
				<div class='fas fa-toolbox' id='toggle-toolbox'></div>
				<div class='far fa-bell' id='toggle-notify'></div>
				<div class='fas fa-window-minimize' id='minimize'></div>
				<div class='fas fa-times' id='close'></div>
			</div>
		`)
	}

	title (text) {
		$(`${ 
			this.element + ' > .label' 
		}`).text(`${
			document.title + ': ' + text
		}`)
	}

	constructor (element) { this.element = element }

}