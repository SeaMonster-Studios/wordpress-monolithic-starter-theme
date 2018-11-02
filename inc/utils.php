<?php

function sms_marquee_fields($get_title = true, $count = null, $desktop = null, $tablet = null, $mobile = null) {
	$ID = sms_cat_ID();
	$return = array();
	$css_selector = isset($count) ? '.marquee-item-' . $count : '.marquee';

	if ($get_title) {
		$title = get_field('meta_alternative_title', $ID);
		$subtitle = get_field('meta_subtitle', $ID);

		// Get page title if no alt title is input by user
		if (!$title) $title = get_the_title($ID);

		$return['title'] = $title;
		$return['subtitle'] = $subtitle;

		if(is_404()) {
			$return['title'] = '404';
			$return['subtitle'] = 'This is not the page you\'re looking for.';
		} elseif (is_search()) {
			$return['title'] = 'Search Results';
		} elseif (is_category()) {
			$return['subtitle'] = single_cat_title('', false);
		}
	}

	if (!isset($desktop)) {
		$desktop = get_field('featured_image_desktop_marquee', $ID);
		$tablet = get_field('featured_image_tablet_marquee', $ID);
		$mobile = get_field('featured_image_mobile_marquee', $ID);

		// Get marquee image defaults if page doesn't have custom marquee
		if (!$desktop) {
			$default_marquee = get_field('brand_default_marquee', 'brand');
			$desktop = $default_marquee['desktop'];
			$tablet = $default_marquee['tablet'];
			$mobile = $default_marquee['mobile'];
		}
	}

	// Determine img src, srcset, and sizes attributes
	if(!$tablet && !$mobile) { // desktop only
		ob_start(); ?>
			<style scoped>
				<?php echo $css_selector; ?> { background-image: url(<?php echo $desktop; ?>); }
			</style>
		<?php
		$return['styles'] = ob_get_clean();
	} elseif (!tablet) { // desktop & mobile
		ob_start(); ?>
			<style scoped>
				<?php echo $css_selector; ?> { background-image: url(<?php echo $mobile; ?>); }

				@media (min-width: 480px) {
					<?php echo $css_selector; ?> { background-image: url(<?php echo $desktop; ?>); }
				}
			</style>
		<?php
		$return['styles'] = ob_get_clean();

	} elseif (!mobile) { // desktop & tablet
		ob_start(); ?>
			<style scoped>
				<?php echo $css_selector; ?> { background-image: url(<?php echo $tablet; ?>); }

				@media (min-width: 1025px) {
					<?php echo $css_selector; ?> { background-image: url(<?php echo $desktop; ?>); }
				}
			</style>
		<?php
		$return['styles'] = ob_get_clean();

	} elseif ($mobile && $tablet) { // all sizes
		ob_start(); ?>
			<style scoped>
				<?php echo $css_selector; ?> { background-image: url(<?php echo $mobile; ?>); }

				@media (min-width: 480px) {
					<?php echo $css_selector; ?> { background-image: url(<?php echo $tablet; ?>); }
				}

				@media (min-width: 1025px) {
					<?php echo $css_selector; ?> { background-image: url(<?php echo $desktop; ?>); }
				}
			</style>
		<?php
		$return['styles'] = ob_get_clean();
	}

	return $return;
}

function sms_cat_ID() {
	$ID = get_the_ID();
	// the 'cpt_*' is determined by functionality in the parent theme... it creates an options index page for each custom post type and gives it the id that we're assigning to the variable for each custom post type page

	if (is_home() || is_category()) {
		$ID = 'blog_index';
	// } else if (is_post_type_archive('learn')) {
	// 	$ID = 'cpt_learn';
	} else if (is_singular('post')) {
		return $ID;
	} else if (!is_page()) {
		$post_type = get_post_type();
		$ID = 'cpt_' . $post_type;
	}
	return $ID;
}

function excerpt($limit) {
	$excerpt = explode(' ', get_the_excerpt(), $limit);

	if (count($excerpt) >= $limit) {
			array_pop($excerpt);
			$excerpt = implode(" ", $excerpt) . '....';
	} else {
			$excerpt = implode(" ", $excerpt);
	}

	$excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);

	return $excerpt;
}

function excerpt_of($markup, $limit) {
	$excerpt = preg_grep("/(<p>.*<\/p>)/", explode("\n", $markup));
	$excerpt = implode($excerpt);
	$excerpt = explode(' ', $excerpt, $limit);

	if (count($excerpt) >= $limit) {
			array_pop($excerpt);
			$excerpt = implode(" ", $excerpt) . '...';
	} else {
			$excerpt = implode(" ", $excerpt);
	}

	$excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);

	return $excerpt;
}

function the_post_type() {
	global $post;

	$type = get_post_type($post);

	if ($type === 'post') {
		echo 'Blog Post';
		return;
	}

	echo ucwords($type);
	return;
}

function brand_img ($file, $alt = 'photo', $hi_res = true, $svg = false) {
	$file = explode('.', $file);
	$name = $file[0];
	$ext = $file[1];

	if ($hi_res) : ob_start(); ?>
		<img src="<?php echo BUILD_PATH . 'images/' . $name . '.' . $ext; ?>" alt="<?php echo $alt; ?>"
			srcset="
				<?php echo BUILD_PATH . 'images/' . $name . '.' . $ext . ' 1x,'; ?>
				<?php echo BUILD_PATH . 'images/' . $name . '@2x.' . $ext . ' 2x,'; ?>
			"
			<?php if($svg) echo 'class="svg"'; ?>
		>
	<?php else : ob_start() ?>
		<img src="<?php echo BUILD_PATH . 'images/' . $name . '.' . $ext; ?>" alt="<?php echo $alt; ?>"
			<?php if($svg) echo 'class="svg"'; ?>
		>
	<?php endif;

	echo ob_get_clean();
}

function related_posts ($related_posts) {
	$posts;
	if ($related_posts && count($related_posts) > 0) {
		$posts = $related_posts;
	} else {

		$args = array(
			'posts_per_page' => 4,
			'paged' => false,
			'post_type' => 'post',
		);

		$posts_query = new WP_Query( $args );
		if ($posts_query->have_posts()) $posts = $posts_query->posts;
	}	

	foreach ($posts as $post) : ?>
		<?php
			$category = get_cat_name(wp_get_post_categories($post->ID, array('number' => 1))[0]);
			$category = $category === 'Uncategorized' ? null : $category;

			$src = get_field('post_featured_image_small', $post->ID);
			if (!$src) $src = get_field('featured_image_desktop_marquee', $post->ID);

			$title = get_the_title($post->ID);
			$permalink = get_the_permalink($post->ID);

			if (
				$src
				&& $title
				&& $permalink
			) : ob_start(); ?>
			<article class="post-blog post-blog-nonprimary post-blog-nonprimary-related-post">
				<figure>
					<a href="<?php echo $permalink; ?>" class="img-wrapper">
						<img src="<?php echo $src; ?>" alt="featured image of post: <?php echo $title; ?>">
					</a>
					<figcaption>
						<?php if($category): ?>
							<h5><?php echo $category; ?></h5>
						<?php endif; ?>
						<h3><a href="<?php echo $permalink; ?>"><?php echo $title; ?></a></h3>
					</figcaption>
				</figure>
			</article>
		<?php endif; ?>
	<?php endforeach;

	wp_reset_postdata();
	return ob_get_clean();
}
