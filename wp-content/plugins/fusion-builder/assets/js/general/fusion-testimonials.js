jQuery( window ).load( function() {
	var reviewsCycleArgs;

	// Testimonials
	function onBefore( curr, next, opts, fwd ) {
	  var $ht = jQuery( this ).height();

	  // Set the active testimonial class for resize event
	  jQuery( this ).parent().children().removeClass( 'active-testimonial' );
	  jQuery( this ).addClass( 'active-testimonial' );

	  // Set the container's height to that of the current slide
	  jQuery( this ).parent().animate( { height: $ht }, 500 );
	}

	if ( jQuery().cycle ) {
		reviewsCycleArgs = {
			fx: 'fade',
			before:  onBefore,
			containerResize: 0,
			containerResizeHeight: 1,
			height: 'auto',
			width: '100%',
			fit: 1,
			speed: 500,
			delay: 0
		};

		if ( fusionTestimonialVars.testimonials_speed ) {
			reviewsCycleArgs.timeout = parseInt( fusionTestimonialVars.testimonials_speed );
		}

		reviewsCycleArgs.pager = '.testimonial-pagination';

		jQuery( '.fusion-testimonials .reviews' ).each( function() {
			if ( 1 == jQuery( this ).children().length ) {
				jQuery( this ).children().fadeIn();
			}

			reviewsCycleArgs.pager = '#' + jQuery( this ).parent().find( '.testimonial-pagination' ).attr( 'id' );

			reviewsCycleArgs.random = jQuery( this ).parent().data( 'random' );
			jQuery( this ).cycle( reviewsCycleArgs );
		});

		jQuery( window ).resize( function() {
			jQuery( '.fusion-testimonials .reviews' ).each( function() {
				jQuery( this ).css( 'height', jQuery( this ).children( '.active-testimonial' ).height() );
			});
		});
	}
});
