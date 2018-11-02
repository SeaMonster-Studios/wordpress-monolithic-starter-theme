<?php
/**
 * The template for displaying Search results
 *
 *
 * @author    Stephen Scaff
 * @package   jumpoff/archive
 * @version   1.0
 */
if ( ! defined( 'ABSPATH' ) ) exit;
get_header();
$search_query = get_search_query();
?>

<main role="main" class="container main" id="main">
	<section>
		<?php if($wp_query->have_posts()): ?>
			<p>
				Your Search for <strong><?php echo htmlspecialchars(get_search_query()); ?></strong> yielded <?php echo $wp_query->found_posts; ?>
				<?php if ($wp_query->found_posts == 1) : ?>
					result.
				<?php else: ?>
					results.
				<?php endif; ?>
		</p>
		<?php else: ?>
			<p>Your Search for <strong><?php echo htmlspecialchars(get_search_query()); ?></strong> yielded <?php echo $wp_query->found_posts; ?> results. Please <button class="search-modal-toggle">try your search again</button>.</p>
		<?php endif; ?>
	</section>
	<section class="posts posts-search">
		<?php
			while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>

					<article class="post post-search d-flex post-type-<?php echo $post_type; ?> flex-column flex-md-row">
						<a href="<?php the_permalink(); ?>" class="img-wrapper">
							<img src="<?php the_post_thumbnail_url(); ?>" alt="img related to <?php the_title(); ?>">
						</a>
						<div class="post-content">
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p><?php echo excerpt(get_the_content(), 40); ?></p>
							<p class="read-more"><a href="<?php the_permalink(); ?>">Read More</a></p>
						</div>
					</article>

			<?php endwhile;
		?>
	</section>
</main>

<!-- Footer -->
<?php get_footer(); ?>
