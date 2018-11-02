// expects DOM els of both the stationary and scroller forms
// expects .scroll-form-content to only exist within the stationary form, as it will be cloned into the scroller form wrapper once activated

class ScrollForm {
	constructor() {
		this.$forms = $('.scroll-form')
		this.$stationaryForm = $('.scroll-form-stationary')
		this.$scrollerForm = $('.scroll-form-scroller')
		this.$waypoint = $('.scroll-form-waypoint')
		this.offset = this.calculateOffset()
		this.clonedContent = false
		this.status = 'stationary'
		this.handleWarnings()

		this.$waypoint.waypoint({
			handler: (direction) => {
				if (direction === 'down' && this.status === 'stationary') {
					this.setScroller()
				} else if (direction === 'up' && this.status === 'scroller') {
					this.setStationary()
				}
			},
			offset: this.offset
		})
	}
	setScroller () {
		this.$stationaryForm.css('opacity', 0)

		if(!this.clonedContent) {
			const content = this.$stationaryForm.find('.scroll-form-content').clone()
			this.$scrollerForm.html(content)
		}

		this.$scrollerForm.css('opacity', 1)
		this.$scrollerForm.find('.scroll-form-content').css('top', this.calculateOffset())
		this.status = 'scroller'
	}
	setStationary () {
		this.$stationaryForm.css('opacity', 1)
		this.$scrollerForm.css('opacity', 0)
		this.status = 'stationary'
	}
	calculateOffset () {
		let offset = 0
		const $header = $('#site-header')
		const $secondaryNav = $('.nav-secondary')

		if ($header) offset += $header.outerHeight()
		if ($secondaryNav) offset += $header.outerHeight()

		return offset
	}
	handleWarnings() {
		if (this.$stationaryForm.length < 1) console.warn('Looks like no `.scroll-form.scroll-form-stationary` element was found. This is required for ScrollForm.js')
		if (this.$scrollerForm.length < 1) console.warn('Looks like no `.scroll-form.scroll-form-scroller` element was found. This is required for ScrollForm.js')
		if (this.$waypoint.length < 1) console.warn('Looks like no `.scroll-form-waypoint` element was found. This is required for ScrollForm.js')
	}
}
