const Apis = {

	core () { return `http://localhost/website/apis/` },

	workspace () { return `http://localhost/workspace/apis/` },

	gravatar (gravatar, size = 300) { return `https://s.gravatar.com/avatar/${ gravatar }?s=${ size }` },
	
}