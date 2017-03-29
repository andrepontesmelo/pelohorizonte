// Setup filters and click events for faq elements
jQuery( '.fusion-faq-shortcode' ).each( function() {

	// Initialize the filters and corresponding posts
	// Check if filters are displayed
	var $faqsElement    = jQuery( this ),
	    $filtersWrapper = $faqsElement.find( '.fusion-filters' ),
	    $filters,
	    $filterActiveElement,
	    $filterActive,
	    $posts;

		// Make the faq posts visible
		$faqsElement.find( '.fusion-faqs-wrapper' ).fadeIn();

	if ( $filtersWrapper.length ) {

		// Make filters visible
		$filtersWrapper.fadeIn();

		// Set needed variables
		$filters             = $filtersWrapper.find( '.fusion-filter' );
		$filterActiveElement = $filtersWrapper.find( '.fusion-active' ).children( 'a' );
		$filterActive        =  $filterActiveElement.attr( 'data-filter' ).substr( 1 );
		$posts               = jQuery( this ).find( '.fusion-faqs-wrapper .fusion-faq-post' );

		// Loop through filters
		if ( $filters ) {
			$filters.each( function() {
				var $filter     = jQuery( this ),
				    $filterName = $filter.children( 'a' ).data( 'filter' );

				// Loop through post set
				if ( $posts ) {

					// If "All" filter is deactivated, hide posts for later check for active filter
					if ( $filterActive.length ) {
						$posts.hide();
					}

					$posts.each( function() {
						var $post = jQuery( this );

						// If a post belongs to an invisible filter, fade the filter in
						if ( $post.hasClass( $filterName.substr( 1 ) ) ) {
							if ( $filter.hasClass( 'fusion-hidden' ) ) {
								$filter.removeClass( 'fusion-hidden' );
							}
						}

						// If "All" filter is deactivated, only show the items of the first filter (which is auto activated)
						if ( $filterActive.length && $post.hasClass( $filterActive ) ) {
							$post.show();
						}
					});
				}
			});
		}
	}

	// Handle the filter clicks
	$faqsElement.find( '.fusion-filters a' ).click( function( e ) {

		var selector = jQuery( this ).attr( 'data-filter' );

		e.preventDefault();

		// Fade out the faq posts and fade in the ones matching the selector
		$faqsElement.find( '.fusion-faqs-wrapper .fusion-faq-post' ).fadeOut();
		setTimeout( function() {
			$faqsElement.find( '.fusion-faqs-wrapper .fusion-faq-post' + selector ).fadeIn();
		}, 400 );

		// Set the active
		jQuery( this ).parents( '.fusion-filters' ).find( '.fusion-filter' ).removeClass( 'fusion-active' );
		jQuery( this ).parent().addClass( 'fusion-active' );
	});
});
