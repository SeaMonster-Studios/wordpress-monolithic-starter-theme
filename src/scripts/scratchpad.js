// START LoadMoreWP
if ($body.hasClass('blog')) {
	new LoadMoreWP({
		initialCount: 11,
		loadCount: 8,
		wrapperSelector: '.posts-tertiary-wrapper'
	})
} else if (
	$body.hasClass('category')
	|| $body.hasClass('tag')
) {
	let tax	
	if ($body.hasClass('category')) tax = 'category'	
	if ($body.hasClass('tag')) tax = 'tag'

	const pattern = new RegExp(`(${tax}-\\d.*\\d|${tax}-\\d)`)
	const taxClass = $body.attr('class').match(pattern)[0]

	if (taxClass && taxClass.length > 0) {
		const taxID = parseInt(taxClass.split(`${tax}-`)[1])
		new LoadMoreWP({
			initialCount: 11,
			loadCount: 8,
			wrapperSelector: '.posts-tertiary-wrapper',
			taxType: tax,
			taxID,
		})
	}
} 
// END LoadMoreWP
// START isotope and filtering for press-articles (press archives page)
const posts_isotope = $('.posts-isotope:not(.posts-news-local)')
if(posts_isotope.length > 0) {
	setIsotope(posts_isotope)

	$('body').hasClass('post-type-archive-press') ?	set_isotope_filters('secondary-nav-press-articles', 'posts-press') : ''

	$('.posts-isotope.bubble-elements').find('.collapse').on('hidden.bs.collapse', function (e) {
		setTimeout(() => $(this).closest('.posts-isotope').isotope('layout'), 0)
	})
}

const posts_isotope_news_local = $('.posts-news-local.posts-isotope')
for (const isotope_container of posts_isotope_news_local) {
	determineIsotopeReady(isotope_container)
}

var determineIsotopeReady_timer
function determineIsotopeReady(isotope_container) {
	if ($(isotope_container).attr('sms-isotope-ready') === 'false') {
		determineIsotopeReady_timer = setInterval(() => determineIsotopeReady(isotope_container), 500)
	} else if ($(isotope_container).attr('sms-isotope-ready') === 'true') {
		clearInterval(determineIsotopeReady_timer)
		setIsotope(isotope_container)
	}
}

function setIsotope(isotope_container) {
	$(isotope_container).isotope({
		itemSelector: '.post-isotope',
		layoutMode: 'masonry',
		percentPosition: true,
		masonry: {
			gutter: 30,
			columnWidth: '.post-grid-sizer'
		}
	})
}

function initIsotopeDesktopOnly (breakpoint, filter_wrapper, selector = 'posts-isotope-desktop-only') {
	if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) {
		if (!$(`.${selector}`).hasClass('has-isotope')) {
			$(`.${selector}`).addClass('has-isotope').isotope({
				itemSelector: '.post-isotope',
				layoutMode: 'fitRows',
			})
			set_isotope_filters(filter_wrapper, selector)
		}
	} else if ($(`.${selector}`).hasClass('has-isotope')) {
		$(`.${selector}`).removeClass('has-isotope').isotope('destroy')
	}
}

if($('.posts-isotope-desktop-only').length > 0) {
	initIsotopeDesktopOnly(992, 'navbar-isotope-filter')
	$(window).on('resize', () => initIsotopeDesktopOnly(992, 'navbar-isotope-filter'))
}
// END isotope and filtering for press-articles (press archives page)

// marquee header - video
if($('.marquee-header-video').length > 0) {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.platform)

	if (isIOS) {

		const canvasVideo = new CanvasVideoPlayer({
			videoSelector: '.marquee-video-video',
			canvasSelector: '.marquee-video-canvas',
			timelineSelector: false,
			autoplay: true,
			makeLoop: true,
			pauseOnClick: false,
			audio: false
		})

	} else {
		// Use HTML5 video
		document.querySelectorAll('.marquee-video-canvas')[0].style.display = 'none'
	}
}

