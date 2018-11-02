<?php

if ( ! defined( 'ABSPATH' ) ) exit;

require_once('inc/admin/includes.php');
require_once('inc/post-duplicator.php');
require_once('inc/register-menus.php');
require_once('inc/development.php');
require_once('inc/utils.php');
require_once('inc/query-overrides.php');
require_once('inc/acf-options-pages.php');
require_once('inc/constants.php');
require_once('inc/assets.php');
require_once('inc/menus.php');

// require_once('inc/bootstrap4-walkers.php');
// require_once('inc/tinymce.php');
// require_once('inc/breadcrumbs.php');
// require_once('inc/LoadMoreWP.php');

// This is useful when you've created a new ACF field with a default value, for a post-type that already has many entries. This will give all the existing posts the default value so you don't have to re-save all of them individually.
// function update_my_metadata(){
//     $args = array(
//         'post_type' => 'post', // Only get the posts
//         'post_status' => 'publish', // Only the posts that are published
//         'posts_per_page'   => -1 // Get every post
//     );
//     $posts = get_posts($args);
//     foreach ( $posts as $post ) {
//         // Run a loop and update every meta data
//         update_post_meta( $post->ID, 'post_type_field_name', 'default_value');
//     }
// }
// // Hook into init action and run our function
// add_action('init','update_my_metadata');
