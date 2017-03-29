( function( jQuery ) {

	'use strict';

	jQuery.fn.init_waypoint = function() {
		if ( jQuery().waypoint ) {

			// CSS Animations
			jQuery( '.fusion-animated' ).each( function() {
				var $offset = getWaypointOffset( jQuery( this ) ),
				    $adminbarHeight,
				    $stickyHeaderHeight;

				if ( 'top-out-of-view' === $offset ) {
					$adminbarHeight     = getAdminbarHeight();
					$stickyHeaderHeight = ( 'function' === typeof getStickyHeaderHeight ) ? getStickyHeaderHeight() : '0';

					$offset = $adminbarHeight + $stickyHeaderHeight;
				}

				jQuery( this ).waypoint( function() {

					var $animationType,
					    $animationDuration,
					    $currentElement;

					if ( ! jQuery( this ).parents( '.fusion-delayed-animation' ).length ) {
						jQuery( this ).css( 'visibility', 'visible' );

						// This code is executed for each appeared element
						$animationType     = jQuery( this ).data( 'animationtype' ),
						$animationDuration = jQuery( this ).data( 'animationduration' );

						jQuery( this ).addClass( $animationType );

						if ( $animationDuration ) {
							jQuery( this ).css( '-moz-animation-duration', $animationDuration + 's' );
							jQuery( this ).css( '-webkit-animation-duration', $animationDuration + 's' );
							jQuery( this ).css( '-ms-animation-duration', $animationDuration + 's' );
							jQuery( this ).css( '-o-animation-duration', $animationDuration + 's' );
							jQuery( this ).css( 'animation-duration', $animationDuration + 's' );

							// Remove the animation class, when the animation is finished; this is done
							// to prevent conflicts with image hover effects
							$currentElement = jQuery( this );
							setTimeout( function() {
								$currentElement.removeClass( $animationType );
							}, $animationDuration * 1000 );
						}
					}

				}, { triggerOnce: true, offset: $offset } );
			});
		}
	};
})( jQuery );

jQuery( document ).ready( function( $ ) {
	if ( '1' != fusionAnimationsVars.disable_mobile_animate_css && cssua.ua.mobile ) {
		jQuery( 'body' ).addClass( 'dont-animate' );
	} else {
		jQuery( 'body' ).addClass( 'do-animate' );
	}
});

jQuery( window ).load( function() {

	// Initialize Waypoint
	setTimeout( function() {
		jQuery( window ).init_waypoint();
	}, 300 );
});
