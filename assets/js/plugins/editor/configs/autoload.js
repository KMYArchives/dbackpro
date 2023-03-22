const EditorAutoload = {

	auto_refresh () {
		setInterval( e => {
			editor.refresh()

			// Plugin's
			SMDGet.get()
			ShotLink.watch()
		}, 100)
	},

	loader (el = el_editor) {
		if (editor == null || editor == undefined) {
			editor = CodeMirror.fromTextArea(
				document.getElementById(
					Find.replace(
						el, '#', ''
					)
				), 
			{
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

	getValue () { return editor.getDoc().getValue() },

	setValue (code) { editor.getDoc().setValue(code) },

}