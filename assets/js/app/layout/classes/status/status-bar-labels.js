const StatusBarLabels = class {

	element
	
	get (items) {
		var labels = [],
			count_labels = 0

		_.forEach(items, item => {
			labels.push(
				$(`${ 
					this.element + ' > .' + item 
				}`).text()
			)

			count_labels++	
		})

		if (count_labels == 1) {
			return labels[0]
		} else {
			return labels
		}
	}
	
	set (items) {
		var text = '',
			right = ''

		_.forEach(items, item => {
			if (item.right != true) { right = 'right' }
			if (item.text != undefined) { text = item.text }

			$(`${ this.element }`).append(
				`<div class='label ${
					item.id + ' ' + right
				}'>${
					text
				}</div>`
			)
		})
	}

	del (items) {
		if (items == '*' || items[0] == '*') {
			this.clean()
		} else {
			_.forEach(items, item => {
				$(`${ 
					this.element + ' > .' + item
				}`).remove()
			})
		}
	}
	
	edit (id, text) {
		$(`${ 
			this.element + ' > .' + id 
		}`).text(
			text
		)
	}

	constructor(element) { this.element = element }

	clean () { $(`${ this.element } > .label`).empty() }

}