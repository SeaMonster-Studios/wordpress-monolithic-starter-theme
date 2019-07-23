<?php

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
