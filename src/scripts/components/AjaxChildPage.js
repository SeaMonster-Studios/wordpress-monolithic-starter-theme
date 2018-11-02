// Dependencies: jQuery, loader.scss

class AjaxChildPage {
	constructor(nav, content_wrapper) {
		this.$nav = $(`.${nav}`)
		this.$wrapper = $(`.${content_wrapper}`)
		this.wrapper = content_wrapper
		this.$links = this.$nav.find('a')
		this.loader = '<div class="loader-wrapper"><div class="loader"></div</div>'
		this.loader_class = 'loader-wrapper'

		this.handleClick()
	}
	handleClick() {
		const self = this
		this.$links.on('click', function(e) {
			e.preventDefault()
			self.handleContentRemoval(() => {
				self.next_url = $(this).attr('href')
				self.handleGettingContent((success_message) => {
					self.handleUrlUpdate()
					self.handleSettingContent()
				}, (error_message) => {
					self.handleSettingContent(true)
				})
			})
		})
	}
	handleContentRemoval(callback) {
		this.$wrapper.css('height', this.$wrapper.outerHeight())
		this.$wrapper.animate({
			opacity: 0
		}, 150, () => {
			this.content = this.$wrapper.html()
			setTimeout(() => {
				$(this.loader).insertBefore(this.$wrapper).addClass('active')
			}, 0)
			if(callback) callback()
		})
	}
	handleGettingContent(callback_success, callback_fail) {
		$.ajax({
			url: this.next_url,
			context: document.body
		}).done((data) => {
			this.next_title = $(data).filter('title').text()
			this.content = $(data).find(`.${this.wrapper}`)
			callback_success('Ajax succeeded')
		}).fail(() => {
			callback_fail('Ajax failed')
		})
	}
	handleSettingContent(has_error = false) {
		$(`.${this.loader_class}`).removeClass('active')
		setTimeout(() => $(`.${this.loader_class}`).remove() , 0.15)
		this.$wrapper.html(this.content)
		this.trigger('content-set')

		if (has_error && this.$wrapper.find('.ajax-error').length === 0) this.$wrapper.prepend('<h2 class="ajax-error">Error! There was a problem getting that page</h2>')

		this.$wrapper.css('height', 'initial')
		this.$wrapper.animate({
			opacity: 1
		}, 150)
	}
	handleUrlUpdate() {
		window.history.pushState({
			'pageTitle': this.next_title,
		}, '', this.next_url)
	}
}