if ($('#nav-secondary').length > 0) {
	StickySecondaryNav = new Sticky({
		id: 'nav-secondary',
		parent: StickyHeader,
		type: 'fixed',
		// container: true,
	})
}else if ($('.breadcrumbs').length > 0) {
	StickySecondaryNav = new Sticky({
		id: 'breadcrumbs',
		parent: StickyHeader,
		type: 'fixed',
		container: true,
	})
}

if (StickySecondaryNav) {
	StickySecondaryNav.$el.on('sticky-set', () => set_isotope_filters('secondary-nav-press-articles', 'posts-press'))
	StickySecondaryNav.$el.on('sticky-unset', () => set_isotope_filters('secondary-nav-press-articles', 'posts-press'))
}
// END Sticky and Desktop Converted Navs

// START Setup AjaxChildPage for Secondary nav's that have child page links
if ($('.navbar-secondary-pagelinks').length > 0) {
	const SecondaryAjaxNav = new AjaxChildPage('navbar-secondary-pagelinks', 'main')
}
// END Setup AjaxChildPage for Secondary nav's that have child page links



function set_isotope_filters (selector_filter, selector_isotope) {
	$(`.${selector_filter}`).find('.filter-option').on('click', function(e) {
		e.preventDefault()
		const filter = $(this).attr('data-filter')

		$(`.${selector_isotope}`).isotope({
			filter: `.filter-${filter}`
		})
	})
}

// START TABS - Active Fix (multiple tabs will be active... maybe something to do with each tab content section containing an owl carousel?)
const nav_tabs = $('.nav-tabs')
if (nav_tabs.length > 0) {
	$(nav_tabs).find('a').on('click', function () {
		const tab_id = $(this).attr('href').split('#')[1]
		$(`#${tab_id}`).siblings().removeClass('active')
	})
}
// END TABS - Active Fix (multiple tabs will be active... maybe something to do with each tab content section containing an owl carousel?)

// START Owl slider examples
$('.tours-slider').find('.owl-carousel').owlCarousel({
	dots: true,
	nav: false,
	loop: true,
	margin: 0,
	items: 1,
	animateOut: 'slideOutUp',
	animateIn: 'slideInUp',
	autoplay: true,
})

$('.learn-slider').find('.owl-carousel').owlCarousel({
	nav: true,
	dots: false,
	center: true,
	loop: true,
	margin: 30,
	items: 2,
	navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
	autoplay: true,
	startPosition: 1,
	responsive : {
		0 : {
			items: 2,
		},
		992 : {
			items: 4,
		},
		1200 : {
			items: 5,
		},
	},
})

$('.tour-media-slider').find('.owl-carousel').owlCarousel({
	dots: false,
	nav: true,
	items: 1,
	stagePadding: 10,
	margin: 5,
	loop: true,
	navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
	responsive: {
		576: {
			stagePadding: 40,
			margin: 15,
		},
		768: {
			stagePadding: 60,
			margin: 20,
		}
	}
})
// END Owl slider examples

// START ISOTOPE on the galleria plugin album grid
const $galleriaAlbum = $('.ngg-pro-album.nextgen_pro_grid_album')
if ($galleriaAlbum.length > 0) {
	$galleriaAlbum.find('.image_container').attr('style', '')
	$galleriaAlbum.find('.nextgen_pro_lightbox').find('source').attr('style', '')
	$galleriaAlbum.find('img').attr('style', '')
	setTimeout(() => {
		$galleriaAlbum.isotope({
			layoutMode: 'masonry',
		})
	}, 0)
}
// END ISOTOPE on the galleria plugin album grid

// START select2 arrow override
let select_arrows = $('.select2-selection__arrow')
for (let i = 0; i <= select_arrows.length; i += 1) {
	const $arrow = $(select_arrows[i])
	if ($arrow) {
		$arrow.find('b').remove()
		$arrow.append('<img src="/wp-content/themes/[THEME_NAME]/assets/build/images/icon-angle-down.svg" alt="arrow down"/>')
	}
}
// END select2 arrow override
