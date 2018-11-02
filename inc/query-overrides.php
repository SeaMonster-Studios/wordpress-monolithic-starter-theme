<?php
if (!is_admin()) add_filter( 'pre_get_posts', 'filter_get_posts', 10);

function filter_get_posts( $query ) {
		// if (
		// 	is_archive()
		// 	&& false == $query->query_vars['post_parent']
		// 	&& $query->query_vars['post_type'] == 'POST_TYPE_NAME_HERE' // this will make it so you get all posts of this post type
		// )
		// 		$query->set('posts_per_page', -1);

    if ( is_home() || is_category() || is_tag() ) {
			$query->set('posts_per_page', 11);
			$query->set('paged', false);
    }

    // if ($query->query_vars['post_type'] == 'learn') {
    // 	$query->set('meta_key', 'class_order_number');
    // 	$query->set('orderby', 'meta_value');
    // 	$query->set('order', 'ASC');
    // }

		return $query;
}
