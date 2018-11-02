// source: https://codepen.io/bebjakub/pen/jWoYEO

class IsotopeFilterGrid {
	constructor($grid, selector, initShow, $filterNav) {
		this.$grid = $grid
		this.selector = selector
		this.$items = $grid.find(selector)
		this.initShow = initShow
		this.$filterNav = $filterNav

		if (this.$grid.length > 0) {
			// init Isotope
			let $container = this.$grid.isotope({
				itemSelector: this.selector,
				percentPosition: true,
				layoutMode: 'fitRows',
				fitRows: {
					gutter: '.gutter-sizer'
				}
			})

			// bind filter button click
			this.$filterNav.on('click', 'span', function () {
				let filterValue = $(this).attr('data-filter')
				$container.isotope({
					filter: `.${filterValue}`
				})
			})

			//****************************
			// Isotope Load more button
			//****************************
			let initShow = this.initShow //number of items loaded on init & onclick load more button
			let counter = initShow //counter for load more button

			loadMore($container, initShow) //execute function onload

			//append load more button
			let buttonStyle
			if (this.$items.length <= initShow) buttonStyle = 'display: none;'
			$container.after(`<button id="load-more" class="btn btn-primary" style="${buttonStyle}"> Load More</button>`)

			//when load more button clicked
			$('#load-more').click(function () {
				if ($('#filters').data('clicked')) {
					//when filter button clicked, set initial value for counter
					counter = initShow
					$('#filters').data('clicked', false)
				}

				counter = counter + initShow

				loadMore($container, counter)
			})

			//when filter button clicked
			$('#filters').click(function () {
				$(this).data('clicked', true)

				loadMore($container, initShow)
			})

			const query_param = window.location.href.split('?filter=')
			if(query_param[1]) setTimeout(() => $('#filters').find(`[data-filter='.${query_param[1]}']`).click(), 0)
		}

		function loadMore($container, toShow) {
			$container.find('.hidden').removeClass('hidden')
			let iso = $container.data('isotope')

			let hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function (item) {
				return item.element
			})
			$(hiddenElems).addClass('hidden')
			$container.isotope('layout')

			//when no more to load, hide show more button
			if (hiddenElems.length == 0) {
				jQuery('#load-more').hide()
			} else {
				jQuery('#load-more').show()
			}
		}
	}
}

(($) => {
	$(window).on('load', () => {

		
	})
})(jQuery)
