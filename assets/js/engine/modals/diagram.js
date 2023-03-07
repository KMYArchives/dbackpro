const DiagramModel = {

	show () {
		El.text(
			'#diagram-tbl-name', Storage.get('tblSelected')
		)

		El.show(el_mask_mdl)
		El.show(el_diagram_mdl)
	},

	hide () {
		El.hide(el_mask_mdl)
		El.hide(el_diagram_mdl)
	},

	layout () {
		El.empty(el_diagram_mdl)
		El.append(el_diagram_mdl, `
			<div class='mdl-title'>
				<div class='label' id='diagram-tbl-name'></div>
				<div class='fas fa-times' onclick='DiagramModel.hide()'></div>
			</div>

			<div class='mdl-bar' id='diagram-tbl-bar'>
				<div class='item' id='diagram-tbl-share' onclick='Hello.world()'>Share</div>
				<div class='item' id='diagram-tbl-send' onclick='Hello.world()'>Send to</div>

				<div class='right'>
					<div class='message' id='diagram-tbl-msg'>Saved with successfully.</div>

					<div class='icon' id='diagram-tbl-save' onclick='Hello.world()'>
						<div class='fas fa-floppy-disk'></div>
					</div>
				</div>
			</div>

			<div class='diagram'></div>
		`)
	},

}