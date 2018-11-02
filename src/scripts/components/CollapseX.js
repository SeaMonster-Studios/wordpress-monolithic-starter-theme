// Dependencies: Requires use of Bootstrap collapse

class CollapseX {

	static collapseSiblings () {
		const buttons = $('[data-toggle="collapse"]')

		if(buttons.length > 0) {
			for (let i = 0; i <= buttons.length; i+= 1) {
				const button = buttons[i]
				if (button) {
					$(button).on('click', function() {
						const collapse = $(button).parent().parent().find('.collapse')
						collapse.collapse('hide')
					})
				}
			}
		}
	}
}
