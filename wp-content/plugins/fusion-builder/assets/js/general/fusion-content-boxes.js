( function( jQuery ) {

	'use strict';

	jQuery.fn.animate_content_boxes = function() {
		if ( jQuery().waypoint ) {

			var $contentBoxes = jQuery( this );
			var $delay = 0;

			$contentBoxes.find( '.content-box-column' ).each( function() {
				var $element = this,
				    $animationType,
				    $animationDuration;

				setTimeout( function() {
					jQuery( $element ).find( '.fusion-animated' ).css( 'visibility', 'visible' );

					// This code is executed for each appeared element
					$animationType = jQuery( $element ).find( '.fusion-animated' ).data( 'animationtype' );
					$animationDuration = jQuery( $element ).find( '.fusion-animated' ).data( 'animationduration' );

					jQuery( $element ).find( '.fusion-animated' ).addClass( $animationType );

					if ( $animationDuration ) {
						jQuery( $element ).find( '.fusion-animated' ).css( '-moz-animation-duration', $animationDuration + 's' );
						jQuery( $element ).find( '.fusion-animated' ).css( '-webkit-animation-duration', $animationDuration + 's' );
						jQuery( $element ).find( '.fusion-animated' ).css( '-ms-animation-duration', $animationDuration + 's' );
						jQuery( $element ).find( '.fusion-animated' ).css( '-o-animation-duration', $animationDuration + 's' );
						jQuery( $element ).find( '.fusion-animated' ).css( 'animation-duration', $animationDuration + 's' );
					}

					if ( jQuery( $element ).parents( '.fusion-content-boxes' ).hasClass( 'content-boxes-timeline-horizontal' ) ||
						jQuery( $element ).parents( '.fusion-content-boxes' ).hasClass( 'content-boxes-timeline-vertical' ) ) {
						jQuery( $element ).addClass( 'fusion-appear' );
					}
				}, $delay );

				$delay += parseInt( jQuery( this ).parents( '.fusion-content-boxes' ).attr( 'data-animation-delay' ) );
			});
		}
	};
})( jQuery );
jQuery( window ).load( function() {
	if ( 'function' === typeof equalHeights ) {
		jQuery( '.content-boxes-icon-boxed' ).each( function() {
			jQuery( this ).find( '.content-box-column .content-wrapper-boxed' ).equalHeights();
			jQuery( this ).find( '.content-box-column .content-wrapper-boxed' ).css( 'overflow', 'visible' );
		});

		jQuery( window ).on( 'resize', function() {
			jQuery( '.content-boxes-icon-boxed' ).each( function() {
				jQuery( this ).find( '.content-box-column .content-wrapper-boxed' ).equalHeights();
				jQuery( this ).find( '.content-box-column .content-wrapper-boxed' ).css( 'overflow', 'visible' );
			});
		});

		jQuery( '.content-boxes-clean-vertical' ).each( function() {
			jQuery( this ).find( '.content-box-column .col' ).equalHeights();
			jQuery( this ).find( '.content-box-column .col' ).css( 'overflow', 'visible' );
		});

		jQuery( window ).on( 'resize', function() {
			jQuery( '.content-boxes-clean-vertical' ).each( function() {
				jQuery( this ).find( '.content-box-column .col' ).equalHeights();
				jQuery( this ).find( '.content-box-column .col' ).css( 'overflow', 'visible' );
			});
		});

		jQuery( '.content-boxes-clean-horizontal' ).each( function() {
			jQuery( this ).find( '.content-box-column .col' ).equalHeights();
			jQuery( this ).find( '.content-box-column .col' ).css( 'overflow', 'visible' );
		});

		jQuery( window ).on( 'resize', function() {
			jQuery( '.content-boxes-clean-horizontal' ).each( function() {
				jQuery( this ).find( '.content-box-column .col' ).equalHeights();
				jQuery( this ).find( '.content-box-column .col' ).css( 'overflow', 'visible' );
			});
		});
	}
	jQuery( window ).load( function() {
		// Content boxes - Modals
		jQuery( '.fusion-modal .fusion-content-boxes' ).each( function() {
			jQuery( this ).appear( function() {
				jQuery( this ).animate_content_boxes();
			});
		});
	});
});
jQuery( document ).ready( function( $ ) {

	// Content Boxes Link Area
	jQuery( '.link-area-box' ).on( 'click', function() {
		if ( jQuery( this ).data( 'link' ) ) {
			if ( '_blank' === jQuery( this ).data( 'link-target' ) ) {
				window.open( jQuery( this ).data( 'link' ), '_blank' );
				jQuery( this ).find( '.heading-link' ).removeAttr( 'href' );
				jQuery( this ).find( '.fusion-read-more' ).removeAttr( 'href' );
			} else {
				window.location = jQuery( this ).data( 'link' );
			}
			jQuery( this ).find( '.heading-link' ).attr( 'target', '' );
			jQuery( this ).find( '.fusion-read-more' ).attr( 'target', '' );
		}
	});

	// Clean Horizontal and Vertical
	jQuery( '.link-type-button' ).each( function() {
		if ( jQuery( this ).parents( '.content-boxes-clean-vertical' ).length >= 1 ) {
			$buttonHeight = jQuery( '.fusion-read-more-button' ).outerHeight();
			jQuery( this ).find( '.fusion-read-more-button' ).css( 'top', $buttonHeight / 2 );
		}
	});

	jQuery( '.link-area-link-icon .fusion-read-more-button, .link-area-link-icon .fusion-read-more, .link-area-link-icon .heading' ).mouseenter( function() {
		jQuery( this ).parents( '.link-area-link-icon' ).addClass( 'link-area-link-icon-hover' );
	});
	jQuery( '.link-area-link-icon .fusion-read-more-button, .link-area-link-icon .fusion-read-more, .link-area-link-icon .heading' ).mouseleave( function() {
		jQuery( this ).parents( '.link-area-link-icon' ).removeClass( 'link-area-link-icon-hover' );
	});

	jQuery( '.link-area-box' ).mouseenter( function() {
		jQuery( this ).addClass( 'link-area-box-hover' );
	});
	jQuery( '.link-area-box' ).mouseleave( function() {
		jQuery( this ).removeClass( 'link-area-box-hover' );
	});

	// Content Boxes Timeline Design
	jQuery( '.fusion-content-boxes' ).each( function() {
		var $offset = getWaypointOffset( jQuery( this ) );

		jQuery( this ).waypoint( function() {
			jQuery( this ).animate_content_boxes();
		}, {
			triggerOnce: true,
			offset: $offset
		});
	});
});
