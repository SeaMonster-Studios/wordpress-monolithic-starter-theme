<?php

// works for singular posts to display next and previous post
function custom_breadcrumbs_simple() {
	$next_post = get_next_post();
	$prev_post = get_previous_post();
}

function custom_breadcrumbs() {
    $separator = '/';
    $breadcrums_id = 'breadcrumbs';
    $breadcrums_class = 'breadcrumbs';
    $home_title = 'Home';
    // If you have any custom post types with custom taxonomies, put the taxonomy name below (e.g. product_cat)
    $custom_taxonomy = 'product_cat';
    // Get the query & post information
    global $post,$wp_query;
    // Do not display on the homepage
    if ( !is_front_page() ) {
    // Build the breadcrums
        echo '<ul id="' . $breadcrums_id . '" class="' . $breadcrums_class . '">';
    // Home page
        echo '<li class="breadcrumb-item item-home"><a class="bread-link bread-home" href="' . get_home_url() . '" title="' . $home_title . '">' . $home_title . '</a></li>';
        echo '<li class="separator separator-home"> ' . $separator . ' </li>';
        if ( is_archive() && !is_tax() && !is_category() && !is_tag() && !is_author() ) {
            echo '<li class="breadcrumb-item item-current item-archive"><span class="bread-current bread-archive">' . post_type_archive_title() . '</span></li>';
        } else if ( is_archive() && is_tax() && !is_category() && !is_tag() ) {
            // If post is a custom post type
            $post_type = get_post_type();
            // If it is a custom post type display name and link
            if($post_type != 'post') {
                $post_type_object = get_post_type_object($post_type);
								$post_type_archive = get_post_type_archive_link($post_type);
								$post_type_archive_url = '/' . $post_type_object->rewrite['slug'];
                echo '<li class="breadcrumb-item item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="' . $post_type_archive_url . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';
                echo '<li class="separator"> ' . $separator . ' </li>';
            }
            $custom_tax_name = get_queried_object()->name;
            echo '<li class="breadcrumb-item item-current item-archive"><span class="bread-current bread-archive">' . $custom_tax_name . '</span></li>';
        } else if ( is_single() ) {
            // If post is a custom post type
            $post_type = get_post_type();
						// If it is a custom post type display name and link
						if ($post_type != 'post') {
                $post_type_object = get_post_type_object($post_type);
								$post_type_archive = get_post_type_archive_link($post_type);
								$post_type_archive_url = '/' . $post_type_object->rewrite['slug'];
                echo '<li class="breadcrumb-item item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="' . $post_type_archive_url . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';
                echo '<li class="separator"> ' . $separator . ' </li>';
            } else {
							echo '<li class="breadcrumb-item item-cat"><a class="bread-cat" href="' . get_post_type_archive_link('post') . '" title="Blog">Blog</a></li>';
							echo '<li class="separator"> ' . $separator . ' </li>';
						}

						echo '<li class="breadcrumb-item item-current item-' . $post->ID . '"><span class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</span></li>';
        } else if ( is_category() ) {
            // Category page
            echo '<li class="breadcrumb-item item-current item-cat"><span class="bread-current bread-cat">' . single_cat_title('', false) . '</span></li>';
        } else if ( is_page() ) {
            // Standard page
            if( $post->post_parent ){
            // If child page, get parents
                $anc = get_post_ancestors( $post->ID );
                // Get parents in the right order
                $anc = array_reverse($anc);
								// Parent page loop
								$parents = '';
                foreach ( $anc as $ancestor ) {
                    $parents .= '<li class="breadcrumb-item item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . get_permalink($ancestor) . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
                    $parents .= '<li class="separator separator-' . $ancestor . '"> ' . $separator . ' </li>';
                }
                // Display parent pages
                echo $parents;
                // Current page
                echo '<li class="breadcrumb-item item-current item-' . $post->ID . '"><span title="' . get_the_title() . '"> ' . get_the_title() . '</span></li>';
            } else {
                // Just display current page if not parents
                echo '<li class="breadcrumb-item item-current item-' . $post->ID . '"><span class="bread-current bread-' . $post->ID . '"> ' . get_the_title() . '</span></li>';
            }
        } else if ( is_tag() ) {
            // Tag page
            // Get tag information
            $term_id       = get_query_var('tag_id');
            $taxonomy      = 'post_tag';
            $args          = 'include=' . $term_id;
            $terms         = get_terms( $taxonomy, $args );
            $get_term_id   = $terms[0]->term_id;
            $get_term_slug = $terms[0]->slug;
            $get_term_name = $terms[0]->name;
            // Display the tag name
            echo '<li class="breadcrumb-item item-current item-tag-' . $get_term_id . ' item-tag-' . $get_term_slug . '"><span class="bread-current bread-tag-' . $get_term_id . ' bread-tag-' . $get_term_slug . '">' . $get_term_name . '</span></li>';
        } elseif ( is_day() ) {
            // Day archive
            // Year link
            echo '<li class="breadcrumb-item item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></li>';
            echo '<li class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </li>';
            // Month link
            echo '<li class="breadcrumb-item item-month item-month-' . get_the_time('m') . '"><a class="bread-month bread-month-' . get_the_time('m') . '" href="' . get_month_link( get_the_time('Y'), get_the_time('m') ) . '" title="' . get_the_time('M') . '">' . get_the_time('M') . ' Archives</a></li>';
            echo '<li class="separator separator-' . get_the_time('m') . '"> ' . $separator . ' </li>';
            // Day display
            echo '<li class="breadcrumb-item item-current item-' . get_the_time('j') . '"><span class="bread-current bread-' . get_the_time('j') . '"> ' . get_the_time('jS') . ' ' . get_the_time('M') . ' Archives</span></li>';
        } else if ( is_month() ) {
            // Month Archive
            // Year link
            echo '<li class="breadcrumb-item item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></li>';
            echo '<li class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </li>';
            // Month display
            echo '<li class="breadcrumb-item item-month item-month-' . get_the_time('m') . '"><span class="bread-month bread-month-' . get_the_time('m') . '" title="' . get_the_time('M') . '">' . get_the_time('M') . ' Archives</span></li>';
        } else if ( is_year() ) {
            // Display year archive
            echo '<li class="breadcrumb-item item-current item-current-' . get_the_time('Y') . '"><span class="bread-current bread-current-' . get_the_time('Y') . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</span></li>';
        } else if ( is_author() ) {
            // Auhor archive
            // Get the author information
            global $author;
            $userdata = get_userdata( $author );
            // Display author name
            echo '<li class="breadcrumb-item item-current item-current-' . $userdata->user_nicename . '"><span class="bread-current bread-current-' . $userdata->user_nicename . '" title="' . $userdata->display_name . '">' . 'Author: ' . $userdata->display_name . '</span></li>';
        } else if ( get_query_var('paged') ) {
            // Paginated archives
            echo '<li class="breadcrumb-item item-current item-current-' . get_query_var('paged') . '"><span class="bread-current bread-current-' . get_query_var('paged') . '" title="Page ' . get_query_var('paged') . '">'.__('Page') . ' ' . get_query_var('paged') . '</span></li>';
        } else if ( is_search() ) {
            // Search results page
            echo '<li class="breadcrumb-item item-current item-current-' . get_search_query() . '"><span class="bread-current bread-current-' . get_search_query() . '" title="Search results for: ' . get_search_query() . '">Search results for: ' . get_search_query() . '</span></li>';
        } elseif ( is_404() ) {
            // 404 page
            echo '<li>' . 'Error 404' . '</li>';
        }
        echo '</ul>';
    }
} // end custom_breadcrumbs();
