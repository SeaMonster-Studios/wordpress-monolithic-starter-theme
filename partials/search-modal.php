<div class="search-modal justify-content-center" style="display: none;">
	<button class="search-modal-toggle"><span class="fal fa-times"></span></button>

	<form id="searchform" role="search" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<div class="input-group d-flex justify-content-center">
			<button id="searchsubmit" class="" type="submit" aria-label="Submit" title="Submit"><span class="fas fa-search"></span></button>
			<input id="s" class="input-group__input input--search" name="s" type="text" placeholder="Search...">
			<input type="hidden" name="post_type" value="learn, tours" />
		</div>
	</form>
</div>
