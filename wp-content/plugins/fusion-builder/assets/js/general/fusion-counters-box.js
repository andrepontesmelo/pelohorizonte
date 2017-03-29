( function( jQuery ) {

	'use strict';

	// Animate counter boxes
	jQuery.fn.$fusionBoxCounting = function() {
		var $countValue         = jQuery( this ).data( 'value' ),
		    $countDirection     = jQuery( this ).data( 'direction' ),
		    $delimiter          = jQuery( this ).data( 'delimiter' ),
		    $fromValue          = 0,
		    $toValue            = $countValue,
		    $counterBoxSpeed    = fusionCountersBox.counter_box_speed,
		    $counterBoxInterval = Math.round( fusionCountersBox.counter_box_speed / 100 );

		if ( ! $delimiter ) {
			$delimiter = '';
		}

		if ( 'down' === $countDirection ) {
			$fromValue = $countValue;
			$toValue = 0;
		}

		jQuery( this ).countTo( {
			from: $fromValue,
			to: $toValue,
			refreshInterval: $counterBoxInterval,
			speed: $counterBoxSpeed,
			formatter: function( value, options ) {
				value = value.toFixed( options.decimals );
				value = value.replace( /\B(?=(\d{3})+(?!\d))/g, $delimiter );

				if ( '-0' == value ) {
					value = 0;
				}

				return value;
			}
		} );
	};
})( jQuery );

jQuery( window ).load( function() {

	// Counters Box
	jQuery( '.fusion-counter-box' ).not( '.fusion-modal .fusion-counter-box' ).each( function() {
		var $offset = getWaypointOffset( jQuery( this ) );

		jQuery( this ).waypoint( function() {
			jQuery( this ).find( '.display-counter' ).each( function() {
				jQuery( this ).$fusionBoxCounting();
			});
		}, {
			triggerOnce: true,
			offset: $offset
		});
	});

	// Counters Box - Modals
	jQuery( '.fusion-modal .fusion-counter-box' ).on( 'appear', function() {
		jQuery( this ).find( '.display-counter' ).each( function() {
			jQuery( this ).$fusionBoxCounting();
		});
	});
});
