const FrameBar = class {

	element

	render () {
		$(this.element).append(`
			<div class='label'>${ document.title }</div>

			<div class='options'>
				<div class='fas fa-window-minimize' onclick='Core.window_minimize()'></div>
				<div class='fas fa-times' onclick='Core.window_close()'></div>
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