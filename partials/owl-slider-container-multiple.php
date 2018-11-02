<?php
	$args = array(
		'post_type' => 'learn',
		'post_status' => 'publish',
		'posts_per_page' => 10,
	);
	$the_query = new WP_Query( $args );
?>

<?php if($the_query->have_posts()): ?>
	<section class="owl-slider-container-multiple">
		<div class="owl-carousel">
			<?php while( $the_query->have_posts() ): $the_query->the_post(); ?>
				<?php
					$img_url = get_the_post_thumbnail_url();
					$title = get_the_title();

					if (
						$img_url
						&& $title
					) :
				?>
					<a href="<?php the_permalink(); ?>" class="slide">
						<img src="<?php echo $img_url; ?>" alt="<?php echo $title; ?>">
					</a>
				<?php endif; ?>
			<?php endwhile;?>
		</div>
		<div class="container">
			<div class="btn-wrapper text-center"><a class="btn btn-primary" href="/learn">See All Classes</a></div>
		</div>
	</section>
<?php endif; ?>

<?php wp_reset_postdata(); ?>
