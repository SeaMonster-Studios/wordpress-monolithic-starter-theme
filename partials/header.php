<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

	$logos = get_field('brand_logos', 'brand');
	$not_home_class = is_front_page() ? '' : 'not-home';
?>
<body id="top" <?php body_class($not_home_class); ?>>

<script type="text/javascript">
(function($) {
$('body').hide()
$(window).on('load', function() {
	$('body').show()
})
})(jQuery)
</script>

<?php get_template_part('partials/nav-main'); ?>

<div class="stage" id="app-stage">
	<!-- Header-->
	<header class="site-header" id="site-header">
		<div class="container">
			<nav class="navbar d-flex justify-content-between">
				<div class="d-flex justify-content-start navbar-brand-wrapper">
					<!-- Logo -->
					<a href="/" class="navbar-brand">
						<?php if($logos && $logos['light'] && $logos['dark']): ?>
							<img src="<?php echo $logos['light']; ?>" alt="SITE TITLE" class="logo-light">
							<img src="<?php echo $logos['dark']; ?>" alt="SITE TITLE" class="logo-dark">
						<?php endif; ?>
					</a>
				</div>
				<div id="menu-main-desktop-wrapper"></div>
				<div class="d-flex justify-content-end navbar-desktop-unstage align-items-center">
					<button class="stage-toggle stage-toggle-right" data-target="#app-stage" data-toggle="stage" data-distance="-250">
						<span class="stage-toggle-border-left"></span>
						<span class="stage-toggle-border-top"></span>
						<span class="stage-toggle-border-right"></span>
						<span class="stage-toggle-border-bottom"></span>
						<span class="fas fa-bars stage-toggle-icon"></span>
					</button>
					<div id="menu-social-desktop-wrapper"></div>
				</div>
			</nav>
		</div>
	</header>
