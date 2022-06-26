const TopBar = class {

	element

	render () {
		El.append(this.element, `
			<div class='label'></div>
			
			<nav>
				<div class='label' id='total'></div>
				<div class='custom'></div>
			</nav>
		`)
	}

	clean () { El.empty(this.nav()) }

	constructor (element) { this.element = element }

	append (content) { El.append(this.nav(), content) }

	nav () { return `${ this.element } > nav > .custom` }

	title (text) { El.text(`${ this.element + ' > .label' }`, text) }

	total (items) { El.text(`${ this.element + ' > nav > #total' }`, items) }

}