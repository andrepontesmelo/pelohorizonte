function getScrollBarWidth() {
    var $outer = jQuery( '<div>' ).css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo( 'body' ),
        $widthWithScroll = jQuery( '<div>' ).css({ width: '100%' }).appendTo( $outer ).outerWidth();
    $outer.remove();
    return 100 - $widthWithScroll;
};
jQuery( window ).load( function() { // Start window_load_1

	var scrollbarWidth = parseFloat( getScrollBarWidth() );

	// Initialize Bootstrap Modals
	jQuery( '.fusion-modal' ).each( function() {
		// Changed from #wrapper to body.
		jQuery( 'body' ).append( jQuery( this ) );
	});
	jQuery( '.fusion-modal' ).bind( 'hidden.bs.modal', function() {

		jQuery( 'html' ).css( 'overflow', '' );
		if ( 0 !== scrollbarWidth ) {
			if ( jQuery( 'body' ).hasClass( 'layout-boxed-mode' ) ) {
				jQuery( '#sliders-container .main-flex[data-parallax="1"]' ).css( 'margin-left', function( index, curValue ) {
					return parseFloat( curValue ) + ( scrollbarWidth / 2 )  + 'px';
				});
			}
			jQuery( 'body, .fusion-is-sticky .fusion-header, .fusion-is-sticky .fusion-secondary-main-menu, #sliders-container .main-flex[data-parallax="1"], #wpadminbar, .fusion-footer.fusion-footer-parallax' ).css( 'padding-right', '' );
		}
	});

	jQuery( '.fusion-modal' ).bind( 'show.bs.modal', function() {
		var modalWindow,
		    $activeTestimonial,
		    fixedSelectors =  'body, .fusion-is-sticky .fusion-header, .fusion-is-sticky .fusion-secondary-main-menu, #sliders-container .main-flex[data-parallax="1"], #wpadminbar, .fusion-footer.fusion-footer-parallax';

		jQuery( 'html' ).css( 'overflow', 'visible' );
		if ( 0 !== scrollbarWidth ) {
			if ( jQuery( 'body' ).hasClass( 'layout-boxed-mode' ) ) {
				fixedSelectors =  'body, #wpadminbar';
				jQuery( '#sliders-container .main-flex[data-parallax="1"]' ).css( 'margin-left', function( index, curValue ) {
					return parseFloat( curValue ) - ( scrollbarWidth / 2 )  + 'px';
				});
			}
			jQuery( fixedSelectors ).css( 'padding-right', function( index, curValue ) {
				return parseFloat( curValue ) + scrollbarWidth  + 'px';
			});
		}
		modalWindow = jQuery( this );

		// Reinitialize dynamic content
		setTimeout( function() {

			// Autoplay youtube videos, if the params have been set accordingly in the video shortcodes
			modalWindow.find( '.fusion-youtube' ).find( 'iframe' ).each( function( i ) {

				var func;
				if ( 1 === jQuery( this ).parents( '.fusion-video' ).data( 'autoplay' ) || 'true' === jQuery( this ).parents( '.fusion-video' ).data( 'autoplay' ) ) {
					jQuery( this ).parents( '.fusion-video' ).data( 'autoplay', 'false' );

					func = 'playVideo';
					this.contentWindow.postMessage( '{"event":"command","func":"' + func + '","args":""}', '*' );
				}
			});

			// Autoplay vimeo videos, if the params have been set accordingly in the video shortcodes
			modalWindow.find( '.fusion-vimeo' ).find( 'iframe' ).each( function( i ) {
				if ( 1 === jQuery( this ).parents( '.fusion-video' ).data( 'autoplay' ) || 'true' === jQuery( this ).parents( '.fusion-video' ).data( 'autoplay' ) ) {
					jQuery( this ).parents( '.fusion-video' ).data( 'autoplay', 'false' );

					$f( jQuery( this )[0] ).api( 'play' );
				}
			});

			// To make premium sliders work in tabs
			if ( modalWindow.find( '.flexslider, .rev_slider_wrapper, .ls-container' ).length ) {
				jQuery( window ).trigger( 'resize' );
			}

			// Flip Boxes
			if ( 'function' === typeof fusionCalcFlipBoxesHeight ) {
				modalWindow.find( '.flip-box-inner-wrapper' ).each( function() {
					jQuery( this ).fusionCalcFlipBoxesHeight();
				});
			}

			// Reinitialize carousels
			if ( modalWindow.find( '.fusion-carousel' ).length && 'function' === typeof generateCarousel ) {
				generateCarousel();
			}

			// Reinitialize blog shortcode isotope grid
			modalWindow.find( '.fusion-blog-shortcode' ).each( function() {
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
					calcSelectArrowDimensions();
				}
			});

			// Reinitialize google maps
			if ( 'function' === typeof reinitializeGoogleMap ) {
				modalWindow.find( '.shortcode-map' ).each( function() {
					jQuery( this ).reinitializeGoogleMap();
				});
			}

			// Reinitialize portfolio
			modalWindow.find( '.fusion-portfolio' ).each( function() {
				jQuery( this ).find( '.fusion-portfolio-wrapper' ).isotope();
			});

			// Set testimonials height
			modalWindow.find( '.fusion-testimonials .reviews' ).each( function() {
				jQuery( this ).css( 'height', jQuery( this ).children( '.active-testimonial' ).height() );
			});

			// Reinitialize select arrows
			if ( 'function' === typeof calcSelectArrowDimensions ) {
				calcSelectArrowDimensions();
			}
		}, 350 );
	});

	if ( 1 == jQuery( '#sliders-container .tfs-slider' ).data( 'parallax' ) ) {
		jQuery( '.fusion-modal' ).css( 'top', jQuery( '.header-wrapper' ).height() );
	}

	// Stop videos in modals when closed
	jQuery( '.fusion-modal' ).each( function() {
		jQuery( this ).on( 'hide.bs.modal', function() {

			// Youtube
			jQuery( this ).find( 'iframe' ).each( function( i ) {
				var func = 'pauseVideo';
				this.contentWindow.postMessage( '{"event":"command","func":"' + func + '","args":""}', '*' );
			});

			// Vimeo
			jQuery( this ).find( '.fusion-vimeo iframe' ).each( function( i ) {
				$f( this ).api( 'pause' );
			});
		});
	});

	jQuery( '[data-toggle=modal]' ).on( 'click', function( e ) {
		e.preventDefault();
	});

	jQuery( '.fusion-modal-text-link' ).click( function( e ) {
		e.preventDefault();
	});
});
