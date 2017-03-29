( function( jQuery ) {

	'use strict';

	jQuery.fn.fusion_countdown = function() {

		var $countdown = jQuery( this ),
		    $timer     = $countdown.data( 'timer' ).split( '-' ),
		    $GMToffset = $countdown.data( 'gmt-offset' ),
		    $omitWeeks = $countdown.data( 'omit-weeks' );

		$countdown.countDown({
			gmtOffset: $GMToffset,
			omitWeeks: $omitWeeks,
			targetDate: {

				'year':  $timer[0],
				'month': $timer[1],
				'day':   $timer[2],
				'hour':  $timer[3],
				'min':   $timer[4],
				'sec':   $timer[5]
			}

		});

		$countdown.css( 'visibility', 'visible' );
	};
})( jQuery );
jQuery( document ).ready( function( $ ) {

	// Setup the countdown shortcodes
	jQuery( '.fusion-countdown-counter-wrapper' ).each( function() {
		$countdownID = jQuery( this ).attr( 'id' );
		jQuery( '#' + $countdownID ).fusion_countdown();
	});
});
