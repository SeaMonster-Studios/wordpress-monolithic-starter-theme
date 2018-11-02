<?php // identical to index.php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
?>

<!-- MAIN -->
<main role="main" id="main" class="main">
	<section class="posts posts-blog">
		<div class="container">
			<?php if(have_posts()): ?>
				<?php while( have_posts() ): the_post(); ?>
					<article class="post-blog post-blog">
						<figure>
							<a href="<?php the_permalink(); ?>" class="img-wrapper">
								<img src="<?php the_post_thumbnail_url(); ?>" alt="featured image of post: <?php the_title(); ?>">
							</a>
							<figcaption>
								<h3><?php the_title(); ?></h3>
								<p><?php echo excerpt(30); ?></p>
								<p><a href="<?php the_permalink(); ?>" class="btn btn-primary">Read On</a></p>
							</figcaption>
						</figure>
					</article>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
</section>
</main>

<!-- Footer  -->
<?php
get_footer();
?>
