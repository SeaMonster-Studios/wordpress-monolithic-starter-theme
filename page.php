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
$content = get_field('default_template_content');

?>

<!-- Main -->
<main role="main" id="main" class="main">
	<section class="container">
		<?php if($content): ?>
			<?php echo $content; ?>
		<?php endif; ?>
	</section>
</main>

<?php
get_footer();
?>
