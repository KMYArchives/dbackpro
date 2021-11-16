const Confirm = {

	hide_all_box () {
		$(menu_user).hide()
		$(trash_box).hide()
		$(share_box).hide()
		$(conns_list).hide()
		$(menu_action).hide()
		$(history_box).hide()
		$(contacts_box).hide()
		$(collections_box).hide()
	},

	run (text, slug = null) {
		Modals.close_all()
		this.hide_all_box()

		$(menu_btn).removeClass(act_class)
		$(show_conns).removeClass(act_class)
		$(menu_sidebar + ' > div').removeClass(act_class)
		$(menu_manager + ' > .icon').removeClass(act_class)

		$(confirm_mdl).empty()
		$(confirm_mdl).append(`
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

		$(mask).fadeIn()
		$(confirm_mdl).fadeIn()
		if (Find.in_array(text, [ 'drop_table', 'rename_table', 'truncate_table' ])) { $('#confirm-input').show() }
	},

}