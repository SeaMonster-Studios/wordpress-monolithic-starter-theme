<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Bail if accessed directly

/**
 * Styles and Scripts Loader
 * Critical CSS resource: https://gomakethings.com/inlining-critical-css-for-better-web-performance/
 */

class SMS_Frontend_Assets {
	public $SMS_JS = 'app.js';
	public $SMS_JS_MIN = 'app.min.js';
	public $SMS_CSS_NONCRITICAL = 'app.css';
	public $SMS_CSS_NONCRITICAL_MIN = 'app.min.css';
	public $SMS_CSS_CRITICAL = 'critical.css';
	public $SMS_CSS_CRITICAL_MIN = 'critical.min.css';

	public $fonts = array(
		array(
			'name' => 'googlefonts',
			'cdn' => 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700',
		),
	);

	public $scripts = array(
		array(
			'name' => 'jquery',
			'local' => 'jquery.min.js',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',  
			'dependencies' => array(),
			'in_footer' => false,
		),
		// array(
		// 	'name' => 'FontAwesome',
		// 	'local' => 'fontawesome-all.js',
		// 	'cdn' => '', // the pro cdn is still in development, place URL here once it's released
		// 	'dependencies' => array(),
		// 	'in_footer' => true,
		// ),
		// array(
		// 	'name' => 'PictureFill',
		// 	'local' => 'picturefill.min.js',
		// 	'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js', 
		// 	'dependencies' => array('PictureFillDEP'),
		// 	'in_footer' => true,
		// ),
		// array(
		// 	'name' => 'PictureFillDEP',
		// 	'local' => 'picturefill-dependency.min.js',
		// 	'cdn' => '', 
		// 	'dependencies' => array(),
		// 	'in_footer' => true,
		// ),
		// array(
		array(
			'name' => 'WaypointsJS',
			'local' => 'jquery.waypoints.min.js',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js', 
			'dependencies' => array('jquery'),
			'in_footer' => true,
		),
		array(
			'name' => 'IsotopeJS',
			'local' => 'isotope.pkgd.min.js',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.5/isotope.pkgd.min.js', 
			'dependencies' => array('jquery'),
			'in_footer' => true,
		),
		array(
			'name' => 'OwlJS',
			'local' => 'owl.carousel.min.js',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js', 
			'dependencies' => array('jquery'),
			'in_footer' => true,
		),
		array(
			'name' => 'Select2JS',
			'local' => 'select2.full.min.js',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.full.min.js', 
			'dependencies' => array('jquery'),
			'in_footer' => true,
		),
	);

	public $styles = array(
		// array(
		// 	'name' => 'AnimateCSS',
		// 	'local' => 'animate.min.css',
		// 	'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
		// ),
		array(
			'name' => 'OwlCSS',
			'local' => 'owl.carousel.min.css',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css',
		),
		array(
			'name' => 'OwlThemeCSS',
			'local' => 'owl.theme.default.min.css',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.min.css',
		),
		array(
			'name' => 'Select2CSS',
			'local' => 'select2.min.css',
			'cdn' => 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css',
		),
	);

