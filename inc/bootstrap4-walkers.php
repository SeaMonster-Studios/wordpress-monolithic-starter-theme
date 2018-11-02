<?php
// Reference: https://gist.github.com/moso/d2dbdbb278cc016dfd8a4a0930b7e767
// BOOTSTRAP 4 NAVBAR INTEGRATION
$collapse_indicator_bs4_walker = 0;
class bs4_walker_nav_menu_collapse extends Walker_Nav_menu {

		function start_lvl( &$output, $depth = 0, $args = array() ){ // ul
			global $collapse_indicator_bs4_walker;
			$indent = str_repeat("\t",$depth); // indents the outputted HTML
			$submenu = ($depth > 0) ? ' sub-menu' : '';
			$output .= "\n$indent<ul class=\"collapse depth_$depth\" id=\"collapseID-$collapse_indicator_bs4_walker\">\n";

			$collapse_indicator_bs4_walker++;
		}

		function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ){ // li a span
			global $collapse_indicator_bs4_walker;
			$page_id = $item->object_id;
			// if you're using the page thumbnail, be sure to have the correct size setup in your functions file, add_image_size('nav_thumbnail', 205, 128, true);
			$page_thumbnail = get_field('nav_thumbnail', $page_id);

			$indent = ( $depth ) ? str_repeat("\t",$depth) : '';
			$li_attributes = '';
			$class_names = $value = '';
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = ($args->walker->has_children) ? 'collapse-wrapper' : '';
			$classes[] = ($item->current || $item->current_item_anchestor) ? 'active' : '';
			$classes[] = 'nav-item';
			$classes[] = 'nav-item-' . $item->ID;
			$class_names =  join(' ', apply_filters('nav_menu_css_class', array_filter( $classes ), $item, $args ) );
			$class_names = ' class="' . esc_attr($class_names) . (esc_attr($class_names) ? ' ' : '') . 'nav-item' . ($args->walker->has_children ? ' collapse-wrapper' : null) . '"';
			$output .= $indent . '<li ' . $value . $class_names . $li_attributes . '>';
			$attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
			$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr($item->target) . '"' : '';
			$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
			$attributes .= ! empty( $item->url ) ? ' href="' . esc_attr($item->url) . '"' : '';
			$attributes .= ' class="nav-link"';
			$attributes .= $page_thumbnail ? ' data-thumbnail="' . $page_thumbnail['sizes']['nav_thumbnail'] . '"' : '';
			$item_output = $args->before;
			$item_output .=  '<a' . $attributes . '>';
			$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
			$item_output .= '</a>';
			if ( $args->walker->has_children ) {
				$collapse_toggle = "<button type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseID-$collapse_indicator_bs4_walker\" aria-expanded=\"false\" aria-controls=\"collapseID-$collapse_indicator_bs4_walker\"><i class=\"fa fa-angle-down\"></i></button>";

				$item_output .= $collapse_toggle;
			}
			$item_output .= $args->after;
			$output .= apply_filters ( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}

class bs4_walker_nav_menu_dropdown extends Walker_Nav_menu {

	function start_lvl( &$output, $depth = 0, $args = array() ){ // ul
		$indent = str_repeat("\t",$depth); // indents the outputted HTML
		$submenu = ($depth > 0) ? ' sub-menu' : '';
		$output .= "\n$indent<ul class=\"dropdown-menu$submenu dropdown-menu-right depth_$depth\">\n";
	}

	function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ){ // li a span
		$page_id = $item->object_id;
		$page_thumbnail = get_field('nav_thumbnail', $page_id);
		$indent = ( $depth ) ? str_repeat("\t",$depth) : '';
		$li_attributes = '';
		$class_names = $value = '';
		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = ($args->walker->has_children) ? 'dropdown' : '';
		$classes[] = ($item->current || $item->current_item_anchestor) ? 'active' : '';
		$classes[] = 'nav-item';
		$classes[] = 'nav-item-' . $item->ID;
		if( $depth && $args->walker->has_children ) {
				$classes[] = 'dropdown-menu dropdown-menu-right';
		}
		$class_names =  join(' ', apply_filters('nav_menu_css_class', array_filter( $classes ), $item, $args ) );
		$class_names = ' class="' . esc_attr($class_names) . (esc_attr($class_names) ? ' ' : '') . 'nav-item' . ($args->walker->has_children ? ' dropdown' : null) . '"';
		$id = apply_filters('nav_menu_item_id', 'menu-item-'.$item->ID, $item, $args);
		$id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';
		$output .= $indent . '<li ' . $id . $value . $class_names . $li_attributes . '>';
		$attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
		$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr($item->target) . '"' : '';
		$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
		$attributes .= ! empty( $item->url ) ? ' href="' . esc_attr($item->url) . '"' : '';
		$attributes .= ( $args->walker->has_children ) ? ' class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"' : ' class="nav-link"';
		$attributes .= $page_thumbnail ? ' data-thumbnail="' . $page_thumbnail['sizes']['thumbnail'] . '"' : '';
		$item_output = $args->before;
		$item_output .= ( $depth > 0 ) ? '<a class="dropdown-item"' . $attributes . '>' : '<a' . $attributes . '>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;
		$output .= apply_filters ( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}
