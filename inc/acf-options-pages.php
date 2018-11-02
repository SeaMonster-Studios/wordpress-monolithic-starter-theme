<?php

if ( function_exists( 'acf_add_options_sub_page' ) ){
	// remove Configuration page that's in the parent theme, don't remove it form there since we need the upstream to be backwards compatible
	// acf_add_options_page(array(
	// 	'page_title' => 'Configuration',
	// 	'capability' => '',
	// ));

	acf_add_options_page(array(
		'page_title' => 'Brand',
		'menu_title' => '',
		'menu_slug' => '',
		'capability' => 'edit_posts',
		'position' => '2.1',
		'parent_slug' => '',
		'icon_url' => 'dashicons-art',
		'redirect' => true,
		'post_id' => 'brand',
		'autoload' => false,
	));

	// acf_add_options_page(array(
	// 	'page_title' 	=> 'Reusables',
	// 	'menu_title'	=> '',
	// 	'menu_slug' 	=> 'reusables',
	// 	'post_id' => 'reusables',
	// 	'capability'	=> 'edit_posts',
	// 	'redirect'		=> false,
	// 	'position' => '2.2',
	// 	'icon_url' => 'dashicons-layout',
	// ));
}
