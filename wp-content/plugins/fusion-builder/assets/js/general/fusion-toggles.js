jQuery( window ).load( function() {

	window.fusionAccordianClick = false;

	// Toggles
	jQuery( document ).on( 'click dblclick', '.fusion-accordian .panel-title a', function( e ) {

		if ( true === window.fusionAccordianClick ) {
			return;
		} else {
			window.fusionAccordianClick = true;
		}

		var clickedToggle,
		    toggleContentToActivate,
		    toggleChildren;

		e.preventDefault();

		clickedToggle = jQuery( this );
		toggleContentToActivate = jQuery( jQuery( this ).data( 'target' ) ).find( '.panel-body' );
		toggleChildren = clickedToggle.parents( '.fusion-accordian' ).find( '.panel-title a' );

		if ( clickedToggle.hasClass( 'collapsed' ) ) {
			toggleChildren.removeClass( 'active' );
		} else {
			toggleChildren.removeClass( 'active' );
			clickedToggle.addClass( 'active' );

			setTimeout( function() {
				if ( 'function' === typeof reinitializeGoogleMap ) {
					toggleContentToActivate.find( '.shortcode-map' ).each( function() {
						jQuery( this ).reinitializeGoogleMap();
					});
				}
				if ( toggleContentToActivate.find( '.fusion-carousel' ).length && 'function' === typeof generateCarousel ) {
					generateCarousel();
				}

				toggleContentToActivate.find( '.fusion-portfolio' ).each( function() {
					jQuery( this ).find( '.fusion-portfolio-wrapper' ).isotope();
				});

				// To make premium sliders work in tabs.
				if ( toggleContentToActivate.find( '.flexslider, .rev_slider_wrapper, .ls-container' ).length ) {
					jQuery( window ).trigger( 'resize' );
				}

				// Flip Boxes.
				if ( 'function' === typeof fusionCalcFlipBoxesHeight ) {
					toggleContentToActivate.find( '.flip-box-inner-wrapper' ).each( function() {
						jQuery( this ).fusionCalcFlipBoxesHeight();
					});
				}

				// Columns.
				if ( 'function' === typeof equalHeights ) {
					toggleContentToActivate.find( '.fusion-fullwidth.fusion-equal-height-columns' ).each( function() {
						jQuery( this ).find( '.fusion-layout-column .fusion-column-wrapper' ).equalHeights();
					});
				}

				// Block element.
				toggleContentToActivate.find( '.fusion-blog-shortcode' ).each( function() {
					var columns = 2,
					    gridWidth;
					for ( i = 1; i < 7; i++ ) {
						if ( jQuery( this ).find( '.fusion-blog-layout-grid' ).hasClass( 'fusion-blog-layout-grid-' + i ) ) {
							columns = i;
						}
					}

					gridWidth = Math.floor( 100 / columns * 100 ) / 100  + '%';
					jQuery( this ).find( '.fusion-blog-layout-grid' ).find( '.fusion-post-grid' ).css( 'width', gridWidth );

					jQuery( this ).find( '.fusion-blog-layout-grid' ).isotope();

					if ( 'function' === typeof calcSelectArrowDimensions ) {

						// Reinitialize select arrows
						calcSelectArrowDimensions();
					}
				});
			}, 350 );
		}

		window.fusionAccordianClick = false;

	});
});

jQuery( document ).ready( function( $ ) {
	jQuery( '.fusion-accordian .panel-title a' ).click( function( e ) {
		e.preventDefault();
	});
});
