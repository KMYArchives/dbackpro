let Sidebar = {

	set_menu_item (items) {
		var actived_class

		_.forEach(items, item => {
			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}

			$(el_sidebar).append(
				`<div id='${
					item.id
				}' class='${ 
					item.icon + ' ' + actived_class 
				}' title='${ 
					item.title 
				}' onclick='${ 
					item.click 
				}'></div>`
			)
		})
	},

	del_menu_item (items) {
		_.forEach(items, item => {
			if (item.id != undefined) {
				$(`${ 
					el_sidebar + ' > #' + item.id 
				}`).remove()
			} else if (item.icon != undefined) {
				$(`${ 
					el_sidebar + ' > .' + item.icon 
				}`).remove()
			}
		})
	},

	clean_menu_items () { $(el_sidebar).empty() },

}