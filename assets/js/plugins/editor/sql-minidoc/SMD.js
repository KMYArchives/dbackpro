const SMD = {

	el_main: '#smd-get',
	el_msg: '#smd-get-msg',
	el_def: '#smd-get-def',
	el_keyword: '#smd-get-keyword',

	el_main_dataset: '#smd-get-dataset',
	el_msg_dataset: '#smd-get-dataset-msg',
	el_def_dataset: '#smd-get-dataset-def',
	el_keyword_dataset: '#smd-get-dataset-keyword',

	el_list_main: '#smd-dataset',
	el_list_list: '#smd-dataset-list',
	el_list_search: '#smd-dataset-search',

	name: 'SQL miniDoc',

	load_get () {
		El.append(this.el_main, `
			<div class='header' id='${ Find.replace(SMD.el_keyword, '#', '') }'></div>

			<div class='msg' id='${ Find.replace(SMD.el_msg, '#', '') }'></div>
			<div class='get-def' id='${ Find.replace(SMD.el_def, '#', '') }'></div>

			<div class='footer'>
				<div class='list-link'>${ SMD.name }</div>
				<div class='fas fa-copy' onclick='SMDGet.copy()'></div>
			</div>
		`)
	},

	load_list () {
		El.append(this.el_list_main, `
			<div class='header'>
				<div class='label'>SQL miniDoc</div>
				<div class='fas fa-times' onclick='SMDList.hide()'></div>
			</div>

			<input type='text' placeholder='Search dataset and press Enter...' onchange='SMDList.search()' id='${
				Find.replace(SMD.el_list_search, '#', '')
			}'>

			<div class='list' id='${ Find.replace(SMD.el_list_list, '#', '') }'></div>

			<div class='footer'>
				<div class='version'>Version: 1.0.0</div>
				<div class='fas fa-arrows-rotate'></div>
			</div>
		`)
	},

	load_get_dataset () {
		El.append(this.el_main_dataset, `
			<div class='header' id='${ Find.replace(SMD.el_keyword_dataset, '#', '') }'></div>

			<div class='msg' id='${ Find.replace(SMD.el_msg_dataset, '#', '') }'></div>
			<div class='get-def' id='${ Find.replace(SMD.el_def_dataset, '#', '') }'></div>

			<div class='footer'>
				<div class='list-link' onclick='SMDList.show()'>${ SMD.name }</div>
				<div class='fas fa-copy' onclick='SMDGetDataset.copy()'></div>
			</div>
		`)
	},

}