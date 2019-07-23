<div role="navigation" class="stage-shelf stage-shelf-right" id="sidebar">

	<button class="stage-toggle" data-toggle="stage" data-target="#app-stage"><span class="fal fa-times"></span></button>

	<?php
		wp_nav_menu(array(
			'theme_location' => 'header-menu',
			'menu_class' => 'nav nav-bordered nav-stacked flex-column navbar-nav',
			'container' => '',
		));
	?>

		<ul id="menu-social" class="d-flex">
			<li>
				<button class="search-modal-toggle"><span class="fas fa-search"></span></button>
			</li>
			<?php get_template_part('partials/social-links'); ?>
		</ul>
</div>
