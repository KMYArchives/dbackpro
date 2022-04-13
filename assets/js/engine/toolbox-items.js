var toolbox_loader = new Toolbox(el_toolbox)

const ToolboxTabs = {

	official () {
		toolbox_loader.clean()

		Classes.remove(`#third-party`, act_class)
		Classes.add(`#official`, act_class)

		toolbox_loader.set([
			{
				id: 'sumix',
				text: 'Sumix',
				click: 'Hello world()'
			},
			{
				id: 'pass-vault',
				text: 'Pass Vault',
				click: 'Hello world()'
			},
			{
				id: 'links-history',
				text: 'Links history',
				click: `Windows.open('links')`
			},
		])
	},

	third_party () {
		toolbox_loader.clean()

		Classes.remove(`#official`, act_class)
		Classes.add(`#third-party`, act_class)

		toolbox_loader.set([
			{
				id: 'imgur',
				text: 'Imgur',
				click: 'Hello world()'
			},
			{
				id: 'pastebin',
				text: 'Pastebin',
				click: 'Hello world()'
			},
			{
				id: 'virustotal',
				text: 'VirusTotal',
				click: 'Hello world()'
			},
		])
	},

}