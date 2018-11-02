<?php

function my_login_logo() { ?>
	<style type="text/css">
		#login h1 a,
		.login h1 a {
			background-image: url(<?php echo get_stylesheet_directory_uri() . '/assets/build/images/logo.svg'; ?>);
			background-size: 300px;
		}
	</style>
<?php }

add_action( 'login_enqueue_scripts', 'my_login_logo', 10 );
