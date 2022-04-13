const Attr = {

	set (e, attr, value) {
		El.get(
			e
		).setAttribute(
			attr, value
		)
	},

	get (e, attr) {
		return El.get(
			e
		).getAttribute(
			attr
		)
	},

	remove (e, attr) {
		El.get(
			e
		).removeAttribute(
			attr
		)
	},

	toggle (e, attr) {
		El.get(e).setAttribute(
			attr, El.get(
				e, attr
			) == 'true' ? 'false' : 'true'
		)
	},

	has (e, attr) {
		return El.get(
			e
		).hasAttribute(
			attr
		)
	},

	setData (e, attr, value) {
		El.get(
			e
		).dataset[attr] = value
	},

	getData (e, attr) {
		return El.get(
			e
		).dataset[attr]
	},

	removeData (e, attr) {
		delete El.get(
			e
		).dataset[attr]
	},

	toggleData (e, attr) {
		El.setData(
			e, attr, El.getData(
				e, attr
			) == 'true' ? 'false' : 'true'
		)
	},

	hasData (e, attr) {
		return El.get(
			e
		).dataset.hasOwnProperty(
			attr
		)
	},

}