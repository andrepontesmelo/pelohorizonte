this.imagePreview = function() {
	jQuery( '.theme' ).hover( function( e ) {
		jQuery( this ).find( '.screenshot-hover' )
			.css( 'visibility', 'visible' );
    },
	function() {
		jQuery( this ).find( '.screenshot-hover' )
			.css( 'visibility', 'visible' );
    });
};

// Starting the script on page load.
jQuery( document ).ready( function() {
	imagePreview();

	jQuery( '.help_tip' ).tipTip({
		attribute: 'data-tip'
	});

	jQuery( 'a.help_tip' ).click( function() {
		return false;
	});

	jQuery( 'a.debug-report' ).click( function() {

		var report = '';

		jQuery( '.avada-system-status table:not(.fusion-system-status-debug) thead, .avada-system-status:not(.fusion-system-status-debug) tbody' ).each( function() {

			var label;

			if ( jQuery( this ).is( 'thead' ) ) {

				label = jQuery( this ).find( 'th:eq(0)' ).data( 'export-label' ) || jQuery( this ).text();
				report = report + '\n### ' + jQuery.trim( label ) + ' ###\n\n';

			} else {

				jQuery( 'tr', jQuery( this ) ).each( function() {

					var label           = jQuery( this ).find( 'td:eq(0)' ).data( 'export-label' ) || jQuery( this ).find( 'td:eq(0)' ).text(),
					    theName         = jQuery.trim( label ).replace( /(<([^>]+)>)/ig, '' ), // Remove HTML.
						theValueElement = jQuery( this ).find( 'td:eq(2)' ),
						theValue,
					    valueArray,
					    output,
					    tempLine;

					if ( jQuery( theValueElement ).find( 'img' ).length >= 1 ) {
						theValue = jQuery.trim( jQuery( theValueElement ).find( 'img' ).attr( 'alt' ) );
					} else {
						theValue = jQuery.trim( jQuery( this ).find( 'td:eq(2)' ).text() );
					}
					valueArray = theValue.split( ', ' );

					if ( valueArray.length > 1 ) {

						// If value have a list of plugins ','
						// Split to add new line.
						output   = '';
						tempLine = '';
						jQuery.each( valueArray, function( key, line ) {
							tempLine = tempLine + line + '\n';
						});

						theValue = tempLine;
					}

					report = report + '' + theName + ': ' + theValue + '\n';
				});

			}
		});

		try {
			jQuery( '#debug-report' ).slideDown();
			jQuery( '#debug-report textarea' ).val( report ).focus().select();
			jQuery( this ).parent().fadeOut();
			return false;
		} catch ( e ) {
			console.log( e );
		}

		return false;
	});

	jQuery( '#copy-for-support' ).tipTip({
		'attribute':  'data-tip',
		'activation': 'click',
		'fadeIn':     50,
		'fadeOut':    50,
		'delay':      0
	});

	jQuery( 'body' ).on( 'copy', '#copy-for-support', function( e ) {
		e.clipboardData.clearData();
		e.clipboardData.setData( 'text/plain', jQuery( '#debug-report textarea' ).val() );
		e.preventDefault();
	});
});

