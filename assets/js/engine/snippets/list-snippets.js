const ListSnippets = {

	list () {
		topbar_loader.clean()
		El.empty(el_list_content)

		DBX.select([
			'slug', 'name', 'database', 'added_in'
		]).from(
			'snippets'
		).then( callback => {
			if (callback.length > 0) { 
				callback.forEach( snippet => {
					this.item_layout(snippet)
				})
			} else {
				El.append(el_list_content, `
					<div class="zero">No snippet's</div>
				`)
			}
		})
	},

	total () {
		DBX.count(
			'*'
		).from(
			'snippets'
		).then( callback => {
			topbar_loader.total(`${ callback[0]['count(*)'] } item's`)
		})
	},

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'list-databases',
				icon: 'fas fa-arrow-left',
				title: "Back to databases",
				click: 'MySQL_ListDatabases.page_load()'
			},
			{
				actived: true,
				icon: 'fas fa-desktop',
				id: 'list-snippet-desktop',
				title: "List local snippets",
				click: 'ListSnippets.page_load()'
			},
			{
				icon: 'fas fa-cloud',
				id: 'list-snippet-cloud',
				title: "List cloud snippets",
				click: 'Hello.world()'
			},
		])
	},

	top_bar () {
		this.total()
		topbar_loader.clean()
		topbar_loader.title('Snippets')
	},

	page_load () {
		this.list()
		this.top_bar()
		this.sidebar()

		Storage.delete('snippetSelected')
	},

	item_layout (snippet) {
		El.append(el_list_content, `
			<div class="item">
				<div onclick="GetSnippet.get('${ snippet.slug }')">
					<div class="icon">
						<div class="fas fa-code"></div>
					</div>

					<div class="field1">${ Str.cut(snippet.name, 40) }</div>
					<div class="field2">${ Str.cut(snippet.database, 24) }</div>
					<div class="field3">${ snippet.added_in }</div>
				</div>

				<div class="menu">
					<div class="fas fa-cloud-arrow-up" onclick="Hello.world('${ snippet.slug }')"></div>
					<div class="fas fa-trash-alt" onclick="DeleteSnippet.confirm('${ snippet.slug }')"></div>
				</div>
			</div>
		`)
	},

}