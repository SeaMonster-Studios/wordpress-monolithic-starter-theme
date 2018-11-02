<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
?>

<?php while (have_posts()) : the_post(); ?>
	<main role="main" id="main" class="main">
		<section>
			<article class="container">
				<?php the_content(); ?>
			</article>
		</section>
	</main>
<?php endwhile; ?>
<?php get_footer(); ?>
