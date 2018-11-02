<?php
	$marquee = sms_marquee_fields();
	$homepage_marquee_fields = get_field('home_template_marquee');
	$tour_meta = get_field('tour_meta');
	$text_position = '';
	$text_color = '';

	if ($homepage_marquee_fields) {
		if ($homepage_marquee_fields['text_position'])
			$text_position = 'marquee-text-position-' . $homepage_marquee_fields['text_position'];

		if ($homepage_marquee_fields['text_color'])
			$text_color = 'color: ' . $homepage_marquee_fields['text_color'] . ';';
	}

	echo $marquee['styles'];
?>
<section class="marquee <?php echo $text_position; ?>" style="<?php echo $text_color; ?>">
	<div class="marquee-content-wrapper container">
		<div class="marquee-content">
			<?php if(is_singular('tours') && $tour_meta && $tour_meta['tag']): ?>
				<div class="badge-wrapper">
					<span class="badge badge-primary badge-pill"><?php echo $tour_meta['tag']; ?></span>
				</div>
			<?php endif; ?>
			<?php if(is_singular('post')): ?>
				<?php
					$category = get_cat_name(wp_get_post_categories($post->ID, array('number' => 1))[0]);
					$category = $category === 'Uncategorized' ? null : $category;

					if($category):
				?>
					<div class="badge-wrapper">
						<span class="badge badge-primary badge-pill"><?php echo $category; ?></span>
					</div>
				<?php endif; ?>
			<?php endif; ?>
			<?php if($marquee['title']) : ?><h1 style="<?php echo $text_color; ?>"><?php echo $marquee['title']; ?></h1><?php endif;?>
			<?php if($marquee['subtitle']) : ?><p class='marquee-subtitle'><?php echo $marquee['subtitle']; ?></p><?php endif;?>
		</div>
		<?php if(is_front_page()): ?>
			<div class="marquee-hint" style="<?php echo $text_color; ?>">
				<span>Scroll</span>
				<?php brand_img('icon-scroll.svg', 'scroll', false, true); ?>
			</div>
		<?php endif; ?>
	</div>
</section>
