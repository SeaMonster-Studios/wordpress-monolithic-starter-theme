<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

?>
<!DOCTYPE html>
<html lang="en" id="html">
<!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class="no-js"> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><![endif]-->
<title><?php wp_title(); ?></title>
<meta name="author" content="SeaMonster Studios">
<meta name="description" content="<?php bloginfo('description'); ?>">
<!-- Mobile -->
<meta name="viewport" content="width=device-width, initial-scale = 1, maximum-scale=1" />

<script type="text/javascript">console.warn('Favicons still needed');</script>

<!-- CSS & Js -->
<?php wp_head(); ?>

</head>
