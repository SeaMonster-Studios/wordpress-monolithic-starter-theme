<?php

class LoadMoreWP {
	public function __construct() {
		add_action( 'rest_api_init', array($this, 'extend_rest_api') );
	}

	function extend_rest_api () {
		$namespace = 'sms/v1';
		$base = 'load-more';
		register_rest_route($namespace, '/' . $base, array(
				'methods' => 'GET',
				'callback' => array($this, 'load_more'),
		));
	}

	public function load_more ($request_data) {
		$return = array(
			"posts" => array(),
			"hasNextPosts" => false,
			"testing" => array(),
		);

		$parameters = $request_data->get_params();
		$skip_count;
		$post_type;
		$orderby;
		$order;
		$load_count;
		$taxID;
		$taxType;

		if (isset($parameters['skip-count'])) {
			$skip_count = $parameters['skip-count'];
		} else {
			return array( 'error' => 'Missing skip-count parameter. This should be the same amount of items that are already loaded.' );
		}

		if (isset($parameters['load-count'])) {
			$load_count = $parameters['load-count'];
		} else {
			$load_count = 9;
		}

		if (isset($parameters['orderby'])) {
			$orderby = $parameters['orderby'];
		} else {
			$orderby = 'date';
		}

		if (isset($parameters['order'])) {
			$order = $parameters['order'];
		} else {
			$order = 'DESC';
		}

		if (isset($parameters['post-type'])) {
			$post_type = $parameters['post-type'];
		} else {
			return array( 'error' => 'Missing post-type parameter.' );
		}

		if (isset($parameters['taxID']) && isset($parameters['taxType'])) {
			$taxID = $parameters['taxID'];
			$taxType = $parameters['taxType'];
		} else {
			$taxID = null;
			$taxType = null;
		}

		// The JS is updating the skip_count with each call to this function
		$args = array(
			'posts_per_page' => $load_count,
			'orderby' => $orderby,
			'order' => $order,
			'post_type' => $post_type,
			'offset' => $skip_count,
		);

		if ($taxID && $taxType) {
			switch($taxType) {
				case 'tag':
					$args['tag_id'] = $tagID;
					break;
				case 'category':
					$args['cat'] = $taxID;
					break;
				default:
					break;
			}
		}

		$return['testing']['args'] = $args;

		$query = new WP_Query( $args );

		if ($query->posts && count($query->posts) > 0) {
			foreach($query->posts as $post) {
				$category = get_cat_name(wp_get_post_categories($post->ID, array('number' => 1))[0]);
				$category = $category === 'Uncategorized' ? null : $category;

				$post->category = $category;
				$post->acf = get_fields($post->ID);
				$post->permalink = get_permalink($post->ID);
				$post->thumbnail = get_the_post_thumbnail_url($post->ID, 'medium');
				$post->excerpt = $this->excerpt($post->post_excerpt, 10);
				$return["posts"][] = $post;
			}
		}

		wp_reset_postdata();

		// Let the frontend know if there are no more posts after the set we're passing it.
		// That way it can hide the LoadMore button
		$args['offset'] = $skip_count + $load_count;
		$moreQuery = new WP_Query( $args );
		if ($moreQuery->posts && count($moreQuery->posts) > 0) $return["hasNextPosts"] = true;

		wp_reset_postdata();

		return new WP_REST_Response($return, 200);
	}

	function excerpt($excerpt, $limit) {
		$excerpt = explode(' ', $excerpt, $limit);

		if (count($excerpt) >= $limit) {
				array_pop($excerpt);
				$excerpt = implode(" ", $excerpt) . '...';
		} else {
				$excerpt = implode(" ", $excerpt);
		}

		$excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);

		return $excerpt;
	}
}

new LoadMoreWP;
