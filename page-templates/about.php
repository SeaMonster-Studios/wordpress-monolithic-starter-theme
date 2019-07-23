<?php /* Template Name: About */ ?>
<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
?>

<main role="main" id="main" class="main">
<section>
	<div class="container">
			<?php the_content(); ?>
</section>
</main>

<?php
get_footer();
?>
