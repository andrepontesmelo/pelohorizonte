( function( jQuery ) {

	'use strict';

	// Animate progress bar
	jQuery.fn.fusion_draw_progress = function() {
		var progressbar = jQuery( this ),
		    percentage;
		if ( jQuery( 'html' ).hasClass( 'lt-ie9' ) ) {
			progressbar.css( 'visibility', 'visible' );
			progressbar.each( function() {
				percentage = progressbar.find( '.progress' ).attr( 'aria-valuenow' );
				progressbar.find( '.progress' ).css( 'width', '0%' );
				progressbar.find( '.progress' ).animate( {
					width: percentage + '%'
				}, 'slow' );
			} );
		} else {
			progressbar.find( '.progress' ).css( 'width', function() {
				return jQuery( this ).attr( 'aria-valuenow' ) + '%';
			});
		}
	};
})( jQuery );
jQuery( document ).ready( function() {
	// Progressbar
	jQuery( '.fusion-progressbar' ).not( '.fusion-modal .fusion-progressbar' ).each( function() {
		var $offset = getWaypointOffset( jQuery( this ) );

		jQuery( this ).waypoint( function() {
			jQuery( this ).fusion_draw_progress();
		}, {
			triggerOnce: true,
			offset: $offset
		});
	});
});
jQuery( window ).load( function() {
	// Progressbar - Modals
	jQuery( '.fusion-modal .fusion-progressbar' ).on( 'appear', function() {
		jQuery( this ).fusion_draw_progress()
	});
});
