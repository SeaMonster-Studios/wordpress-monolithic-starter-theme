// Dependencies: jQuery, Waypoints, sticky.scss
// Class shouldn't be called outside of document.ready

class Sticky {

	constructor ({
		id,
		offset = 0,
		stage,
		type = 'fixed',
		container = false,
		parent = false
	}) {
		this.insurance()

		$(window).on('load', () => {
			this.selector = id
			this.$el = $(`#${id}`)
			this.el = document.getElementById(this.selector)
			this.height = () => this.$el.outerHeight()
			this.parent = parent
			this.offset = () => this.parent ? this.parent.height() : 0
			this.stage = $(stage)
			this.type = type
			this.container = container
			this.container_added = false
			this.waypoint_selector = `${this.selector}-waypoint`
			this.create_ghost()

			// Browsers have a bug where they can't display a fixed child inside of a parent that is being transformed... which is what this becomes when the stage opens up. As such, we can use 'sticky' instead of fixed, but this doesn't work in any microsoft browsers. Ref: https://stackoverflow.com/questions/2637058/positions-fixed-doesnt-work-when-using-webkit-transform
			if (this.type === 'sticky' && !this.isMSI()) {
				this.position = 'sticky'
				this.$el.addClass('sticky-sticky')
			} else {
				this.position = 'fixed'
				this.$el.addClass('sticky-fixed')
			}

			if (this.stage) this.handle_mobile_stage()

			this.set_waypoints((direction) => this.handle_waypoints(direction))
			$(window).resize(() => {
				this.height()

				this.set_waypoints((direction) => this.handle_waypoints(direction), true)
			})
		})
	}

	insurance () { // prevents waypoints from triggering while the page is being painted
		$('html, body').animate({
			scrollTop: 0
		}, 0)
	}

	fixit() {
		if (this.position === 'fixed') {
			this.ghost.css({
				height: this.height() - 1 // the difference of height of waypoints
			})
		}

		if (this.container && !this.container_added) {
			this.container_added = true
			this.addContainer()
		}

		this.$el
			.addClass('sticky')
			.css({
				top: this.offset(),
			})

		if (this.parent) this.parent.$el.addClass('sticky-child-active')

		this.$el.trigger('sticky-set')
	}

	unfixit () {
		this.ghost.css({
			height: 1
		})

		if (this.container && this.container_added) {
			this.container_added = false
			this.removeContainer()
		}

		this.$el
			.css({
				top: 0
			})
			.removeClass('sticky')

		if (this.parent) this.parent.$el.removeClass('sticky-child-active')

		this.$el.trigger('sticky-unset')
	}

	addContainer () {
		this.$el.html(`
		<div class="container">
			${this.$el.html()}
		</div>
	`)
	}

	removeContainer () {
		this.$el.html(this.$el.find('.container').html())
	}

	create_ghost() {
		$(`<div id="${this.selector}-ghost"  style="height: 1px; width: 100%;"></div>`).insertBefore(this.$el)
		this.ghost = $(`#${this.selector}-ghost`)
	}

	handle_waypoints (direction) {
		if(this.height() > 0) {
			direction === 'down'
				? this.fixit()
				: this.unfixit()
		}
	}

	set_waypoints (callback, reset = false) {
		if (reset && this.waypoint) {
			this.waypoint[0].destroy()
		} else {
			$(`<div class="${this.waypoint_selector}"  style="width: 100%; height: 1px;"></div>`).insertBefore(this.$el)
		}
		if (!this.$waypoint) this.$waypoint = $(`.${this.waypoint_selector}`)

		if(!this.$el.css('margin-top')) console.error('Wo! Looks like you\'re missing something. We couldn\'t find the margin property with on the el.')

		// if (this.$waypoint.length > 1) {
		if (this.$waypoint.length > 0) {
			this.waypoint = this.$waypoint.waypoint({
				handler: callback,
				offset: this.offset()
			})
		}
	}

	handle_mobile_stage () {
		this.stage.css({
			position: 'fixed',
			overflowY: 'scroll'
		})
	}

	isMSI() {
		if (/MSIE 10/i.test(navigator.userAgent)) {
			// This is internet explorer 10
			return true
		}

		if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
		// This is internet explorer 9 or 11
			return true
		}

		if (/Edge\/\d./i.test(navigator.userAgent)){
			// This is Microsoft Edge
			return true
		}

		return false
	}
}
