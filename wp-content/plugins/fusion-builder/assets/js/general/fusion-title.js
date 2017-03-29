( function( jQuery ) {

	'use strict';

	// Add/remove the mobile title class, depending on available space and title length
	jQuery.fn.fusion_responsive_title_shortcode = function() {
		jQuery( this ).each( function() {
			var $titleWrapper        = jQuery( this ),
			    $title               = $titleWrapper.find( 'h1, h2, h3, h4, h5, h6' ),
			    $titleMinWidth       = ( $title.data( 'min-width' ) ) ? $title.data( 'min-width' ) : $title.outerWidth(),
			    $wrappingParent      = $titleWrapper.parent(),
			    $wrappingParentWidth = ( $titleWrapper.parents( '.slide-content' ).length ) ? $wrappingParent.width() : $wrappingParent.outerWidth();

			if ( ( 0 === $titleMinWidth || false === $titleMinWidth || '0' === $titleMinWidth ) && ( 0 === $wrappingParentWidth || false === $wrappingParentWidth || '0' === $wrappingParentWidth ) ) {
				$titleWrapper.removeClass( 'fusion-border-below-title' );
			} else if ( $titleMinWidth + 100 >= $wrappingParentWidth ) {
				$titleWrapper.addClass( 'fusion-border-below-title' );
				$title.data( 'min-width', $titleMinWidth );
			} else {
				$titleWrapper.removeClass( 'fusion-border-below-title' );
			}
		});
	};
})( jQuery );

jQuery( document ).ready( function( $ ) {

	// Remove title separators and padding, when there is not enough space
	jQuery( '.fusion-title' ).fusion_responsive_title_shortcode();

	jQuery( window ).on( 'resize', function() {
		jQuery( '.fusion-title' ).fusion_responsive_title_shortcode();
	});
});
