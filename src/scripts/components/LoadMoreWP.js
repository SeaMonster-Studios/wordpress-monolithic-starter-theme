class LoadMoreWP {
	constructor ({ initialCount = 6, postType = 'post', wrapperSelector, loadCount = 6, taxID = false, taxType = false }) {
		this.wrapperSelector = wrapperSelector
		this.currentCount = initialCount
		this.loadCount = loadCount
		this.initialCount = initialCount
		this.skipCount = initialCount
		this.loadedOnce = false
		this.taxID = taxID
		this.taxType = taxType
		this.getPosts()
	}

	getPosts (callback) {
		$.ajax(`/wp-json/sms/v1/load-more?post-type=post&skip-count=${this.skipCount}&load-count=${this.loadCount}${this.taxID && this.taxType ? `&taxID=${this.taxID}&taxType=${this.taxType}` : ''}`)
			.done(data => {
				this.hasNextPosts = data.hasNextPosts

				if (this.$button && !data.hasNextPosts) {
					this.destroyLoadMoreButton()
				}

				if (data.posts.length > 0) {
					this.posts = data.posts
					this.brand = data.brand
					this.skipCount += this.loadCount

					if (!this.loadedOnce) {
						this.initLoadMoreButton()
					} else {
						if (callback) callback()
					}
				}
			})
			.fail(err => console.error('error', err))
	}

	initLoadMoreButton () {
		$(this.wrapperSelector).after(`
			<div class="sms-load-more">
				<div class="lds-ripple loader-hide"><div></div><div></div></div>
				<div class="btn-wrapper">
					<button class="btn btn-primary">Load More</button>
				</div>
			</div>
		`)

		this.$button = $('.sms-load-more')
		this.$loader = this.$button.find('.lds-ripple')

		this.$button.find('.btn').on('click', () => {
			if (!this.loadedOnce) {
				this.loadPosts()
				this.loadedOnce = true
				if (!this.hasNextPosts) this.destroyLoadMoreButton()
			} else {
				this.$loader.removeClass('loader-hide')
				this.getPosts(() => this.loadPosts())
			}
		})
	}
	destroyLoadMoreButton () {
		this.$button.animate({
			opacity: 0,
		}, 300, () => this.$button.remove())
	}
	loadPosts () {
		let postsMarkup = ''

		for (let i = 0; i <= this.posts.length; i++) {
			const post = this.posts[i]
			if(post) {
				// Change markup per your design
				postsMarkup += `
					<article class="post-blog post-blog-nonprimary">
						<figure>
							${this.renderCustomFeaturedImage(post)}
							<figcaption>
								${post.category ? `<h5>${post.category}</h5>` : ''}
								<h3><a href="${post.permalink}">${post.post_title}</a></h3>
							</figcaption>
						</figure>
					</article>
				`
			}
		}
		$(this.wrapperSelector).append(postsMarkup)
		this.$loader.addClass('loader-hide')
	}
	renderAuthor(author) {
		if (author) {
			return `
				<p class="blog-item-author"><i class="fa fa-pencil"></i> ${author}</p>
			`
		} else return ''
	}
	renderCustomFeaturedImage(post) {
		let src = post.acf.post_featured_image_small ? post.acf.post_featured_image_small : post.acf.featured_image_desktop_marquee

		if (!src) src = this.brand.defaultMarquee.desktop

		return `
			<a href="${post.permalink}" class="img-wrapper">
				<img src='${src}' alt='featured image of post: ${post.post_title}'/>
			</a>
		`
	}
}
