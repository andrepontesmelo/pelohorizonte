<div class="wrap about-wrap fusion-builder-wrap">

	<?php Fusion_Builder_Admin::header(); ?>

	<div class="fusion-builder-important-notice">
		<p class="about-description">
			<?php printf( esc_attr__( 'The Fusion Builder plugin has been created with extensibility as a key factor. Creating Add-ons for the Builder will extend the plugin\'s functionality and provide users with the tools to create even more dynamic and complex content and value added services. Generating an ecosystem to extend and evolve Fusion Builder will be easier than ever before and beneficial to everyone who uses it. To learn more about how to get involved by creating Add-ons for the Fusion Builder, please check out the developer documentation and email us at %s to potentially be promoted here.', 'fusion-builder' ), '<a href="malto:info@theme-fusion.com" target="_blank">info@theme-fusion.com</a>' ); ?>
			<br/><br/><?php printf( __( '<strong>IMPORTANT:</strong> Add-ons are only supported by the author who created them.', 'fusion-builder' ) ); ?>
		</p>
	</div>

	<div class="avada-registration-steps">

		<div class="feature-section theme-browser rendered fusion-builder-addons">
			<?php
			$addons_json = ( isset( $_GET['reset_transient'] ) ) ? false : get_site_transient( 'fusion_builder_addons_json' );
			if ( ! $addons_json ) {
				$response = wp_remote_get( 'http://updates.theme-fusion.com/fusion_builder_addon/', array(
					'timeout'    => 30,
					'user-agent' => 'fusion-builder',
				) );
				$addons_json  = wp_remote_retrieve_body( $response );
				set_site_transient( 'fusion_builder_addons_json', $addons_json, 300 );
			}
			$addons = json_decode( $addons_json, true );
			// Move coming_soon to the end.
			if ( isset( $addons['415041'] ) ) {
				$coming_soon = $addons['415041'];
				unset( $addons['415041'] );
				$addons['coming-soon'] = $coming_soon;
			}
			$n = 0;
			?>
			<?php foreach ( $addons as $id => $addon ) : ?>
				<div class="addon">
					<img class="addon-image" src="" data-src="<?php echo esc_url_raw( $addon['thumbnail'] ); ?>" <?php echo ( ! empty( $addon['retinaThumbnail'] ) ) ? 'data-src-retina="' . esc_url_raw( $addon['retinaThumbnail'] ) . '"' : ''; ?> />
					<noscript>
						<img src="<?php echo esc_url_raw( $addon['thumbnail'] ); ?>" />
					</noscript>
					<?php if ( 'coming-soon' !== $id ) : ?>
						<?php $url = add_query_arg( 'ref', 'ThemeFusion', $addon['url'] ); ?>
						<a href="<?php echo esc_url_raw( $url ); ?>" target="_blank"></a>
					<?php endif; ?>
				</div>
			<?php
				$n++;
				endforeach;
			?>
		</div>
		<script>
			jQuery( document ).ready( function() {
				var images = jQuery( '.addon-image' ),
					isRetina = window.devicePixelRatio > 1 ? true : false;
				jQuery.each( images, function( i, v ) {
					var imageSrc = ( 'undefined' !== typeof jQuery( this ).data( 'src-retina' ) && isRetina ) ? jQuery( this ).data( 'src-retina' ) : jQuery( this ).data( 'src' );
					jQuery( this ).attr( 'src', imageSrc );
				} );
			});
		</script>
	</div>
	<?php Fusion_Builder_Admin::footer(); ?>
</div>