	function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'styles' ));
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ));

		if ( !is_admin() ) {
			add_filter( 'script_loader_tag', 'async_scripts', 10, 2 );
		}

		add_action('wp_head', array($this, 'theme_detects'), 30);
		add_action('wp_footer', array($this, 'footer_scripts'), 30);

		// START add admin/editor styles
		add_editor_style( get_stylesheet_directory_uri() . '/assets/build/' . $this->SMS_CSS_NONCRITICAL_MIN );

		foreach($this->fonts as $font) {
			add_editor_style( $font['cdn'] );
		}
		// END add admin/editor styles
	}

	function styles()
	{
		foreach($this->fonts as $font) {
			wp_register_style( $font['name'], $font['cdn'], array());
			wp_enqueue_style( $font['name'] );
		}

		if ( !is_admin() ) {
			foreach($this->styles as $style) {
				cdn_valid($style['cdn'])
				? wp_register_style( $style['name'], $style['cdn'], array())
				: wp_register_style( $style['name'], ASSET_PATH . $style['local'], array());
				wp_enqueue_style( $style['name'] );
			}

			// If stylesheet is in browser cache, load it the traditional way
			// Otherwise, inline critical CSS and load full stylesheet asynchronously
			// See theme_detects()
			if ( isset($_COOKIE['fullCSS']) && $_COOKIE['fullCSS'] === 'true' ) {
				if (getenv('SMS_ENVIRONMENT') === 'production') :
					wp_register_style( $this->SMS_CSS_NONCRITICAL_MIN, BUILD_PATH . $tahis->SMS_CSS_NONCRITICAL_MIN, array($this->SELECT2_CSS, $this->OWL_CSS, $this->ANIMATE_CSS));
					wp_enqueue_style( $this->SMS_CSS_NONCRITICAL_MIN );
				else :
					wp_register_style( $this->SMS_CSS_NONCRITICAL, BUILD_PATH . $this->SMS_CSS_NONCRITICAL, array($this->SELECT2_CSS, $this->OWL_CSS, $this->ANIMATE_CSS));
					wp_enqueue_style( $this->SMS_CSS_NONCRITICAL );
				endif;
			}
    }
	}

	function scripts()
	{
			wp_deregister_script( 'jquery' );

			foreach($this->scripts as $script) {
	      cdn_valid($script['cdn'])
				? wp_register_script( $script['name'], $script['cdn'], array(), false, $script['in_footer'])
				: wp_register_script( $script['name'], ASSET_PATH . $script['local'], $script['dependencies'], false, $script['in_footer']);
				wp_enqueue_script( $script['name'] );
			}


			if(getenv('SMS_ENVIRONMENT') === 'production') :
				wp_register_script( $this->SMS_JS_MIN, BUILD_PATH . $this->SMS_JS_MIN, array( 'jquery', 'Select2JS' ), false, true );
				wp_enqueue_script( $this->SMS_JS_MIN);

			else:
				wp_register_script( $this->SMS_JS, BUILD_PATH . $this->SMS_JS, array( 'jquery',  'Select2JS' ), false, true );
				wp_enqueue_script( $this->SMS_JS);

			endif;
	}

	function theme_detects() {
		// If stylesheet is in browser cache, load it the traditional way
		if ( isset($_COOKIE['fullCSS']) && $_COOKIE['fullCSS'] === 'true' ) {
			echo $this->get_detects();

		// Otherwise, inline critical CSS and load full stylesheet asynchronously
		} else {
			echo $this->get_detects();
		?>
				<script>
						<?php if(getenv('SMS_ENVIRONMENT') === 'production') : ?>
							var stylesheet = loadCSS('<?php echo BUILD_PATH . $this->SMS_CSS_NONCRITICAL_MIN; ?>');
						<?php else: ?>
							var stylesheet = loadCSS('<?php echo BUILD_PATH . $this->SMS_CSS_NONCRITICAL; ?>');
						<?php endif; ?>
						onloadCSS( stylesheet, function() {
								var expires = new Date(+new Date + (7 * 24 * 60 * 60 * 1000)).toUTCString();
								document.cookie = 'fullCSS=true; expires=' + expires;
						});
				</script>
				<?php 
						if(getenv('SMS_ENVIRONMENT') === 'production') :
							$response = wp_remote_get(BUILD_PATH . $this->SMS_CSS_CRITICAL_MIN);
						else :
							$response = wp_remote_get(BUILD_PATH . $this->SMS_CSS_CRITICAL);
						endif;
						if (is_array($response)) {
							echo '<style>' . $response['body'] . '</style>';
						}
					?>
		<?php
		}
	}

	function footer_scripts() {
    // If cookie isn't set, load a noscript fallback
    if ( !isset($_COOKIE['fullCSS']) || $_COOKIE['fullCSS'] !== 'true' ) {
		?>
				<?php if(getenv('SMS_ENVIRONMENT') === 'production') : ?>
					<noscript>
							<link href='<?php echo BUILD_PATH . $this->SMS_CSS_NONCRITICAL_MIN; ?>' rel='stylesheet' type='text/css'>
					</noscript>
				<?php else: ?>
					<noscript>
							<link href='<?php echo BUILD_PATH . $this->SMS_CSS_NONCRITICAL; ?>' rel='stylesheet' type='text/css'>
					</noscript>
				<?php endif; ?>
    <?php
    }
	}

	function get_detects() {
		?>
			<script>
				(function(w){'use strict';var loadCSS=function(href,before,media){var doc=w.document;var ss=doc.createElement('link');var ref;if(before){ref=before}
				else{var refs=(doc.body||doc.getElementsByTagName('head')[0]).childNodes;ref=refs[refs.length-1]}
				var sheets=doc.styleSheets;ss.rel='stylesheet';ss.href=href;ss.media='only x';function ready(cb){if(doc.body){return cb()}
				setTimeout(function(){ready(cb)})}
				ready(function(){ref.parentNode.insertBefore(ss,(before?ref:ref.nextSibling))});var onloadcssdefined=function(cb){var resolvedHref=ss.href;var i=sheets.length;while(i--){if(sheets[i].href===resolvedHref){return cb()}}
				setTimeout(function(){onloadcssdefined(cb)})};function loadCB(){if(ss.addEventListener){ss.removeEventListener('load',loadCB)}
				ss.media=media||'all'}
				if(ss.addEventListener){ss.addEventListener('load',loadCB)}
				ss.onloadcssdefined=onloadcssdefined;onloadcssdefined(loadCB);return ss};if(typeof exports!=='undefined'){exports.loadCSS=loadCSS}
				else{w.loadCSS=loadCSS}}(typeof global!=='undefined'?global:this));function onloadCSS(e,n){function t(){!o&&n&&(o=!0,n.call(e))}var o;e.addEventListener&&e.addEventListener('load',t),e.attachEvent&&e.attachEvent('onload',t),'isApplicationInstalled'in navigator&&'onloadcssdefined'in e&&e.onloadcssdefined(t)}!function(e){'use strict';var n=function(n,t,o){function a(e){return l.body?e():void setTimeout(function(){a(e)})}function d(){r.addEventListener&&r.removeEventListener('load',d),r.media=o||'all'}var i,l=e.document,r=l.createElement('link');if(t)i=t;else{var s=(l.body||l.getElementsByTagName('head')[0]).childNodes;i=s[s.length-1]}var f=l.styleSheets;r.rel='stylesheet',r.href=n,r.media='only x',a(function(){i.parentNode.insertBefore(r,t?i:i.nextSibling)});var c=function(e){for(var n=r.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){c(e)})};return r.addEventListener&&r.addEventListener('load',d),r.onloadcssdefined=c,c(d),r};'undefined'!=typeof exports?exports.loadCSS=n:e.loadCSS=n}('undefined'!=typeof global?global:this)
			</script>
		<?php
	}
}

new SMS_Frontend_Assets;

/**
*	Check if CDN is working, so that we can fallback to local
* https://stackoverflow.com/questions/7684771/how-to-check-if-a-file-exists-from-a-url
*/
function cdn_valid ($url)
{
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_exec($ch);
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if( $httpCode == 200 ){ return true; }
	return false;
}


/**
	* Asynch Select JS
	*/
function async_scripts( $tag, $handle ) {
	if (
		$handle === 'app.min.js' || $handle === 'app.js' || $handle === 'PictureFill'
	){
		return str_replace( 'src', ' async="async" src', $tag );
	}
	// elseif ($handle === 'FontAwesome') {
	// 	return str_replace( 'src', ' defer src', $tag );
	// }

	else {
		return $tag;
	}
}
