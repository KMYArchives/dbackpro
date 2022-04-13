const Confirm = {

	hide_all_box () {
		El.hide([
			menu_user,
			share_box,
			conns_list,
			menu_action,
			history_box,
			contacts_box,
			collections_box
		])
	},

	run (text, slug = null) {
		Modals.close_all()
		this.hide_all_box()

		Classes.remove([
			menu_btn,
			show_conns,
			menu_sidebar,
			menu_manager + ' > .icon'
		], act_class)

		El.empty(confirm_mdl).empty()
		El.append(confirm_mdl, `
			<div class='conf-content'>
				<div class='label'>${ ConfirmMisc.text(text) }</div>
				<input type='text' id='confirm-input' placeholder='${ ConfirmMisc.placeholder(text) }'>
				<div class='error' id='error-confirm'></div>
			</div>

			<div class='conf-footer'>
				<div class='btn' onclick="ConfirmTask.run('${ text }', '${ slug }')">Confirm</div>
				<div class='btn' onclick="ConfirmTask.close('${ text }')">Cancel</div>
			</div>
		`)

		Modals.show(mask)
		if (Find.in_array(text, [
			'drop_table', 'rename_table', 'truncate_table'
		])) { El.show('#confirm-input') }
	},

}