jQuery( document ).ready( function( e ) {

	var $confirm;

	if ( jQuery( 'body' ).hasClass( 'avada_page_avada-demos' ) ) {

		// If clicked on import data button.
		jQuery( '.button-install-demo' ).live( 'click', function( e ) {
			var $selectedDemo   = jQuery( this ).data( 'demo-id' ),
			    $loadingIcon    = jQuery( '.preview-' + $selectedDemo ),
			    $successIcon    = jQuery( '.success-' + $selectedDemo ),
			    $warningIcon    = jQuery( '.warning-' + $selectedDemo ),
			    $disablePreview = jQuery( '.preview-all' ),
			    $confirm,
			    data;

			if ( 'classic' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA CLASSIC DEMO REQUIREMENTS:\n\n• Memory Limit of 256 MB and max execution time (php time limit) of 300 seconds.\n\n• Fusion Core, Revolution Slider and LayerSlider must be activated for sliders to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else if ( 'cafe' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core must be activated for sliders to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else if ( 'church' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core must be activated for sliders to import.\n\n• The Events Calendar Plugin must be activated for all event data to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else if ( 'modern_shop' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core must be activated for sliders to import.\n\n• WooCommerce must be activated for all shop data to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			}  else if ( 'classic_shop' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core and Revolution Slider must be activated for sliders to import.\n\n• WooCommerce must be activated for all shop data to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else if ( 'landing_product' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core and Revolution Slider must be activated for sliders to import.\n\n• WooCommerce must be activated for all shop data to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			}  else if ( 'forum' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core must be activated for sliders to import.\n\n• bbPress must be activated for all forum data to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else if ( 'technology' === $selectedDemo ) {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 256 MB and max execution time (php time limit) of 300 seconds.\n\n• Fusion Core and LayerSlider must be activated for sliders to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			} else {
				$confirm = window.confirm( 'WARNING:\n\nImporting demo content will give you sliders, pages, posts, theme options, widgets, sidebars and other settings. This will replicate the live demo. Clicking this option will replace your current theme options and widgets. It can also take a minute to complete.\n\n-----------------------------------------------\n\nAVADA ' + $selectedDemo.toUpperCase() + ' DEMO REQUIREMENTS:\n\n• Memory Limit of 128 MB and max execution time (php time limit) of 180 seconds.\n\n• Fusion Core must be activated for sliders to import.\n\n• Contact Form 7 plugin must be activated for the form to import.\n\n• Fusion Builder must be activated for page content to display as intended.' );
			}
			if ( true === $confirm || 'true' === $confirm || 1 === $confirm ) {
				$loadingIcon.show();
				$disablePreview.show();

				data = {
					action: 'fusion_import_demo_data',
					security: DemoImportNonce,
					demo_type: $selectedDemo
				};

				jQuery( '.importer-notice' ).hide();

				jQuery.post( ajaxurl, data, function( $response ) {
					if ( -1 === $response && $response.indexOf( 'imported' ) ) {
						jQuery( '.importer-notice-1' ).attr( 'style', 'display:block !important' );
						$warningIcon.show();
						setTimeout( function() {
							$warningIcon.hide();
							$disablePreview.hide();
						}, 4000 );
					} else {
						jQuery( '.importer-notice-2' ).attr( 'style', 'display:block !important' );
						$successIcon.show();
						setTimeout( function() {
							$successIcon.hide();
							$disablePreview.hide();
						}, 4000 );
					}
					$loadingIcon.hide();
				}).fail( function() {
					jQuery( '.importer-notice-3' ).attr( 'style', 'display:block !important' );
						$warningIcon.show();
						setTimeout( function() {
							$warningIcon.hide();
							$disablePreview.hide();
						}, 4000 );
					$loadingIcon.hide();

				});
			}

			e.preventDefault();
		});

		if ( 'undefined' !== typeof allTags ) {
			// The tag-selector for demos.
			_.each( allTags, function( tagName, tagSlug ) {
				var tagButtonSelector = '.avada-importer-tags-selector button[data-tag="' + tagSlug + '"]';

				// When we click on a tag button.
				jQuery( tagButtonSelector ).click( function() {

					// De-select all buttons.
					jQuery( '.avada-importer-tags-selector button' ).removeClass( 'button-primary' );
					jQuery( '.avada-importer-tags-selector button' ).addClass( 'button-secondary' );

					// Select the current button.
					jQuery( this ).addClass( 'button-primary' );

					// Hide all demos except the ones corresponding to the tag we selected.
					jQuery( '.avada-demo-themes .theme' ).each( function() {
						var demo     = this,
						    demoTags = jQuery( this ).data( 'tags' ).split( ',' );

						if ( 'all' === tagSlug ) {
							jQuery( demo ).show();
						} else {
							jQuery( demo ).hide();
							_.each( demoTags, function( demoTag ) {
								if ( demoTag === tagSlug ) {
									jQuery( demo ).show();
								}
							});
						}
					});
				});
			});
		}

	}

	if ( jQuery( 'body' ).hasClass( 'avada_page_avada-plugins' ) ) {

		jQuery( '.avada-install-plugins .theme-actions .button-primary.disabled' ).on( 'click', function( e ) {
			e.preventDefault();

			if ( jQuery( this ).hasClass( 'fusion-builder' ) ) {
				$confirm = window.alert( 'ERROR:\n\nFusion Builder Plugin can only be installed and activated if Fusion Core plugin is at version 3.0 or higher. Your version of Fusion Core is ' + jQuery( this ).data( 'version' ) + '. Please update Fusion Core first.' );
			} else {
				$confirm = window.alert( 'ERROR:\n\nThis plugin can only be installed or updated, after you have successfully completed the Avada product registration on the "Product Registration" tab.' );
			}
		});

		jQuery( '#manage-plugins' ).on( 'click', function( e ) {

			var $href              = jQuery( this ).attr( 'href' ),
			    $hrefHash          = $href.substr( $href.indexOf( '#' ) ).slice( 1 ),
			    $target            = jQuery( '#' + $hrefHash ),
			    $adminbarHeight    = jQuery( '#wpadminbar' ).height(),
			    $newScrollPosition = $target.offset().top - $adminbarHeight;
			    $adminbarHeight;

			e.preventDefault();

			jQuery( 'html, body' ).animate({
				scrollTop: $newScrollPosition
			}, 450 );
		});
	}
});
