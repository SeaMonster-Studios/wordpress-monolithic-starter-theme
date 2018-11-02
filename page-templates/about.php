<?php /* Template Name: About */ ?>
<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header();

$content = get_field('default_template_content');
?>

<main role="main" id="main" class="main">
<section>
	<div class="container">
		<?php if($content): ?>
			<?php echo $content; ?>
		<?php endif; ?>
</section>
</main>

<?php
get_footer();
?>
