const StatusBarLabels = class {

	element
	
	get (items) {
		var labels = [],
			count_labels = 0

		_.forEach(items, item => {
			labels.push(
				El.text(`${ 
					this.element + ' > .' + item 
				}`)
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

			El.append(`${ this.element }`, `
				<div class='label ${
					item.id + ' ' + right
				}'>${
					text
				}</div>
			`)
		})
	}

	del (items) {
		if (items == '*' || items[0] == '*') {
			this.clean()
		} else {
			_.forEach(items, item => {
				El.remove(`${ 
					this.element + ' > .' + item
				}`)
			})
		}
	}
	
	edit (id, text) {
		El.text(`${ 
			this.element + ' > .' + id 
		}`, text)
	}

	constructor(element) { this.element = element }

	clean () { El.empty(`${ this.element } > .label`) }

}