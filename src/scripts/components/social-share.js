(function ($) {
	$(document).ready(() => {
		const $post_social = $('.post-social')

		if ($post_social.length > 0) {
			const $facebook_button = $('.post-social-facebook')
			const permalink = $facebook_button.attr('data-permalink')

			var getFacebookCount = function () {
				$.getJSON(`https://graph.facebook.com/${permalink}`, data => {
					const facebookShares = data.share.share_count
					if (facebookShares !== undefined) {
						$facebook_button.find('.share-count').text(facebookShares)
					}
				})
			}

			getFacebookCount()
		}
	})
})(jQuery)
