const CodeModal = {

	show () {
		El.show(el_mask_mdl)
		El.show(el_code_mdl)
	},

	hide () {
		El.hide(el_mask_mdl)
		El.hide(el_code_mdl)
	},

	layout () {
		if (El.html(el_code_mdl) == '') {
			El.append(el_code_mdl, `
				<div class='mdl-title'>
					<div class='label' id='code-tbl-name'></div>

					<div class='fas fa-times' onclick='CodeModal.hide()'></div>
					<div class='fas fa-cog' onclick='Hello.world()'></div>
				</div>

				<div class='mdl-bar' id='code-tbl-bar'>
					<div class='item' id='code-tbl-share' onclick='Hello.world()'>Share</div>
					<div class='item' id='code-tbl-send' onclick='Hello.world()'>Send to</div>

					<div class='right'>
						<div class='message' id='code-tbl-msg'></div>

						<div class='icon' id='smd-list' onclick='SMDList.toggle()'>
							<div class='fas fa-book'></div>
						</div>

						<div class='icon' id='code-tbl-save' onclick='CreateSnippets.create()'>
							<div class='fas fa-floppy-disk'></div>
						</div>
					</div>
				</div>

				<div class='shot-link' id='${ Find.replace(ShotLink.el_main, '#', '') }'>
					<img id='${ Find.replace(ShotLink.el_main_img, '#', '') }'>

					<div class='bottom' id='${ Find.replace(ShotLink.el_main_bottom, '#', '') }'>
						<a class='hostname'></a>
						<div class='fas fa-info-circle'></div>
						<div class='fas fa-shield'></div>
					</div>
				</div>

				<div class='smd-list' id='${ Find.replace(SMD.el_list_main, '#', '') }'></div>
				<div class='smd-get' id='${ Find.replace(SMD.el_main, '#', '') }'></div>
				<div class='smd-get' id='${ Find.replace(SMD.el_main_dataset, '#', '') }'></div>

				<textarea id='${ Find.replace(el_editor, '#', '') }'></textarea>
			`)

			SMD.load_get()
			SMD.load_list()
			SMD.load_get_dataset()
			EditorAutoload.loader()
		}
	},

	show_save () { El.show('#code-tbl-save') },

	hide_save () { El.hide('#code-tbl-save') },

	title (text) { El.text('#code-tbl-name', text) },

}