// Dependencies: jQuery
let $ = jQuery
class Nav {
	constructor ({
		source_id,
		target_id,
		target_wrapper_id,
		toggle_class,
		desktop_style = 'dropdown',
		breakpoint = 992,
		default_thumbnail
	}) {
		this.menu_id = `#${source_id}`
		this.desktop_menu_wrapper = $(`#${target_wrapper_id}`)
		this.stage_toggles = $(`.${toggle_class}`)
		this.desktop_menu_id = target_id
		this.breakpoint = breakpoint
		this.desktop_style = desktop_style
		this.unstaged = false
		this.default_thumbnail = default_thumbnail

		this.handleUnstage()
		$(window).on('resize', () => this.handleUnstage())
	}

	handleUnstage () {
		if (
			!this.unstaged
			&& window.matchMedia(`(min-width: ${this.breakpoint}px)`).matches
		) { /* the viewport is at least breakpoint pixels wide */
			this.unstaged = true
			this.stage_toggles.attr('style', 'display: none !important;')

			if (!this.desktop_menu) {
				this.desktop_menu = $(this.menu_id).clone()
					.appendTo(this.desktop_menu_wrapper)
					.attr('id', this.desktop_menu_id)
					.addClass(`${this.desktop_menu_id}-${this.desktop_style}`)

				switch(this.desktop_style) {
				case 'thumbnails':
					if (!this.default_thumbnail) console.error('A default_thumbnail URL is required for a menu with desktop_style of thumbnails.')
					this.convertCollapseToThumbnails(this.desktop_menu_wrapper)
					break
				case 'dropdown':
					this.convertCollapseToDropdown(this.desktop_menu_wrapper)
					break
				default:
					break
				}
			} else {
				this.desktop_menu.show()
			}

		} else if (
			this.unstaged
			&& !window.matchMedia(`(min-width: ${this.breakpoint}px)`).matches
		) { /* the viewport is less than breakpoint pixels wide*/
			this.unstaged = false
			this.stage_toggles.show()
			this.desktop_menu.hide()
		}
	}

	convertCollapseToThumbnails (wrapper) {
		const collapse_toggles = $(wrapper).find('[data-toggle="collapse"]')
		$(wrapper).find('.collapse-wrapper').addClass('thumbnail-dropdown-wrapper').removeClass('collapse-wrapper')
		$(wrapper).find(`#${this.desktop_menu_id}`).removeClass('nav-bordered nav-stacked flex-column').addClass('flex-row')
		collapse_toggles.closest('li').find('> a').attr('data-toggle', '')
		collapse_toggles.remove()
		$(wrapper).find('.collapse').addClass('thumbnail-dropdown-menu').removeClass('collapse')

		const toggles = $(wrapper).find('.thumbnail-dropdown-wrapper')
		const menu_thumbnail_items = $(wrapper).find('.thumbnail-dropdown-menu').find('a')

		for (let menu_thumbnail_item of menu_thumbnail_items) {
			const thumbnail_url = $(menu_thumbnail_item).attr('data-thumbnail') ? $(menu_thumbnail_item).attr('data-thumbnail') : this.default_thumbnail
			const text = $(menu_thumbnail_item).text()
			const html = `
				<div class="thumbnail-dropdown-item-image">
					<img src="${thumbnail_url}" alt="${text}">
				</div>
				<div class="thumbnail-dropdown-item-text">
					${text}
				</div>
			`
			$(menu_thumbnail_item).addClass('thumbnail-dropdown-item').html(html)
		}
	}

	convertCollapseToDropdown (wrapper) {
		const collapse_toggles = $(wrapper).find('[data-toggle="collapse"]')
		$(wrapper).find('.collapse-wrapper').addClass('dropdown').removeClass('collapse-wrapper')
		$(wrapper).find('.collapse').addClass('dropdown-menu').removeClass('collapse')
		$(wrapper).find('.dropdown-menu').find('> .menu-item').addClass('dropdown-item')
		$('#menu-header-desktop').find('a').on('click', function () {
			document.location = $(this).attr('href')
		})
		$(wrapper).find(`#${this.desktop_menu_id}`).removeClass('nav-bordered nav-stacked flex-column').addClass('flex-row')
		collapse_toggles.closest('li').find('> a').attr('data-toggle', 'dropdown').addClass('dropdown-toggle')
		collapse_toggles.remove()

		const $menus = $(wrapper).find('.dropdown-menu')
		if ($menus.length > 0) {
			$menus.dropdown()

			for (let i = 0; i <= $menus.length; i++) {
				const menu = $menus[i]
				if (menu) {
					const $menu = $(menu)

					// Add parent item before menu
					const $parent_link = $menu.closest('li').find('> a').clone().addClass('parent-link').removeClass('dropdown-toggle').removeAttr('data-toggle')

					if ($parent_link.length > 0) {
						$menu.prepend(`<li>
							<a href="${$parent_link.attr('href')}"
								class="${$parent_link.attr('class')}">
								${$parent_link.text()}
							</a>
						</li>`)
					}

					// center dropdown menu
					// const parent_width = $menu.closest('li').innerWidth()
					// const menu_width = $menu.outerWidth()
					// const menu_padding = 20
					// const pull = `${(-menu_width / 2) + (parent_width / 2) - menu_padding}px`
					// $menu.css({
					// 	width: menu_width + menu_padding * 2,
					// 	left: pull
					// })

					// disable tertiary dropdowns
					const $dropdown = $menu.find('.dropdown')
					$dropdown.find('.dropdown-menu').remove()
					$dropdown.find('.dropdown-toggle').removeClass('dropdown-toggle').removeAttr('data-toggle')
					$dropdown.removeClass('dropdown').removeClass('menu-item-has-children')
				}
			}
		}
	}

	hideOpenSiblingMenus () {
		const collapsibles = $(this.menu_id).find('[data-target^="#collapseID-"]')
		for (let collapsible of collapsibles) {
			$(collapsible).on('click', function() {
				$(this).closest('ul').find('[id^="collapseID-"]').collapse('hide')
			})
		}
	}
}
