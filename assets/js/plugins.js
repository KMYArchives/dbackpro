"use strict";var LinksHistory={},PassVault={},Comments={},Diff={},SyntaxExplained={},Imgur={},Pastebin={},Sumix={},VirusTotal={},EditorAutoload={loader:function(){null!=editor&&null!=editor||(editor=CodeMirror.fromTextArea(document.getElementById(cm_editor),{readOnly:!0,autofocus:!0,theme:"default",lineNumbers:!0,autoRefresh:!0,lineWrapping:!0,mode:"text/x-mysql",indentWithTabs:!0,styleActiveLine:!0,styleSelectedText:!0,autoCloseBrackets:!0,scrollbarStyle:"overlay",styleActiveSelected:!0}),this.auto_refresh())},auto_refresh:function(){setInterval(function(e){editor.refresh()},100)}},EditorConfigs={get:function(){},load:function(){},set:function(e,t){editor.setOption(e,t)}},EditorThemes={themes:function(){return["default","3024-day","3024-night","abcdef","ambiance","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lesser-dark","lucario","material","mbo","mdn-like","midnight","monokai","neo","night","nord","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized","ssms","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"]},change:function(){}};