( function( jQuery ) {

	'use strict';

	// Set the bg image dimensions of an empty column as data attributes
	jQuery.fn.fusion_set_bg_img_dims = function() {
		jQuery( this ).each( function() {

			var $backgroundImage,
			    $imageHeight,
			    $imageWidth;

			if ( ( '<div class="fusion-clearfix"></div>' === jQuery.trim( jQuery( this ).html() ) || '' === jQuery.trim( jQuery( this ).html() ) ) && jQuery( this ).data( 'bg-url' ) ) {

				// For background image we need to setup the image object to get the natural heights
				$backgroundImage = new Image();
				$backgroundImage.src = jQuery( this ).data( 'bg-url' );
				$imageHeight         = parseInt( $backgroundImage.naturalHeight );
				$imageWidth          = parseInt( $backgroundImage.naturalWidth );

				// Set the
				jQuery( this ).attr( 'data-bg-height', $imageHeight );
				jQuery( this ).attr( 'data-bg-width', $imageWidth );
			}
		});
	 };

	// Calculate the correct aspect ratio respecting height of an empty column with bg image
	jQuery.fn.fusion_calculate_empty_column_height = function() {

		jQuery( this ).each( function() {

			var $imageHeight,
			    $imageWidth,
			    $containerWidth,
			    $widthRatio,
			    $calculatedContainerHeight;

			if ( ( jQuery( this ).parents( '.fusion-equal-height-columns' ).length && ( Modernizr.mq( 'only screen and (max-width: ' + fusionBgImageVars.content_break_point + 'px)' ) || true === jQuery( this ).data( 'empty-column' ) ) ) || ! jQuery( this ).parents( '.fusion-equal-height-columns' ).length ) {
				if ( '<div class="fusion-clearfix"></div>' === jQuery.trim( jQuery( this ).html() ) || '' === jQuery.trim( jQuery( this ).html() ) ) {
					$imageHeight               = jQuery( this ).data( 'bg-height' );
					$imageWidth                = jQuery( this ).data( 'bg-width' );
					$containerWidth            = jQuery( this ).outerWidth();
					$widthRatio                = $containerWidth / $imageWidth;
					$calculatedContainerHeight = $imageHeight * $widthRatio;

					jQuery( this ).height( $calculatedContainerHeight );

					if ( jQuery( 'html' ).hasClass( 'ua-edge' ) ||  jQuery( 'html' ).hasClass( 'ua-ie' ) ) {
						jQuery( this ).parent().height( $calculatedContainerHeight );
					}
				}
			}
		});
	 };
})( jQuery );
