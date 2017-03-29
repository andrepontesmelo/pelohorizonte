jQuery( document ).ready( function( $ ) {

	function fusionPortfolioCheckForImage( url ) {
		return ( null !== url.match( '/\.(jpeg|jpg|gif|png)$/' ) );
	}

	// Make sure portfolio fixed width placeholders are sized correctly on resize
	jQuery( window ).on( 'resize', function() {
		jQuery( '.fusion-portfolio .fusion-portfolio-wrapper' ).each( function() {

			// Resize the placeholder images correctly in "fixed" picture size carousels
			if ( 'fixed' === jQuery( this ).data( 'picturesize' ) ) {
				jQuery( this ).find( '.fusion-placeholder-image' ).each( function() {
					jQuery( this ).css(	{
						'height': jQuery( this ).parents( '.fusion-portfolio-post' ).siblings().find( 'img' ).first().height(),
						'width': jQuery( this ).parents( '.fusion-portfolio-post' ).siblings().find( 'img' ).first().width()
					});

				});
			}
		});
	});

	// Handle the portfolio filter clicks
	jQuery( '.fusion-portfolio .fusion-filters a' ).click( function( e ) {

		// Relayout isotope based on filter selection
		var $filterActive      = jQuery( this ).data( 'filter' ),
		    $lightboxInstances = [],
		    $portfolioID       = jQuery( this ).parents( '.fusion-portfolio' ).data( 'id' );

		e.preventDefault();

		if ( ! $portfolioID ) {
			$portfolioID = '';
		}

		jQuery( this ).parents( '.fusion-portfolio' ).find( '.fusion-portfolio-wrapper' ).isotope( { filter: $filterActive } );

		// Remove active filter class from old filter item and add it to new
		jQuery( this ).parents( '.fusion-filters' ).find( '.fusion-filter' ).removeClass( 'fusion-active' );
		jQuery( this ).parent().addClass( 'fusion-active' );

		jQuery( this ).parents( '.fusion-portfolio' ).find( '.fusion-portfolio-wrapper' ).find( '.fusion-portfolio-post' ).each( function() {
			var $postID = '',
			    $filterSelector,
			    $lightboxString;

			// For individual per post galleries set the post id
			if ( 'individual' === avadaPortfolioVars.lightbox_behavior && jQuery( this ).find( '.fusion-rollover-gallery' ).length ) {
				$postID = jQuery( this ).find( '.fusion-rollover-gallery' ).data( 'id' );
			}

			if ( $filterActive.length > 1 ) {
				$filterSelector = $filterActive.substr( 1 );
				$lightboxString = 'iLightbox[' + $filterSelector + $postID  + $portfolioID + ']';
			} else {
				$filterSelector = 'fusion-portfolio-post';
				$lightboxString = 'iLightbox[gallery' + $postID + $portfolioID + ']';
			}

			if ( jQuery( this ).hasClass( $filterSelector ) || 1 == $filterActive.length ) {

				// Make sure that if $postID is empty the filter category is only added once to the lightbox array
				if ( $filterActive.length > 1 && jQuery.inArray( $filterSelector + $postID + $portfolioID, $lightboxInstances ) === -1 ) {
					$lightboxInstances.push( $filterSelector + $postID + $portfolioID );
				} else if ( 1 === $filterActive.length && -1 === jQuery.inArray( $postID + $portfolioID, $lightboxInstances ) ) {
					$lightboxInstances.push( 'gallery' + $postID + $portfolioID );
				}

				jQuery( this ).find( '.fusion-rollover-gallery' ).attr( 'data-rel', $lightboxString );
				jQuery( this ).find( '.fusion-portfolio-gallery-hidden a' ).attr( 'data-rel', $lightboxString );
			}
		});

		// Check if we need to create a new gallery
		if ( 'created' !== jQuery( this ).data( 'lightbox' ) ) {

			// Create new lightbox instance for the new galleries
			jQuery.each( $lightboxInstances, function( $key, $value ) {
				window.$ilInstances.push( jQuery( '[data-rel="iLightbox[' + $value + ']"], [rel="iLightbox[' + $value + ']"]' ).iLightBox( window.avadaLightBox.prepare_options( 'iLightbox[' + $value + ']' ) ) );
			});

			// Set filter to lightbox created
			jQuery( this ).data( 'lightbox', 'created' );
		}

		// Refresh the lightbox
		window.avadaLightBox.refresh_lightbox();
	});

	if ( Modernizr.mq( 'only screen and (max-width: 479px)' ) ) {
		jQuery( '.fusion-portfolio .fusion-rollover-gallery' ).each( function() {
			var img = jQuery( this ).attr( 'href' );

			if ( true === fusionPortfolioCheckForImage( img ) ) {
				jQuery( this ).parents( '.fusion-image-wrapper' ).find( '> img' ).attr( 'src', img ).attr( 'width', '' ).attr( 'height', '' );
			}
			jQuery( this ).parents( '.fusion-portfolio-post' ).css( 'width', 'auto' );
			jQuery( this ).parents( '.fusion-portfolio-post' ).css( 'height', 'auto' );
			jQuery( this ).parents( '.fusion-portfolio-one:not(.fusion-portfolio-one-text)' ).find( '.fusion-portfolio-post' ).css( 'margin', '0' );
		});

		if ( jQuery( '.fusion-portfolio' ).length ) {
			jQuery( '.fusion-portfolio-wrapper' ).isotope();
		}
	}
});
jQuery( window ).load( function() {
	if ( jQuery( '.sidebar' ).is( ':visible' ) ) {
		jQuery( '.post-content .fusion-portfolio' ).each( function() {
			var columns = jQuery( this ).data( 'columns' );
			jQuery( this ).addClass( 'fusion-portfolio-' + columns + '-sidebar' );
		});
	}

	// Portfolio isotope loading
	if ( jQuery().isotope && jQuery( '.fusion-portfolio .fusion-portfolio-wrapper' ).length ) {
		jQuery( '.fusion-portfolio .fusion-portfolio-wrapper' ).each( function() {

			var $isotopeFilter,
			    $filtersContainer,
			    $filters,
			    $filterActive,
			    $filterActiveLink,
			    $filterActiveDataSlug,
			    $posts,
			    $lightboxInstances,
			    $portfolioWrapper,
			    $portfolioWrapperID,
			    $placeholderImages,
			    $firstFilter,
			    $videos;

			jQuery( this ).next( '.fusion-load-more-button' ).fadeIn();

			// Resize the placeholder images correctly in "fixed" picture size carousels
			if ( 'fixed' === jQuery( this ).data( 'picturesize' ) ) {
				jQuery( this ).find( '.fusion-placeholder-image' ).each( function() {
					jQuery( this ).css(	{
						'height': jQuery( this ).parents( '.fusion-portfolio-post' ).siblings().find( 'img' ).first().height(),
						'width': jQuery( this ).parents( '.fusion-portfolio-post' ).siblings().find( 'img' ).first().width()
					});

				});
			} else {
				jQuery( this ).find( '.fusion-placeholder-image' ).each( function() {
					jQuery( this ).css(	{
						'width': jQuery( this ).parents( '.fusion-portfolio-post' ).siblings().first().find( 'img' ).width()
					});

				});
			}

			$isotopeFilter    = '',
			$filtersContainer = jQuery( this ).parents( '.fusion-portfolio' ).find( '.fusion-filters' );

			// Check if filters are displayed
			if ( $filtersContainer.length ) {

				// Set needed variables
				$filters              = $filtersContainer.find( '.fusion-filter' );
				$filterActive         = $filtersContainer.find( '.fusion-active' );
				$filterActiveLink     = $filterActive.children( 'a' );
				$filterActiveDataSlug = $filterActiveLink.attr( 'data-filter' ).substr( 1 );
				$posts                = jQuery( this ).find( '.fusion-portfolio-post' );
				$lightboxInstances    = [];
				$firstFilter          = true;

				// Loop through filters
				if ( $filters ) {
					$filters.each( function() {
						var $filter = jQuery( this ),
						    $filterName = $filter.children( 'a' ).data( 'filter' );

						// Loop through initial post set
						if ( $posts ) {

							// If "All" filter is deactivated, hide posts for later check for active filter
							if ( $filterActiveDataSlug.length ) {
								$posts.hide();
							}

							jQuery( '.fusion-filters' ).show();

							$posts.each( function() {
								var $post            = jQuery( this ),
								    $postGalleryName = $post.find( '.fusion-rollover-gallery' ).data( 'rel' ),
								    $lightboxFilter;

								// If a post belongs to an invisible filter, fade filter in
								if ( $post.hasClass( $filterName.substr( 1 ) ) ) {
									if ( $filter.hasClass( 'fusion-hidden' ) ) {
										$filter.removeClass( 'fusion-hidden' );

										if ( true === $firstFilter && 0 === $filtersContainer.find( '.fusion-filter-all' ).length ) {

											//Add active class to this filter and recalculate variables data.
											$filtersContainer.find( '.fusion-filter' ).removeClass( 'fusion-active' );
											$filter.addClass( 'fusion-active' );
											$firstFilter          = false;
											$filterActive         = $filtersContainer.find( '.fusion-active' );
											$filterActiveLink     = $filterActive.children( 'a' );
											$filterActiveDataSlug = $filterActiveLink.attr( 'data-filter' ).substr( 1 );
										}

									}
								}

								// If "All" filter is deactivated, only show the items of the first filter (which is auto activated)
								if ( $filterActiveDataSlug.length && $post.hasClass( $filterActiveDataSlug ) ) {
									$post.show();

									// Set the lightbox gallery
									if ( $postGalleryName ) {
										$lightboxFilter = $postGalleryName.replace( 'gallery', $filterActiveDataSlug );

										$post.find( '.fusion-rollover-gallery' ).attr( 'data-rel', $lightboxFilter );
										if ( jQuery.inArray( $lightboxFilter, $lightboxInstances ) === -1 ) {
											$lightboxInstances.push( $lightboxFilter );
										}
									}
								}
							});
						}
					});
				}

				if ( $filterActiveDataSlug.length ) {

					// If "All" filter is deactivated set the sotope filter to the first active element
					$isotopeFilter = '.' + $filterActiveDataSlug;

					// Create new lightbox instance for the new galleries
					jQuery.each( $lightboxInstances, function( $key, $value ) {
						window.$ilInstances.push( jQuery( '[data-rel="' + $value + '"], [rel="' + $value + '"]' ).iLightBox( window.avadaLightBox.prepare_options( $value ) ) );
					});

					// Refresh the lightbox
					window.avadaLightBox.refresh_lightbox();

					// Set active filter to lightbox created
					$filterActiveLink.data( 'lightbox', 'created' );
				}
			}

			// Refresh the scrollspy script for one page layouts
			jQuery( '[data-spy="scroll"]' ).each( function() {
				var $spy = jQuery( this ).scrollspy( 'refresh' );
			});

			$portfolioWrapper   = jQuery( this ),
			$portfolioWrapperID = $portfolioWrapper.attr( 'id' );

			// Done for multiple instances of portfolio shortcode. Isotope needs ids to distinguish between instances.
			if ( $portfolioWrapperID ) {
				$portfolioWrapper = jQuery( '#' + $portfolioWrapperID );
			}

			setTimeout( function() {

				// Initialize isotope depending on the portfolio layout
				if ( $portfolioWrapper.parent().hasClass( 'fusion-portfolio-one' ) ) {
					window.$portfolio_isotope = $portfolioWrapper;
					window.$portfolio_isotope.isotope({

						// Isotope options
						itemSelector: '.fusion-portfolio-post',
						layoutMode: 'vertical',
						transformsEnabled: false,
						isOriginLeft: jQuery( '.rtl' ).length ? false : true,
						filter: $isotopeFilter
					});
				} else {
					window.$portfolio_isotope = $portfolioWrapper;
					window.$portfolio_isotope.isotope({

						// Isotope options
						itemSelector: '.fusion-portfolio-post',
						resizable: true,
						layoutMode: avadaPortfolioVars.isotope_type,
						transformsEnabled: false,
						isOriginLeft: jQuery( '.rtl' ).length ? false : true,
						filter: $isotopeFilter
					});
				}
			}, 1 );

			// Fade in placeholder images
			$placeholderImages = jQuery( this ).find( '.fusion-portfolio-post .fusion-placeholder-image' );
			$placeholderImages.each( function() {
				jQuery( this ).parents( '.fusion-portfolio-content-wrapper, .fusion-image-wrapper' ).animate({ opacity: 1 });
			});

			// Fade in videos
			$videos = jQuery( this ).find( '.fusion-portfolio-post .fusion-video' );
			$videos.each( function() {
				jQuery( this ).animate({ opacity: 1 });
				jQuery( this ).parents( '.fusion-portfolio-content-wrapper' ).animate({ opacity: 1 });
			});

			$videos.fitVids();

			// Portfolio Images Loaded Check
			window.$portfolio_images_index = 0;

			jQuery( this ).imagesLoaded().progress( function( $instance, $image ) {
				if ( jQuery( $image.img ).parents( '.fusion-portfolio-content-wrapper' ).length >= 1 ) {
					jQuery( $image.img, $placeholderImages ).parents( '.fusion-portfolio-content-wrapper' ).delay( 100 * window.$portfolio_images_index ).animate({
						opacity: 1
					});
				} else {
					jQuery( $image.img, $placeholderImages ).parents( '.fusion-image-wrapper' ).delay( 100 * window.$portfolio_images_index ).animate({
						opacity: 1
					});
				}

				window.$portfolio_images_index++;
			});

			setTimeout(
				function() {
					jQuery( window ).trigger( 'resize' );
				}, 250
			);
		});
	}

	jQuery( '.fusion-portfolio-paging-infinite, .fusion-portfolio-paging-load-more-button' ).each( function() {
		var $portfolioInfiniteScrollContainer        = jQuery( this ),
		    $portfolioInfiniteScrollContainerClasses = '.' + $portfolioInfiniteScrollContainer.attr( 'class' ).replace( /\ /g, '.' ).replace( /.fusion\-portfolio\-[a-zA-Z]+\-sidebar/g, '' ) + ' ';

		// Initialize the infinite scroll object
		$portfolioInfiniteScrollContainer.children( '.fusion-portfolio-wrapper' ).infinitescroll({
			navSelector: $portfolioInfiniteScrollContainerClasses + '.pagination',

			// Selector for the paged navigation (it will be hidden)
			nextSelector: $portfolioInfiniteScrollContainerClasses + '.pagination-next',

			// Selector for the NEXT link (to page 2)
			itemSelector: $portfolioInfiniteScrollContainerClasses + 'div.pagination .current, ' + $portfolioInfiniteScrollContainerClasses + ' .fusion-portfolio-post',

			// Selector for all items you'll retrieve
			loading: {
				finishedMsg: avadaPortfolioVars.infinite_finished_msg,
				msg: jQuery( '<div class="fusion-loading-container fusion-clearfix"><div class="fusion-loading-spinner"><div class="fusion-spinner-1"></div><div class="fusion-spinner-2"></div><div class="fusion-spinner-3"></div></div><div class="fusion-loading-msg">' + avadaPortfolioVars.infinite_blog_text + '</div>' )
			},
			errorCallback: function() {
				$portfolioInfiniteScrollContainer.find( '.fusion-portfolio-wrapper' ).isotope();
			}

		}, function( $posts ) {

			var $filters;

			if ( jQuery().isotope ) {

				$filters = $portfolioInfiniteScrollContainer.find( '.fusion-filters' ).find( '.fusion-filter' ),
				$posts   = jQuery( $posts );

				// Hide posts while loading
				$posts.hide();

				// Make sure images are loaded before the posts get shown
				imagesLoaded( $posts, function() {

					var $placeholderImages,
					    $videos,
					    $filterActiveElement,
					    $filterActive,
					    $currentPage;

					// Fade in placeholder images
					$placeholderImages = jQuery( $posts ).find( '.fusion-placeholder-image' );
					$placeholderImages.parents( '.fusion-portfolio-content-wrapper, .fusion-image-wrapper' ).animate({ opacity: 1 });

					// Fade in videos
					$videos = jQuery( $posts ).find( '.fusion-video' );
					$videos.each( function() {
						jQuery( this ).animate({ opacity: 1 });
						jQuery( this ).parents( '.fusion-portfolio-content-wrapper' ).animate({ opacity: 1 });
					});

					$videos.fitVids();

					// Portfolio Images Loaded Check
					window.$portfolio_images_index = 0;
					jQuery( $posts ).imagesLoaded().progress( function( $instance, $image ) {
						if ( jQuery( $image.img ).parents( '.fusion-portfolio-content-wrapper' ).length >= 1 ) {
							jQuery( $image.img, $placeholderImages ).parents( '.fusion-portfolio-content-wrapper' ).delay( 100 * window.$portfolio_images_index ).animate({
								opacity: 1
							});
						} else {
							jQuery( $image.img, $placeholderImages ).parents( '.fusion-image-wrapper' ).delay( 100 * window.$portfolio_images_index ).animate({
								opacity: 1
							});
						}

						window.$portfolio_images_index++;
					});

					if ( $filters ) {

						// Loop through all filters
						$filters.each( function() {
							var $filter     = jQuery( this ),
							    $filterName = $filter.children( 'a' ).data( 'filter' ),
							    $filterWidth,
							    $filterMarginRight,
							    $post;

							if ( $posts ) {

								// Loop through the newly loaded posts
								$posts.each( function() {
									$post = jQuery( this );

									// Check if one of the new posts has the class of a still hidden filter
									if ( $post.hasClass( $filterName.substr( 1 ) ) ) {
										if ( $filter.hasClass( 'fusion-hidden' ) ) {

											if ( ! Modernizr.mq( 'only screen and (max-width: ' + avadaPortfolioVars.content_break_point + 'px)' ) ) {

												// Animate the filter to make it visible
												$filterWidth       = $filter.css( 'width' ),
												$filterMarginRight = $filter.css( 'margin-right' );

												$filter.css( 'width', 0 );
												$filter.css( 'margin-right', 0 );
												$filter.removeClass( 'fusion-hidden' );

												$filter.animate({
													'width': $filterWidth,
													'margin-right': $filterMarginRight
												}, 400, function() {

													// Finally remove animation style values
													$filter.removeAttr( 'style' );
												});
											} else {
												$filter.fadeIn( 400, function() {
													$filter.removeClass( 'fusion-hidden' );
												});
											}
										}
									}
								});
							}
						});
					}

					// Check if filters are displayed
					if ( $portfolioInfiniteScrollContainer.find( '.fusion-filters' ).length ) {

						// Display new posts based on filter selection
						$filterActiveElement = $portfolioInfiniteScrollContainer.find( '.fusion-filters' ).find( '.fusion-filter.fusion-active a' ),
							$filterActive = $filterActiveElement.attr( 'data-filter' ).substr( 1 );

						// If active filter is not the "All" filter
						if ( $filterActive.length ) {

							// Show the new posts matching the active filter
							$posts.each( function() {
								var $post = jQuery( this ),
								    $postGalleryName = $post.find( '.fusion-rollover-gallery' ).data( 'rel' );

								if ( $post.hasClass( $filterActive ) ) {
									$post.fadeIn();

									// Set the lightbox gallery
									if ( $postGalleryName ) {
										$post.find( '.fusion-rollover-gallery' ).attr( 'data-rel', $postGalleryName.replace( 'gallery', $filterActive ) );
									}
								}
							});

							// Check if we need to create a new gallery
							if ( 'created' !== $filterActiveElement.data( 'lightbox' ) ) {

								// Create new lightbox instance for the new gallery
								window.$ilInstances.push( jQuery( '[data-rel^="iLightbox[' + $filterActive + ']"]' ).iLightBox( window.avadaLightBox.prepare_options( 'iLightbox[' + $filterActive + ']' ) ) );

								// Set active filter to lightbox created
								$filterActiveElement.data( 'lightbox', 'created' );
							}

							// Refresh the lightbox, needed in any case
							window.avadaLightBox.refresh_lightbox();

						} else {
							$posts.fadeIn();
						}
					} else {
						$posts.fadeIn();
					}

					// Trigger isotope for correct positioning
					$portfolioInfiniteScrollContainer.find( '.fusion-portfolio-wrapper' ).isotope( 'appended', $posts );

					// Trigger fitvids
					$posts.each( function() {
						jQuery( this ).find( '.full-video, .video-shortcode, .wooslider .slide-content' ).fitVids();
					});

					// Refresh the scrollspy script for one page layouts
					jQuery( '[data-spy="scroll"]' ).each( function() {
						var $spy = jQuery( this ).scrollspy( 'refresh' );
					});

					// Hide the load more button, if the currently loaded page is already the last page
					$currentPage = $portfolioInfiniteScrollContainer.find( '.current' ).html();
					$portfolioInfiniteScrollContainer.find( '.current' ).remove();

					if ( $portfolioInfiniteScrollContainer.data( 'pages' ) == $currentPage ) {
						$portfolioInfiniteScrollContainer.find( '.fusion-loading-container' ).hide();
						$portfolioInfiniteScrollContainer.find( '.fusion-load-more-button' ).hide();
					}
				});
			}
		});

		// Hide the load more button, if there is only one page
		if ( '1' == $portfolioInfiniteScrollContainer.data( 'pages' ) ) {
			$portfolioInfiniteScrollContainer.find( '.fusion-loading-container' ).hide();
			$portfolioInfiniteScrollContainer.find( '.fusion-load-more-button' ).hide();
		}

		// Setup infinite scroll manual loading
		if ( $portfolioInfiniteScrollContainer.hasClass( 'fusion-portfolio-paging-load-more-button' ) ) {
			$portfolioInfiniteScrollContainer.find( '.fusion-portfolio-wrapper' ).infinitescroll( 'unbind' );

			$portfolioInfiniteScrollContainer.find( '.fusion-load-more-button' ).on( 'click', function( e ) {
				e.preventDefault();

				// Use the retrieve method to get the next set of posts
				$portfolioInfiniteScrollContainer.find( '.fusion-portfolio-wrapper' ).infinitescroll( 'retrieve' );

				// Trigger isotope for correct positioning
				$portfolioInfiniteScrollContainer.find( '.fusion-portfolio-wrapper' ).isotope();
			});
		}
	});
});
