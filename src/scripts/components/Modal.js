class Modal {
	constructor(modal_name) {
		this.modal_name = modal_name
		this.$modal = $(`.${modal_name}`)
		this.$toggle = $(`.${this.modal_name}-toggle`)
		this.$active_location = $(`.${this.modal_name}-location`)

		this.$modal.addClass('detached')
		this.$toggle.on('click', (e) => this.handleClick(e))
	}

	handleClick (e) {
		e.preventDefault()

		if (this.$modal.hasClass('detached')) {
			this.$active_location.append(this.$modal)
			this.$modal.removeClass('detached')
		}

		if (this.$modal.hasClass('active')) {
			this.$modal.css('display', 'none')
			$('body').css('overflow', 'initial')
		} else {
			this.$modal.css('display', 'flex')
			$('body').css('overflow', 'hidden')
		}

		setTimeout(() => this.$modal.toggleClass('active'), 0)
	}
}