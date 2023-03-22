const FrameBar = class {

	element

	render () {
		El.append(this.element, `
			<div class='fas fa-bars' id='menu-app-btn'></div>
			<div class='label'>${ document.title }</div>

			<div class='options'>
				<div class='fas fa-clock-rotate-left' id='${
					Find.replace(el_backup_logs_btn, '#', '')
				}' title='Backup logs'></div>

				<div class='fas fa-bell' id='${
					Find.replace(el_notify_box_btn, '#', '')
				}' title="Notifications">	
					<div class='notify-bubble'></div>
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