<?php
/**
 * Default Page Template
 *
 * @author    SeaMonster Studios
 * @package   page
 * @version   2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();
?>

<!-- Main -->
<main role="main" id="main" class="main">
	<section class="container">
		<?php the_content(); ?>
	</section>
</main>

<?php
get_footer();
?>
