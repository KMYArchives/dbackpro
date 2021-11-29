const EditorAutoload = {

	loader () {
		if (editor == null || editor == undefined) {
			editor = CodeMirror.fromTextArea(document.getElementById(cm_editor), {
				readOnly: true,
				autofocus: true,
				theme: 'default',
				lineNumbers: true,
				autoRefresh: true,
				lineWrapping: true,
				mode: 'text/x-mysql',
				indentWithTabs: true,
				styleActiveLine: true,
				styleSelectedText: true,
				autoCloseBrackets: true,
				scrollbarStyle: 'overlay',
				styleActiveSelected: true,
			})
			
			this.auto_refresh()
		}
	},

	auto_refresh () {
		setInterval( e => {
			editor.refresh()
		}, 100)
	},

}