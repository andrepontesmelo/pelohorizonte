( function( jQuery ) {

	'use strict';

	// Animate counter circles
	jQuery.fn.fusion_draw_circles = function() {
		var circle        = jQuery( this ),
		    countdown     = circle.children( '.counter-circle' ).attr( 'data-countdown' ),
		    filledcolor   = circle.children( '.counter-circle' ).attr( 'data-filledcolor' ),
		    unfilledcolor = circle.children( '.counter-circle' ).attr( 'data-unfilledcolor' ),
		    scale         = circle.children( '.counter-circle' ).attr( 'data-scale' ),
		    size          = circle.children( '.counter-circle' ).attr( 'data-size' ),
		    speed         = circle.children( '.counter-circle' ).attr( 'data-speed' ),
		    strokesize    = circle.children( '.counter-circle' ).attr( 'data-strokesize' ),
		    percentage    = circle.children( '.counter-circle' ).attr( 'data-percent' );

		if ( scale ) {
			scale = jQuery( 'body' ).css( 'color' );
		}

		if ( countdown ) {
			circle.children( '.counter-circle' ).attr( 'data-percent', 100 );

			circle.children( '.counter-circle' ).easyPieChart({
				barColor: filledcolor,
				trackColor: unfilledcolor,
				scaleColor: scale,
				scaleLength: 5,
				lineCap: 'round',
				lineWidth: strokesize,
				size: size,
				rotate: 0,
				animate: {
					duration: speed, enabled: true
				}
			});
			circle.children( '.counter-circle' ).data( 'easyPieChart' ).enableAnimation();
			circle.children( '.counter-circle' ).data( 'easyPieChart' ).update( percentage );
		} else {
			circle.children( '.counter-circle' ).easyPieChart({
				barColor: filledcolor,
				trackColor: unfilledcolor,
				scaleColor: scale,
				scaleLength: 5,
				lineCap: 'round',
				lineWidth: strokesize,
				size: size,
				rotate: 0,
				animate: {
					duration: speed, enabled: true
				}
			});
		}
	};

	jQuery.fn.fusion_recalc_circles = function( $animate ) {
		var $counterCirclesWrapper = jQuery( this ),
		    $currentSize,
		    $originalSize,
		    $fusionCountersCircleWidth;

		// Make sure that only currently visible circles are redrawn; important e.g. for tabs
		if ( $counterCirclesWrapper.is( ':hidden' ) ) {
			return;
		}

		$counterCirclesWrapper.attr( 'data-currentsize', $counterCirclesWrapper.width() );
		$counterCirclesWrapper.removeAttr( 'style' );
		$counterCirclesWrapper.children().removeAttr( 'style' );
		$currentSize               = $counterCirclesWrapper.data( 'currentsize' );
		$originalSize              = $counterCirclesWrapper.data( 'originalsize' );
		$fusionCountersCircleWidth = $counterCirclesWrapper.parent().width();

		// Overall container width is smaller than one counter circle; e.g. happens for elements in column shortcodes
		if ( $fusionCountersCircleWidth < $counterCirclesWrapper.data( 'currentsize' ) ) {

			$counterCirclesWrapper.css({
				'width': $fusionCountersCircleWidth,
				'height': $fusionCountersCircleWidth,
				'line-height': $fusionCountersCircleWidth + 'px'
			});
			$counterCirclesWrapper.find( '.fusion-counter-circle' ).each( function() {
				jQuery( this ).css({
					'width': $fusionCountersCircleWidth,
					'height': $fusionCountersCircleWidth,
					'line-height': $fusionCountersCircleWidth + 'px',
					'font-size': 50 * $fusionCountersCircleWidth / 220
				});
				jQuery( this ).data( 'size', $fusionCountersCircleWidth );
				jQuery( this ).data( 'strokesize', $fusionCountersCircleWidth / 220 * 11 );
				if ( ! $animate ) {
					jQuery( this ).data( 'animate', false );
				}
				jQuery( this ).attr( 'data-size', $fusionCountersCircleWidth );
				jQuery( this ).attr( 'data-strokesize', $fusionCountersCircleWidth / 220 * 11 );
			});

		} else {
			$counterCirclesWrapper.css({
				'width': $originalSize,
				'height': $originalSize,
				'line-height': $originalSize + 'px'
			});
			$counterCirclesWrapper.find( '.fusion-counter-circle' ).each( function() {
				jQuery( this ).css({
					'width': $originalSize,
					'height': $originalSize,
					'line-height': $originalSize + 'px',
					'font-size': 50 * $originalSize / 220
				});

				jQuery( this ).data( 'size', $originalSize );
				jQuery( this ).data( 'strokesize', $originalSize / 220 * 11 );
				if ( ! $animate ) {
					jQuery( this ).data( 'animate', false );
				}
				jQuery( this ).attr( 'data-size', $originalSize );
				jQuery( this ).attr( 'data-strokesize', $originalSize / 220 * 11 );
			});

		}
	};

	jQuery.fn.fusion_redraw_circles = function() {
		var $counterCirclesWrapper = jQuery( this );

		// Make sure that only currently visible circles are redrawn; important e.g. for tabs
		if ( $counterCirclesWrapper.is( ':hidden' ) ) {
			return;
		}

		$counterCirclesWrapper.fusion_recalc_circles( false );
		$counterCirclesWrapper.find( 'canvas' ).remove();
		$counterCirclesWrapper.find( '.counter-circle' ).removeData( 'easyPieChart' );
		$counterCirclesWrapper.fusion_draw_circles();
	};
})( jQuery );
jQuery( window ).load( function() {

	// Counter Circles
	jQuery( '.counter-circle-wrapper' ).not( '.fusion-accordian .counter-circle-wrapper, .fusion-tabs .counter-circle-wrapper, .fusion-modal .counter-circle-wrapper' ).each( function() {
		var $offset = getWaypointOffset( jQuery( this ) );

		jQuery( this ).waypoint( function() {
			jQuery( this ).fusion_recalc_circles( true );
			jQuery( this ).fusion_draw_circles();
		}, {
			triggerOnce: true,
			offset: $offset
		});
	});

	// Counter Circles Responsive Resizing
	jQuery( '.counter-circle-wrapper' ).not( '.fusion-modal .counter-circle-wrapper' ).each( function() {
		var resizeWidth  = jQuery( window ).width();
		var resizeHeight = jQuery( window ).height();

		var $offset = getWaypointOffset( jQuery( this ) ),
		    $adminbarHeight,
		    $stickyHeaderHeight;

		if ( 'top-out-of-view' === $offset ) {
			$adminbarHeight     = getAdminbarHeight(),
			$stickyHeaderHeight = ( 'function' === typeof getStickyHeaderHeight ) ? getStickyHeaderHeight() : '0';

			$offset = $adminbarHeight + $stickyHeaderHeight;
		}

		jQuery( this ).waypoint( function() {
			var counterCircles = jQuery( this );

			jQuery( window ).on( 'resize', function() {
				if ( jQuery( window ).width() != resizeWidth || ( jQuery( window ).width() != resizeWidth && jQuery( window ).height() != resizeHeight ) ) {
					counterCircles.fusion_redraw_circles();
				}
			});
		}, {
			triggerOnce: true,
			offset: $offset
		});
	});

	// Counter Circles - Toggles, Tabs, Modals
	jQuery( '.fusion-accordian .counter-circle-wrapper, .fusion-tabs .counter-circle-wrapper, .fusion-modal .counter-circle-wrapper' ).on( 'appear', function() {
		jQuery( this ).fusion_draw_circles();
	});
});
