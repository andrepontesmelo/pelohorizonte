( function( jQuery ) {

	'use strict';

	// Change active tab when a link containing a tab ID is clicked; on and off page
	jQuery.fn.fusionSwitchTabOnLinkClick = function( $customID ) {

		var $linkHash,
		    $linkID;

		// The custom_id is used for on page links

		if ( $customID ) {
			$linkHash = $customID;
		} else {
			$linkHash = ( '#_' == document.location.hash.substring( 0, 2 ) ) ? document.location.hash.replace( '#_', '#' ) : document.location.hash;
		}
		$linkID = ( '#_' == $linkHash.substring( 0, 2 ) ) ? $linkHash.split( '#_' )[1] : $linkHash.split( '#' )[1];

		if ( $linkHash && jQuery( this ).find( '.nav-tabs li a[href="' + $linkHash + '"]' ).length ) {
			jQuery( this ).find( '.nav-tabs li' ).removeClass( 'active' );
			jQuery( this ).find( '.nav-tabs li a[href="' + $linkHash + '"]' ).parent().addClass( 'active' );

			jQuery( this ).find( '.tab-content .tab-pane' ).removeClass( 'in' ).removeClass( 'active' );
			jQuery( this ).find( '.tab-content .tab-pane[id="' + $linkID  + '"]' ).addClass( 'in' ).addClass( 'active' );
		}

		if ( $linkHash && jQuery( this ).find( '.nav-tabs li a[id="' + $linkID + '"]' ).length ) {
			jQuery( this ).find( '.nav-tabs li' ).removeClass( 'active' );
			jQuery( this ).find( '.nav-tabs li a[id="' + $linkID + '"]' ).parent().addClass( 'active' );

			jQuery( this ).find( '.tab-content .tab-pane' ).removeClass( 'in' ).removeClass( 'active' );
			jQuery( this ).find( '.tab-content .tab-pane[id="' + jQuery( this ).find( '.nav-tabs li a[id="' + $linkID + '"]' ).attr( 'href' ).split( '#' )[1] + '"]' ).addClass( 'in' ).addClass( 'active' );
		}
	};
})( jQuery );

jQuery( document ).ready( function( $ ) {
	jQuery( '.fusion-tabs' ).fusionSwitchTabOnLinkClick();

	//On Click Event
	jQuery( '.nav-tabs li' ).click( function( e ) {

		var clickedTab           = jQuery( this ),
		    tabContentToActivate = clickedTab.find( 'a' ).attr( 'href' ),
		    mapID                = clickedTab.attr( 'id' ),
		    navTabsHeight;

		clickedTab.parents( '.fusion-tabs' ).find( '.nav li' ).removeClass( 'active' );

		if ( clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.fusion-woo-slider' ).length ) {
			navTabsHeight = 0;
			if ( clickedTab.parents( '.fusion-tabs' ).hasClass( 'horizontal-tabs' ) ) {
				navTabsHeight = clickedTab.parents( '.fusion-tabs' ).find( '.nav' ).height();
			}
			clickedTab.parents( '.fusion-tabs' ).height( clickedTab.parents( '.fusion-tabs' ).find( '.tab-content' ).outerHeight( true ) + navTabsHeight );
		}

		setTimeout( function() {

			// Google maps
			clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.shortcode-map' ).each( function() {
				jQuery( this ).reinitializeGoogleMap();
			});

			// Image Carousels
			if ( clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.fusion-carousel' ).length && 'function' === typeof generateCarousel ) {
				generateCarousel();
			}

			// Portfolio
			clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.fusion-portfolio' ).each( function() {
				var $portfolioWrapper   = jQuery( this ).find( '.fusion-portfolio-wrapper' ),
				    $portfolioWrapperID = $portfolioWrapper.attr( 'id' );

				// Done for multiple instances of portfolio shortcode. Isotope needs ids to distinguish between instances
				if ( $portfolioWrapperID ) {
					$portfolioWrapper = jQuery( '#' + $portfolioWrapperID );
				}

				$portfolioWrapper.isotope();
			});

			// Make premium sliders and other elements work
			jQuery( window ).trigger( 'resize' );

			// Flip Boxes
			if ( 'function' === typeof fusionCalcFlipBoxesHeight ) {
				clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.flip-box-inner-wrapper' ).each( function() {
					jQuery( this ).fusionCalcFlipBoxesHeight();
				});
			}
			// Make WooCommerce shortcodes work
			if ( clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.fusion-woo-slider' ).length ) {
				clickedTab.parents( '.fusion-tabs' ).css( 'height', '' );
			}

			jQuery( '.crossfade-images' ).each(	function() {
				fusionResizeCrossfadeImagesContainer( jQuery( this ) );
				fusionResizeCrossfadeImages( jQuery( this ) );
			});

			// Blog
			clickedTab.parents( '.fusion-tabs' ).find( tabContentToActivate ).find( '.fusion-blog-shortcode' ).each( function() {
				var columns = 2,
				    gridWidth,
				    i;
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

			// Reinitialize select arrows
			if ( 'function' === typeof calcSelectArrowDimensions ) {
				calcSelectArrowDimensions();
			}
		}, 350 );

		e.preventDefault();
	});

	if ( Modernizr.mq( 'only screen and (max-width: ' + fusionTabVars.content_break_point + 'px)' ) ) {
		jQuery( '.tabs-vertical' ).addClass( 'tabs-horizontal' ).removeClass( 'tabs-vertical' );
	}

	jQuery( window ).on( 'resize', function() {
		if ( Modernizr.mq( 'only screen and (max-width: ' + fusionTabVars.content_break_point + 'px)' ) ) {
			jQuery( '.tabs-vertical' ).addClass( 'tabs-original-vertical' );
			jQuery( '.tabs-vertical' ).addClass( 'tabs-horizontal' ).removeClass( 'tabs-vertical' );
		} else {
			jQuery( '.tabs-original-vertical' ).removeClass( 'tabs-horizontal' ).addClass( 'tabs-vertical' );
		}
	});
});

jQuery( window ).load( function() {

	// Initialize Bootstrap Tabs
	// Initialize vertical tabs content container height
	if ( jQuery( '.vertical-tabs' ).length ) {
		jQuery( '.vertical-tabs .tab-content .tab-pane' ).each( function() {

			var videoWidth;

			if ( jQuery( this ).parents( '.vertical-tabs' ).hasClass( 'clean' ) ) {
				jQuery( this ).css( 'min-height', jQuery( '.vertical-tabs .nav-tabs' ).outerHeight() - 10 );
			} else {
				jQuery( this ).css( 'min-height', jQuery( '.vertical-tabs .nav-tabs' ).outerHeight() );
			}

			if ( jQuery( this ).find( '.video-shortcode' ).length ) {
				videoWidth = parseInt( jQuery( this ).find( '.fusion-video' ).css( 'max-width' ).replace( 'px', '' ) );
				jQuery( this ).css({
					'float': 'none',
					'max-width': videoWidth + 60
				});
			}
		});
	}

	jQuery( window ).on( 'resize', function() {
		if ( jQuery( '.vertical-tabs' ).length ) {
			jQuery( '.vertical-tabs .tab-content .tab-pane' ).css( 'min-height', jQuery( '.vertical-tabs .nav-tabs' ).outerHeight() );
		}
	});
});
