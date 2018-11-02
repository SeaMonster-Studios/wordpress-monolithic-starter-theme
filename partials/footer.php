<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$contact_info = get_field('brand_contact_information', 'brand');
$general = get_field('brand_general', 'brand');

?>
	<footer class="site-footer">
		<div class="container">
			<div class="site-footer-top">
				<div class="site-footer-container-inner d-flex justify-content-lg-between flex-column flex-lg-row">
					<div>
						<ul class="social-nav-footer d-flex">
							<?php get_template_part('partials/social-links'); ?>
						</ul>
						<div class="site-contact-info">
							<h5 class="site-title">Site Title</h5>
							<?php if($contact_info && $contact_info['address']): ?>
								<p><?php echo $contact_info['address']; ?></p>
							<?php endif; ?>
						</div>
					</div>
					<?php
						wp_nav_menu(array(
							'menu' => 'footer-menu',
							'menu_class' => 'd-flex flex-column flex-lg-row',
							'container' => 'div',
							'container_class' => 'nav-footer'
						));
					?>

				</div>
			</div>
			<div class="site-footer-bottom">
				<div class="site-footer-container-inner d-flex justify-content-between">
					<div>
						<h5><a href="/privacy-and-terms">Privacy Policy &amp; Terms</a></h5>
						<p>&copy;<?php echo date('Y');?> Site Title. Site by <a target="_blank" href="https://seamonsterstudios.com" class="green">SeaMonster&nbsp;Studios.</a></p>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<?php wp_footer(); ?>
	</div> <!--/div#app-stage  -->
</body>
</html>
