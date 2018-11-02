<?php

class SMS_Menu_Setup
{
	function __construct() {
		self::register_menus();
	}

	function register_menus() {
		// register_nav_menus(array(
		// 	'secondary_menu' => 'Secondary Menu'
		// ));
	}
}

new SMS_Menu_Setup;

class SMS_Collapse_Menu_Links extends Walker_Nav_menu {

	function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ){ // li a span
		$attributes = ! empty( $item->url ) ? ' href="' . esc_attr($item->url) . '"' : '';
		$output .= "
			<a $attributes class='dropdown-item'><div class='container'>$item->title</div></a>
		";
	}
}

/*
array(
	'type' => ['children', 'taxonomy', 'custom'],
	'taxonomy' => ['category', 'tag'], // only used if type === taxonomy
	'include_parent' => [true, false],
	'parent_url' => '', // only used if include_parent === true,
	'query_options' => array() // WP_Query $args
);
*/

// class SecondaryNav {
// 	function __construct($options = null) {
// 		global $post;

// 		$this->type = $options && $options['type'] ? $options['type'] : 'children';
// 		$this->include_parent = $options && $options['include_parent'] ? $options['include_parent'] : false;
// 		$this->query_options = $options && $options['query_options'] ? $options['query_options'] : array();
// 		$this->post_type = get_post_type();

// 		if ($this->type === 'taxonomy') {
// 			$this->taxonomy = $options['taxonomy'] ? $options['taxonomy'] : null;
// 			if(!$this->taxonomy) return false;
// 		}

// 		if ($this->include_parent) {
// 			$this->parent_url = $options['parent_url'] ? $options['parent_url'] : null;
// 			if(!$this->parent_url) return false;
// 		}

// 		$topWrapper = $this->buildTopWrapper();
// 		$items = $this->buildItems();
// 		$bottomWrapper = $this->buildBottomWrapper();

// 		return $topWrapper . $items . $bottomWrapper;

// 	}

// 	function buildTopWrapper() {

// 	}

// 	function buildItems() {
		
// 	}

// 	function buildBottomWrapper() {
		
// 	}
// }


class SMS_Secondary_Nav
{
	function __construct($post) {

		$args = array(
			'post_type'      => 'page',
			'posts_per_page' => -1,
			'post_parent'    => $post->ID,
			'order'          => 'ASC',
			'orderby'        => 'menu_order'
	 );

	 $children = new WP_Query( $args );

	 if ( $children->have_posts() ) :
		$parent_url = get_the_permalink();

			echo "
				<nav class='navbar justify-content-center nav-secondary nav-secondary-pagelinks' id='nav-secondary'>
					<div class='nav-secondary-title'><a href='$parent_url' class=' nav-secondary-parent'>$post->post_title</a></div>
					<div class='dropdown'>
						<button class='btn btn-dropdown dropdown-toggle' type='button' id='nav-secondary-dropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
							Sub-Nav Select <span class='icon icon-chevron-thin-down'></span>
						</button>
						<div class='nav-secondary-items dropdown-menu' aria-labelledby='nav-secondary-dropdown'>
			";


			while ( $children->have_posts() ) : $children->the_post();

					echo '<a href="' .  get_the_permalink() . '" class=" dropdown-item">' . get_the_title() . '</a>';

			endwhile;

		echo '</div></div></nav>';

		endif;

		wp_reset_postdata();
	}
}

class SMS_Secondary_Nav_Taxonomy_Isotope_Filter
{
	function __construct($taxonomy, $class = '') {

		$terms = get_terms($taxonomy, array(
			'hide_empty' => true,
		));

	 	if ($terms) :

			echo "
				<div class='nav-secondary-wrapper'>
				<nav class='navbar justify-content-center nav-secondary navbar-tax-filter $class' id='nav-secondary'>
					<div class='container'>
						<button type='button' data-toggle='collapse' aria-controls='nav-secondary-tax-isotope-menu' aria-expanded='false' data-target='#nav-secondary-tax-isotope-menu'>
							Categories <span class='fal fa-chevron-down'></span>
						</button>
					</div>
					<div class='nav-secondary-items-wrapper'>
							<div class='nav-secondary-items collapse'
								id='nav-secondary-tax-isotope-menu'
							>
			";

			echo "<span class='filter-option' data-filter='filter-all'><div class='container'>All</div></span>";

			foreach ($terms as $term) {
				echo "<span class='filter-option' data-filter='filter-$term->slug'><div class='container'>$term->name</div></span>";
			}

		echo '</div></div></nav></div>';

		endif;

		wp_reset_query();
	}
}

class SMS_Secondary_Nav_Taxonomy
{
	function __construct($taxonomy, $all_url) {
		$terms;

		if ($taxonomy === 'tag') {
			$terms = get_tags();
		} else {
			$terms = get_terms($taxonomy, array(
				'hide_empty' => true,
			));
		}

	 	if ($terms) :
			echo "
				<div class='nav-secondary-wrapper'>
					<nav class='navbar justify-content-center nav-secondary navbar-tax' id='nav-secondary'>
						<div class='container'>
							<button type='button' data-toggle='collapse' aria-controls='nav-tax-menu' aria-expanded='false' data-target='#nav-tax-menu'>
								Categories <span class='fal fa-chevron-down'></span>
							</button>
						</div>
						<div class='nav-secondary-items-wrapper'>
								<div class='nav-secondary-items collapse'
									id='nav-tax-menu'
								>
			";

			echo "<a href='$all_url'><div class='container'>All</div></a>";

			foreach ($terms as $term) :
				$href = $taxonomy === 'tag' ? get_tag_link($term->term_id) : get_category_link($term->term_id);
				if ($term->name !== 'Uncategorized') :
					echo '<a href="' . $href  . '"><div class="container">' . $term->name . '</div></a>';
				endif;
			endforeach;

		echo '</div></div></nav></div>';

		endif;

		wp_reset_query();
	}
}
