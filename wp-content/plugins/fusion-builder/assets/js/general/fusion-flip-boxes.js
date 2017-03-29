( function( jQuery ) {

	'use strict';

	// Set flip boxes equal front/back height
	jQuery.fn.fusionCalcFlipBoxesHeight = function() {
		var flipBox = jQuery( this ),
		    outerHeight,
		    height,
		    topMargin = 0;

		flipBox.find( '.flip-box-front' ).css( 'min-height', '' );
		flipBox.find( '.flip-box-back' ).css( 'min-height', '' );
		flipBox.find( '.flip-box-front-inner' ).css( 'margin-top', '' );
		flipBox.find( '.flip-box-back-inner' ).css( 'margin-top', '' );
		flipBox.css( 'min-height', '' );

		setTimeout( function() {
			if ( flipBox.find( '.flip-box-front' ).outerHeight() > flipBox.find( '.flip-box-back' ).outerHeight() ) {
				height = flipBox.find( '.flip-box-front' ).height();
				outerHeight = flipBox.find( '.flip-box-front' ).outerHeight();
				topMargin = ( height - flipBox.find( '.flip-box-back-inner' ).outerHeight() ) / 2;

				flipBox.find( '.flip-box-back' ).css( 'min-height', outerHeight );
				flipBox.css( 'min-height', outerHeight );
				flipBox.find( '.flip-box-back-inner' ).css( 'margin-top', topMargin );
			} else {
				height = flipBox.find( '.flip-box-back' ).height();
				outerHeight = flipBox.find( '.flip-box-back' ).outerHeight();
				topMargin = ( height - flipBox.find( '.flip-box-front-inner' ).outerHeight() ) / 2;

				flipBox.find( '.flip-box-front' ).css( 'min-height', outerHeight );
				flipBox.css( 'min-height', outerHeight );
				flipBox.find( '.flip-box-front-inner' ).css( 'margin-top', topMargin );
			}
		}, 100 );
	};
})( jQuery );

jQuery( window ).load( function() {

	// Flip Boxes
	jQuery( '.flip-box-inner-wrapper' ).each( function() {
		jQuery( this ).fusionCalcFlipBoxesHeight();
	});

	jQuery( window ).resize( function() {
		jQuery( '.flip-box-inner-wrapper' ).each( function() {
			jQuery( this ).fusionCalcFlipBoxesHeight();
		});
	});
});

jQuery( document ).ready( function( $ ) {

	jQuery( '.fusion-flip-box' ).mouseover( function() {
		jQuery( this ).addClass( 'hover' );
	});

	jQuery( '.fusion-flip-box' ).mouseout( function() {
		jQuery( this ).removeClass( 'hover' );
	});

});
