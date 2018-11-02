<?php
	$social_links = get_field('brand_social_profiles', 'brand');

	if($social_links) :
?>
		<?php if($social_links['facebook']): ?>
			<li><a target="_blank" href="<?php echo $social_links['facebook']; ?>"><span class="fab fa-facebook-f"></span></a></li>
		<?php endif; ?>
		<?php if($social_links['twitter']): ?>
			<li><a target="_blank" href="<?php echo $social_links['twitter']; ?>"><span class="fab fa-twitter"></span></a></li>
		<?php endif; ?>
		<?php if($social_links['instagram']): ?>
			<li><a target="_blank" href="<?php echo $social_links['instagram']; ?>"><span class="fab fa-instagram"></span></a></li>
		<?php endif; ?>
		<?php if($social_links['flickr']): ?>
			<li><a target="_blank" href="<?php echo $social_links['flickr']; ?>"><span class="fab fa-flickr"></span></a></li>
		<?php endif; ?>
		<?php if($social_links['linkedin']): ?>
			<li><a target="_blank" href="<?php echo $social_links['linkedin']; ?>"><span class="fab fa-linkedin-in"></span></a></li>
		<?php endif; ?>
<?php endif; ?>
