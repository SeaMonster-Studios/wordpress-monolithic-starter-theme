<?php
// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
// Register our callback to the appropriate filter
add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {
	// Define the style_formats array
	$style_formats = array(
		// Each array child is a format with it's own settings
		array(
			'title' => 'Lead Text',
			'block' => 'p',
			'classes' => 'lead',
			'wrapper' => false,
		),
		array(
			'title' => 'Subheading',
			'block' => 'p',
			'classes' => 'subheading',
			'wrapper' => false,
		),
		array(
			'title' => 'Small',
			'block' => 'small',
			'wrapper' => false
		)
	);
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );

	// decode
	$formats = preg_replace( '/(\w+)\s{0,1}:/', '"\1":', str_replace(array("\r\n", "\r", "\n", "\t"), "", $init_array['formats'] ));
	$formats = json_decode( $formats, true );

	// set correct values
	$formats['alignleft'][0]['classes'] = 'text-left';
	$formats['aligncenter'][0]['classes'] = 'text-center';
	$formats['alignright'][0]['classes'] = 'text-right';

	// remove inline styles
	unset( $formats['alignleft'][0]['styles'] );
	unset( $formats['aligncenter'][0]['styles'] );
	unset( $formats['alignright'][0]['styles'] );

	// encode and replace
	$init_array['formats'] = json_encode( $formats );

	// disable h1 inside wysywig
	$init_array['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';

	return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );
