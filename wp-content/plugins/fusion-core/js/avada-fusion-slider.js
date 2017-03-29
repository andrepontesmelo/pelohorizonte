var headerHeight = jQuery( '.fusion-header-wrapper' ).height(),
    vimeoPlayers = jQuery( '.flexslider' ).find( 'iframe' ), player;

var fusionReanimateSlider = function( contentContainer ) {
	var slideContent = contentContainer.find( '.slide-content' );

	jQuery( slideContent ).each( function() {

		jQuery( this ).stop( true, true );

		jQuery( this ).css( 'opacity', '0' );
		jQuery( this ).css( 'margin-top', '50px' );

		jQuery( this ).animate({
			'opacity': '1',
			'margin-top': '0'
		}, 1000 );

	});
};

( function( jQuery ) {

	'use strict';

	jQuery( '.tfs-slider' ).each( function() {
		var thisTFSlider = this;

		if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
			jQuery( thisTFSlider ).data( 'parallax', 0 );
			jQuery( thisTFSlider ).data( 'full_screen', 0 );
		}

		if ( cssua.ua.tablet_pc ) {
			jQuery( thisTFSlider ).data( 'parallax', 0 );
		}

		if ( cssua.ua.mobile ) {
			jQuery( thisTFSlider ).data( 'parallax', 0 );
		}
	});

})( jQuery );
jQuery( window ).load( function() {
	if ( jQuery().flexslider ) {

		jQuery( '.tfs-slider' ).each( function() {
			var thisTFSlider = this,
			    firstSlide   = jQuery( thisTFSlider ).find( 'li' ).get( 0 ),
			    sliderHeight,
			    sliderWidth,
			    percentageWidth,
			    aspectRatio,
			    compareWidth,
			    boxedModeWidth,
			    slideContent,
			    resizeWidth,
			    resizeHeight,
			    wpadminbarHeight;
			if ( 'function' === typeof fusionCalculateResponsiveTypeValues ) {
				fusionSetOriginalTypographyData();
				fusionCalculateResponsiveTypeValues( jQuery( this ).data( 'typo_sensitivity' ), jQuery( this ).data( 'typo_factor' ), 800, '.tfs-slider h2, .tfs-slider h3' );
			}
			if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
				jQuery( thisTFSlider ).data( 'parallax', 0 );
				jQuery( thisTFSlider ).data( 'full_screen', 0 );
			}

			if ( cssua.ua.tablet_pc ) {
				jQuery( thisTFSlider ).data( 'parallax', 0 );
			}

			if ( cssua.ua.mobile || Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
				jQuery( thisTFSlider ).data( 'parallax', 0 );
			}

			wpadminbarHeight = 0;
			if ( 1 <= jQuery( '#wpadminbar' ).length ) {
				wpadminbarHeight = jQuery( '#wpadminbar' ).height();
			}

			if ( 1 <= jQuery( thisTFSlider ).parents( '#sliders-container' ).length && 1 === jQuery( thisTFSlider ).data( 'parallax' ) ) {
				jQuery( '.fusion-header' ).addClass( 'fusion-header-backface' );
			}

			if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) ) {
				sliderHeight = jQuery( window ).height();

				if ( 'above' === avadaFusionSliderVars.slider_position  ) {
					sliderHeight = sliderHeight - ( headerHeight + wpadminbarHeight );
				}

				if ( 0 === jQuery( thisTFSlider ).data( 'parallax' ) ) {
					if ( 1 == avadaFusionSliderVars.header_transparency || 'above' === avadaFusionSliderVars.slider_position ) {
						sliderHeight = jQuery( window ).height() - wpadminbarHeight;
					} else {
						sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
					}
				}

				if (  Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
					if ( 'below' === avadaFusionSliderVars.slider_position ) {
						sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
					} else {
						sliderHeight = jQuery( window ).height() - wpadminbarHeight;
					}
				}

				// Framed look, remove the offsets from height.
				if ( jQuery( '.fusion-top-frame' ).length ) {
					sliderHeight = sliderHeight - jQuery( '.fusion-top-frame' ).height() - jQuery( '.fusion-bottom-frame' ).height();
				}
				jQuery( thisTFSlider ).find( 'video' ).each( function() {
					var aspectRatio    = jQuery( this ).width() / jQuery( this ).height(),
					    arcSliderWidth = aspectRatio * sliderHeight,
					    arcSliderLeft  = '-' + ( ( arcSliderWidth - jQuery( thisTFSlider ).width() ) / 2 ) + 'px',
					    compareWidth   = jQuery( thisTFSlider ).parent().parent().parent().width(),
					    $position;

					if ( jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
						compareWidth   = jQuery( thisTFSlider ).width();
					}

					if ( compareWidth > arcSliderWidth ) {
						arcSliderWidth = '100%';
						arcSliderLeft = 0;
						$position = 'static';
					} else {
						$position = 'absolute';
					}
					jQuery( this ).width( arcSliderWidth );
					jQuery( this ).css({
						'left': arcSliderLeft,
						'position': $position
					});
				});
			} else {
				sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );

				if ( -1 != sliderWidth.indexOf( '%' ) ) {
					sliderWidth = jQuery( firstSlide ).find( '.background-image' ).data( 'imgwidth' );
					if ( ! sliderWidth && ! cssua.ua.mobile ) {
						sliderWidth = jQuery( firstSlide ).find( 'video' ).width();
					}

					if ( ! sliderWidth ) {
						sliderWidth = 940;
					}

					jQuery( thisTFSlider ).data( 'first_slide_width', sliderWidth );

					if ( sliderWidth < jQuery( thisTFSlider ).data( 'slider_width' ) ) {
						sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );
					}

					percentageWidth = true;
				} else {
					sliderWidth = parseInt( jQuery( thisTFSlider ).data( 'slider_width' ) );
				}

				sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
				aspectRatio = sliderHeight / sliderWidth;

				if ( aspectRatio < 0.5 ) {
					aspectRatio = 0.5;
				}

				compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
				if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
					compareWidth = jQuery( thisTFSlider ).width();
				}
				sliderHeight = aspectRatio * compareWidth;

				if ( sliderHeight > parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) ) ) {
					sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
				}

				if ( sliderHeight < 200 ) {
					sliderHeight = 200;
				}
			}

			if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) ) {
				jQuery( thisTFSlider ).css( 'max-width', '100%' );
				jQuery( thisTFSlider ).find( '.slides, .background' ).css( 'width', '100%' );
			}

			if ( ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) && ! jQuery( thisTFSlider ).hasClass( 'fixed-width-slider' ) && 1 == jQuery( thisTFSlider ).data( 'parallax' ) ) {
				jQuery( thisTFSlider ).css( 'max-width', jQuery( '#wrapper' ).width() );
				if ( jQuery( 'body' ).hasClass( 'side-header-left' ) ) {
					jQuery( thisTFSlider ).css( 'left', jQuery( '#side-header' ).width() );
				} else if ( jQuery( 'body' ).hasClass( 'side-header-right' ) ) {
					jQuery( thisTFSlider ).css( 'right', jQuery( '#side-header' ).width() );
				}
			}

			jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
			jQuery( thisTFSlider ).css( 'height', sliderHeight );
			jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );

			if ( 1 <= jQuery( '.layout-boxed-mode' ).length ) {
				boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width();
				jQuery( thisTFSlider ).css( 'width', boxedModeWidth );
				jQuery( thisTFSlider ).css( 'margin-left', 'auto' );
				jQuery( thisTFSlider ).css( 'margin-right', 'auto' );

				if ( 1 == jQuery( thisTFSlider ).data( 'parallax' ) && ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
					jQuery( thisTFSlider ).css( 'left', '50%' );
					if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
						boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width() - jQuery( '.layout-boxed-mode #side-header' ).width();
						if ( 'Right' === avadaFusionSliderVars.header_position ) {
							boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width() + jQuery( '.layout-boxed-mode #side-header' ).width();
						}
						jQuery( thisTFSlider ).css( 'margin-left', '-' + Math.floor( boxedModeWidth / 2 ) + 'px' );
					} else {
						jQuery( thisTFSlider ).css( 'margin-left', '-' + ( boxedModeWidth / 2 ) + 'px' );
					}
				}
				jQuery( thisTFSlider ).find( '.slides, .background' ).css( 'width', '100%' );
			}

			if ( cssua.ua.mobile ) {
				jQuery( thisTFSlider ).find( '.fusion-button' ).each( function() {
					jQuery( this ).removeClass( 'button-xlarge button-large button-medium' );
					jQuery( this ).addClass( 'button-small' );
				});
				jQuery( thisTFSlider ).find( 'li' ).each( function() {
					jQuery( this ).attr( 'data-autoplay', 'no' );
					jQuery( this ).data( 'autoplay', 'no' );
				});
			}

			jQuery( thisTFSlider ).find( 'a.button' ).each( function() {
				jQuery( this ).data( 'old', jQuery( this ).attr( 'class' ) );
			});

			if ( Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.content_break_point + 'px)' ) ) {
				jQuery( thisTFSlider ).find( '.fusion-button' ).each( function() {
					jQuery( this ).data( 'old', jQuery( this ).attr( 'class' ) );
					jQuery( this ).removeClass( 'button-xlarge button-large button-medium' );
					jQuery( this ).addClass( 'button-small' );
				});
			} else {
				jQuery( thisTFSlider ).find( 'a.button' ).each( function() {
					jQuery( this ).attr( 'class', jQuery( this ).data( 'old' ) );
				});
			}

			if ( 1 == jQuery( thisTFSlider ).data( 'parallax' ) ) {

				if ( Modernizr.mq( 'only screen and (min-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) && ( 0 === avadaFusionSliderVars.header_transparency || '0' === avadaFusionSliderVars.header_transparency || false === avadaFusionSliderVars.header_transparency ) && 'below' === avadaFusionSliderVars.slider_position ) {
					slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );

					jQuery( slideContent ).each( function() {
						jQuery( this ).css( 'padding-top',  headerHeight + 'px' );
					});
				}

				jQuery( window ).scroll( function() {
					if ( jQuery( window ).scrollTop() >= jQuery( thisTFSlider ).parents( '#sliders-container' ).position().top + jQuery( thisTFSlider ).parents( '#sliders-container' ).height() ) {
						jQuery( thisTFSlider ).css( 'display', 'none' );
					} else {
						jQuery( thisTFSlider ).css( 'display', 'block' );
					}
				});
			}

			resizeWidth  = jQuery( window ).width();
			resizeHeight = jQuery( window ).height();

			jQuery( window ).on( 'resize', function() { // Start_tfslider_resize

				var headerHeight,
				    wpadminbarHeight,
				    sliderHeight,
				    sliderWidth,
				    maxHeight,
				    percentageWidth,
				    aspectRatio,
				    compareWidth,
				    boxedModeWidth,
				    wrappingContainer,
				    fixedWidthCenter,
				    slideContent,
				    $navigationArrowsTranslate;

				if ( jQuery( window ).width() != resizeWidth || ( jQuery( window ).width() != resizeWidth && jQuery( window ).height() != resizeHeight ) ) {
					headerHeight     = jQuery( '.fusion-header-wrapper' ).height();
					wpadminbarHeight = 0;

					if ( 1 <= jQuery( '#wpadminbar' ).length ) {
						wpadminbarHeight = jQuery( '#wpadminbar' ).height();
					}

					if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) ) {
						sliderHeight = jQuery( window ).height();

						if (  Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) && jQuery( '#side-header' ).length ) {
							headerHeight = jQuery( '#side-header' ).outerHeight();
						}

						if ( 'above' === avadaFusionSliderVars.slider_position  ) {
							sliderHeight = sliderHeight - ( headerHeight + wpadminbarHeight );
						}

						if ( 0 === jQuery( thisTFSlider ).data( 'parallax' ) ) {
							if ( 1 == avadaFusionSliderVars.header_transparency || 'above' === avadaFusionSliderVars.slider_position ) {
								sliderHeight = jQuery( window ).height() - wpadminbarHeight;
							} else {
								sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
							}
						}

						if (  Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
							if ( 'below' === avadaFusionSliderVars.slider_position ) {
								sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
							} else {
								sliderHeight = jQuery( window ).height() - wpadminbarHeight;
							}
						}

						// Framed look, remove the offsets from height.
						if ( jQuery( '.fusion-top-frame' ).length ) {
							sliderHeight = sliderHeight - jQuery( '.fusion-top-frame' ).height() - jQuery( '.fusion-bottom-frame' ).height();
						}

						maxHeight = Math.max.apply(
							null,
							jQuery( thisTFSlider ).find( '.slide-content' ).map( function() {
								return jQuery( this ).outerHeight();
							}).get()
						);

						maxHeight = maxHeight + 40;

						if ( sliderHeight < maxHeight ) {
							sliderHeight = maxHeight;
						}

						// Timeout to prevent self hosted video position breaking on re-size with sideheader.
						setTimeout( function() {
							jQuery( thisTFSlider ).find( 'video' ).each( function() {
								var aspectRatio    = jQuery( this ).width() / jQuery( this ).height(),
								    arcSliderWidth = aspectRatio * sliderHeight,
								    arcSliderLeft  = '-' + ( ( arcSliderWidth - jQuery( thisTFSlider ).width() ) / 2 ) + 'px',
								    compareWidth   = jQuery( thisTFSlider ).parent().parent().parent().width(),
								    $position;

								if ( jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
									compareWidth = jQuery( thisTFSlider ).width();
								}

								if ( compareWidth > arcSliderWidth ) {
									arcSliderWidth = '100%';
									arcSliderLeft = 0;
									$position = 'static';
								} else {
									$position = 'absolute';
								}
								jQuery( this ).width( arcSliderWidth );
								jQuery( this ).css({
									'left': arcSliderLeft,
									'position': $position
								});
							});
						}, 100 );
					} else {
						sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );

						if ( -1 != sliderWidth.indexOf( '%' ) ) {
							sliderWidth = jQuery( thisTFSlider ).data( 'first_slide_width' );

							if ( sliderWidth < jQuery( thisTFSlider ).data( 'slider_width' ) ) {
								sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );
							}

							percentageWidth = true;
						} else {
							sliderWidth = parseInt( jQuery( thisTFSlider ).data( 'slider_width' ) );
						}

						sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
						aspectRatio  = sliderHeight / sliderWidth;

						if ( aspectRatio < 0.5 ) {
							aspectRatio = 0.5;
						}

						compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
						if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
							compareWidth = jQuery( thisTFSlider ).width();

							if ( jQuery( thisTFSlider ).parents( '.tab-content' ).length ) {
								compareWidth = jQuery( thisTFSlider ).parents( '.tab-content' ).width() - 60;
							}
						}
						sliderHeight = aspectRatio * compareWidth;

						if ( sliderHeight > parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) ) ) {
							sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
						}

						if ( sliderHeight < 200 ) {
							sliderHeight = 200;
						}

						jQuery( thisTFSlider ).find( 'video' ).each( function() {
							var aspectRatio = jQuery( this ).width() / jQuery( this ).height(),
							    arcSliderWidth = aspectRatio * sliderHeight,
							    arcSliderLeft,
							    compareWidth;

							if ( arcSliderWidth < sliderWidth && ! jQuery( thisTFSlider ).hasClass( 'full-width-slider' ) ) {
								arcSliderWidth = sliderWidth;
							}

							arcSliderLeft = '-' + ( ( arcSliderWidth - jQuery( thisTFSlider ).width() ) / 2 ) + 'px';
							compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
							if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
								compareWidth = jQuery( thisTFSlider ).width();
							}
							if ( compareWidth > arcSliderWidth && true === percentageWidth && 1 != jQuery( thisTFSlider ).data( 'full_screen' ) ) {
								arcSliderWidth = '100%';
								arcSliderLeft = 0;
							}
							jQuery( this ).width( arcSliderWidth );
							jQuery( this ).css( 'left', arcSliderLeft );
						});
					}

					if ( Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.content_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).find( '.fusion-button' ).each( function() {
							if ( 'undefined' === typeof jQuery( this ).data( 'old' ) ) {
								jQuery( this ).data( 'old', jQuery( this ).attr( 'class' ) );
							}

							jQuery( this ).removeClass( 'button-xlarge button-large button-medium' );
							jQuery( this ).addClass( 'button-small' );
						});
					} else {
						jQuery( thisTFSlider ).find( '.fusion-button' ).each( function() {
							jQuery( this ).attr( 'class', jQuery( this ).data( 'old' ) );
						});
					}

					if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) && 'fade' === jQuery( thisTFSlider ).data( 'animation' ) ) {
						jQuery( thisTFSlider ).css( 'max-width', '100%' );
						jQuery( thisTFSlider ).find( '.slides, .background' ).css( 'width', '100%' );
					}

					if ( ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) && ! jQuery( thisTFSlider ).hasClass( 'fixed-width-slider' ) && 1 == jQuery( thisTFSlider ).data( 'parallax' ) ) {
						jQuery( thisTFSlider ).css( 'max-width', jQuery( '#wrapper' ).width() );
						if ( jQuery( 'body' ).hasClass( 'side-header-left' ) ) {
							jQuery( thisTFSlider ).css( 'left', jQuery( '#side-header' ).width() );
						} else if ( jQuery( 'body' ).hasClass( 'side-header-right' ) ) {
							jQuery( thisTFSlider ).css( 'right', jQuery( '#side-header' ).width() );
						}
					}

					jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
					jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'max-height', sliderHeight );
					jQuery( thisTFSlider ).css( 'height', sliderHeight );
					jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );

					if ( 1 <= jQuery( '.layout-boxed-mode' ).length && 0 === jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
						boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width();
						jQuery( thisTFSlider ).css( 'width', boxedModeWidth );
						jQuery( thisTFSlider ).css( 'margin-left', 'auto' );
						jQuery( thisTFSlider ).css( 'margin-right', 'auto' );

						if ( 1 == jQuery( thisTFSlider ).data( 'parallax' ) && ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
							jQuery( thisTFSlider ).css( 'left', '50%' );
							if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
								boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width() - jQuery( '.layout-boxed-mode #side-header' ).width();
								if ( 'Right' === avadaFusionSliderVars.header_position ) {
									boxedModeWidth = jQuery( '.layout-boxed-mode #wrapper' ).width() + jQuery( '.layout-boxed-mode #side-header' ).width();
								}
								jQuery( thisTFSlider ).css( 'margin-left', '-' + Math.floor( boxedModeWidth / 2 ) + 'px' );
							} else {
								jQuery( thisTFSlider ).css( 'margin-left', '-' + ( boxedModeWidth / 2 ) + 'px' );
							}
						}

						if ( 'slide' !== jQuery( thisTFSlider ).data( 'animation' ) ) {
							jQuery( thisTFSlider ).find( '.slides' ).css( 'width', '100%' );
						}
						jQuery( thisTFSlider ).find( '.background' ).css( 'width', '100%' );
					}

					if ( 1 === jQuery( thisTFSlider ).data( 'parallax' ) && ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).css( 'position', 'fixed' );
						if ( 'absolute' !== jQuery( '.fusion-header-wrapper' ).css( 'position' ) ) {
							jQuery( '.fusion-header-wrapper' ).css( 'position', 'relative' );

							$navigationArrowsTranslate = 'translate(0, ' + ( headerHeight / 2 ) + 'px)';

							if ( 'below' === avadaFusionSliderVars.slider_position ) {
								jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'margin-top', '-' + headerHeight + 'px' );
							}
						} else {
							$navigationArrowsTranslate = 'translate(0, 0)';
						}
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-webkit-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-ms-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-o-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-moz-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( 'transform', $navigationArrowsTranslate );

						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'position', 'relative' );
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'z-index', '3' );
						jQuery( '.fusion-header-wrapper' ).css( 'z-index', '5' );
						jQuery( '.fusion-header-wrapper' ).css( 'height', headerHeight );

						if ( jQuery( thisTFSlider ).hasClass( 'fixed-width-slider' ) ) {
							if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
								if ( jQuery( thisTFSlider ).parents( '#sliders-container' ).length ) {
									wrappingContainer = jQuery( '#sliders-container' );
								} else {
									wrappingContainer = jQuery( '#main' );
								}

								if ( wrappingContainer.width() < parseFloat( jQuery( thisTFSlider ).parent().css( 'max-width' ) ) ) {
									jQuery( thisTFSlider ).css( 'max-width', wrappingContainer.width() );
								} else {
									jQuery( thisTFSlider ).css( 'max-width', jQuery( thisTFSlider ).parent().css( 'max-width' ) );
								}

								if ( wrappingContainer.width() < parseFloat( jQuery( thisTFSlider ).parent().css( 'max-width' ) ) ) {
									jQuery( thisTFSlider ).css( 'max-width', wrappingContainer.width() );
								} else {
									jQuery( thisTFSlider ).css( 'max-width', jQuery( thisTFSlider ).parent().css( 'max-width' ) );
								}

								if ( 'Left' === avadaFusionSliderVars.header_position ) {
									fixedWidthCenter = '-' + ( ( jQuery( thisTFSlider ).width() - jQuery( '#side-header' ).width() ) / 2 ) + 'px';
								} else {
									fixedWidthCenter = '-' + ( ( jQuery( thisTFSlider ).width() + jQuery( '#side-header' ).width() ) / 2 ) + 'px';
								}

								if ( ( -1 ) * fixedWidthCenter > jQuery( thisTFSlider ).width() ) {
									fixedWidthCenter = ( -1 ) * jQuery( thisTFSlider ).width();
								}
							} else {
								fixedWidthCenter = '-' + ( jQuery( thisTFSlider ).width() / 2 ) + 'px';
							}
							jQuery( thisTFSlider ).css( 'left', '50%' );
							jQuery( thisTFSlider ).css( 'margin-left', fixedWidthCenter );
						}

						jQuery( thisTFSlider ).find( '.flex-control-nav' ).css( 'bottom', ( headerHeight / 2 ) );

						if ( ( 0 === avadaFusionSliderVars.header_transparency || '0' === avadaFusionSliderVars.header_transparency || false === avadaFusionSliderVars.header_transparency ) && 'below' === avadaFusionSliderVars.slider_position ) {
							slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								jQuery( this ).css( 'padding-top',  headerHeight + 'px' );
							});
						}
					} else if ( 1 == jQuery( thisTFSlider ).data( 'parallax' ) && Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).css( 'position', 'relative' );
						jQuery( thisTFSlider ).css( 'left', '0' );
						jQuery( thisTFSlider ).css( 'margin-left', '0' );
						if ( 'absolute' !== jQuery( '.fusion-header-wrapper' ).css( 'position' ) ) {
							jQuery( '.fusion-header-wrapper' ).css( 'position', 'relative' );
						}
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'position', 'relative' );
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'z-index', '3' );
						jQuery( '.fusion-header-wrapper' ).css( 'z-index', '5' );
						jQuery( '.fusion-header-wrapper' ).css( 'height', 'auto' );
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'margin-top', '' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-webkit-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-ms-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-o-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-moz-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( 'transform', 'translate(0, 0)' );

						jQuery( thisTFSlider ).find( '.flex-control-nav' ).css( 'bottom', 0 );

						if ( ( 0 === avadaFusionSliderVars.header_transparency || '0' === avadaFusionSliderVars.header_transparency || false === avadaFusionSliderVars.header_transparency ) && 'below' === avadaFusionSliderVars.slider_position ) {
							slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								jQuery( this ).css( 'padding-top',  '' );
							});
						}
					}

					if ( Modernizr.mq( 'only screen and (max-width: 640px)' ) ) {
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );
					} else if ( Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );
					} else {
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).css( 'height', sliderHeight );
						jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );
					}

					slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );

					if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', 'auto' );
						jQuery( thisTFSlider ).css( 'height', 'auto' );
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'max-height', 'none' );
						jQuery( thisTFSlider ).find( '.mobile_video_image' ).each( function() {
							var imgURL = jQuery( '.mobile_video_image' ).css( 'background-image' ).replace( 'url(', '' ).replace( ')', '' ),
							    previewImage,
							    mobilePreviewHeight;

							if ( imgURL ) {
								previewImage        = new Image();
								previewImage.name   = imgURL;
								previewImage.src    = imgURL;
								previewImage.onload = function() {
									var ar           = this.height / this.width,
									    compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
									if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
										compareWidth = jQuery( thisTFSlider ).width();
									}
									mobilePreviewHeight = ar * compareWidth;
									if ( mobilePreviewHeight < sliderHeight ) {
										jQuery( thisTFSlider ).find( '.mobile_video_image' ).css( 'height', mobilePreviewHeight );
										jQuery( thisTFSlider ).css( 'height', mobilePreviewHeight );
									}
								};
							}
						});
					}

					if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
						if ( jQuery( thisTFSlider ).parents( '#sliders-container' ).length >= 1 ) {
							slideContent = jQuery( thisTFSlider ).parents( '#sliders-container' ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								if ( ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
									if ( jQuery( this ).hasClass( 'slide-content-right' ) ) {
										jQuery( this ).find( '.slide-content' ).css( 'margin-right', '100px' );
									} else if ( jQuery( this ).hasClass( 'slide-content-left' ) ) {
										jQuery( this ).find( '.slide-content' ).css( 'margin-left', '100px' );
									}
								} else {
									jQuery( this ).find( '.slide-content' ).css( 'margin-left', '' );
									jQuery( this ).find( '.slide-content' ).css( 'margin-right', '' );
								}
							});
						}
					}

					if ( Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
							jQuery( '.fusion-header-wrapper' ).css( 'height', '' );
					}

					resizeWidth = jQuery( window ).width();
					resizeHeight = jQuery( window ).height();
				}
			}); // // end_tfslider_resize

			if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
				jQuery( thisTFSlider ).css( 'max-width', '100%' );
				if ( 'slide' !== jQuery( thisTFSlider ).data( 'animation' ) ) {
					jQuery( thisTFSlider ).find( '.slides' ).css( 'max-width', '100%' );
				}
			}

			jQuery( thisTFSlider ).find( 'video' ).each( function() {
				if ( 'function' === typeof jQuery( this )[0].pause ) {
					jQuery( this )[0].pause();
				}
			});

			jQuery( thisTFSlider ).flexslider({
				animation: jQuery( thisTFSlider ).data( 'animation' ),
				slideshow: jQuery( thisTFSlider ).data( 'autoplay' ),
				slideshowSpeed: jQuery( thisTFSlider ).data( 'slideshow_speed' ),
				animationSpeed: jQuery( thisTFSlider ).data( 'animation_speed' ),
				controlNav: Boolean( Number( jQuery( thisTFSlider ).data( 'pagination_circles' ) ) ),
				directionNav: Boolean( Number( jQuery( thisTFSlider ).data( 'nav_arrows' ) ) ),
				animationLoop: Boolean( Number( jQuery( thisTFSlider ).data( 'loop' ) ) ),
				smoothHeight: true,
				pauseOnHover: false,
				useCSS: true,
				video: true,
				touch: true,
				prevText: '&#xe61e;',
				nextText: '&#xe620;',
				start: function( slider ) {

					var wpadminbarHeight = 0,
					    maxHeight,
					    sliderHeight,
					    sliderWidth,
					    percentageWidth,
					    compareWidth,
					    wrappingContainer,
					    fixedWidthCenter,
					    $navigationArrowsTranslate;

					jQuery( thisTFSlider ).parent().find( '.fusion-slider-loading' ).remove();

					if ( 1 <= jQuery( '#wpadminbar' ).length ) {
						wpadminbarHeight = jQuery( '#wpadminbar' ).height();
					}

					jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.slide-content-container' ).show();

					// jscs:disable
					/* jshint ignore:start */
					// Remove title separators and padding, when there is not enough space
					if ( 'function' === typeof fusion_responsive_title_shortcode ) {
						jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.fusion-title' ).fusion_responsive_title_shortcode();
					}
					// jscs:enable
					/* jshint ignore:end */
					maxHeight = Math.max.apply(
						null,
						jQuery( thisTFSlider ).find( '.slide-content' ).map( function() {
							return jQuery( this ).outerHeight();
						}).get()
					);

					maxHeight = maxHeight + 40;

					if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) ) {
						sliderHeight = jQuery( window ).height();

						if ( 'above' === avadaFusionSliderVars.slider_position  ) {
							sliderHeight = sliderHeight - ( headerHeight + wpadminbarHeight );
						}

						if ( 0 === jQuery( thisTFSlider ).data( 'parallax' ) ) {
							if ( 1 == avadaFusionSliderVars.header_transparency || 'above' === avadaFusionSliderVars.slider_position ) {
								sliderHeight = jQuery( window ).height() - wpadminbarHeight;
							} else {
								sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
							}
						}

						if (  Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
							if ( 'below' === avadaFusionSliderVars.slider_position ) {
								if ( jQuery( '#side-header' ).length ) {
									sliderHeight = jQuery( window ).height() - ( jQuery( '#side-header' ).outerHeight() + wpadminbarHeight );
								} else {
									sliderHeight = jQuery( window ).height() - ( headerHeight + wpadminbarHeight );
								}
							} else {
								sliderHeight = jQuery( window ).height() - wpadminbarHeight;
							}
						}

						if ( sliderHeight < maxHeight ) {
							sliderHeight = maxHeight;
						}

						// Framed look, remove the offsets from height.
						if ( jQuery( '.fusion-top-frame' ).length ) {
							sliderHeight = sliderHeight - jQuery( '.fusion-top-frame' ).height() - jQuery( '.fusion-bottom-frame' ).height();
						}
						jQuery( thisTFSlider ).find( 'video' ).each( function() {
							var aspectRatio    = jQuery( this ).width() / jQuery( this ).height(),
							    arcSliderWidth = aspectRatio * sliderHeight,
							    arcSliderLeft  = '-' + ( ( arcSliderWidth - jQuery( thisTFSlider ).width() ) / 2 ) + 'px';

							compareWidth   = jQuery( thisTFSlider ).parent().parent().parent().width();

							if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
								compareWidth = jQuery( thisTFSlider ).width();
							}
							if ( compareWidth > arcSliderWidth ) {
								arcSliderWidth = '100%';
								arcSliderLeft  = 0;
							}
							jQuery( this ).width( arcSliderWidth );
							jQuery( this ).css( 'left', arcSliderLeft );
						});
					} else {
						sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );

						if ( -1 != sliderWidth.indexOf( '%' ) ) {
							sliderWidth = jQuery( firstSlide ).find( '.background-image' ).data( 'imgwidth' );
							if ( ! sliderWidth && ! cssua.ua.mobile ) {
								sliderWidth = jQuery( firstSlide ).find( 'video' ).width();
							}

							if ( ! sliderWidth ) {
								sliderWidth = 940;
							}

							jQuery( thisTFSlider ).data( 'first_slide_width', sliderWidth );

							if ( sliderWidth < jQuery( thisTFSlider ).data( 'slider_width' ) ) {
								sliderWidth = jQuery( thisTFSlider ).data( 'slider_width' );
							}

							percentageWidth = true;
						} else {
							sliderWidth = parseInt( jQuery( thisTFSlider ).data( 'slider_width' ) );
						}

						sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
						aspectRatio = sliderHeight / sliderWidth;

						if ( aspectRatio < 0.5 ) {
							aspectRatio = 0.5;
						}

						compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
						if ( 1 <= jQuery( thisTFSlider ).parents( '.post-content' ).length ) {
							compareWidth = jQuery( thisTFSlider ).width();

							if ( jQuery( thisTFSlider ).parents( '.tab-content' ).length ) {
								compareWidth = jQuery( thisTFSlider ).parents( '.tab-content' ).width() - 60;
							}
						}
						sliderHeight = aspectRatio * compareWidth;

						if ( sliderHeight > parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) ) ) {
							sliderHeight = parseInt( jQuery( thisTFSlider ).data( 'slider_height' ) );
						}

						if ( sliderHeight < 200 ) {
							sliderHeight = 200;
						}

						if ( sliderHeight < maxHeight ) {
							sliderHeight = maxHeight;
						}

						jQuery( thisTFSlider ).find( 'video' ).each( function() {
							var aspectRatio    = jQuery( this ).width() / jQuery( this ).height(),
							    arcSliderWidth = aspectRatio * sliderHeight,
							    arcSliderLeft,
							    compareWidth;

							if ( arcSliderWidth < sliderWidth && ! jQuery( thisTFSlider ).hasClass( 'full-width-slider' ) ) {
								arcSliderWidth = sliderWidth;
							}

							arcSliderLeft = '-' + ( ( arcSliderWidth - jQuery( thisTFSlider ).width() ) / 2 ) + 'px';
							compareWidth = jQuery( thisTFSlider ).parent().parent().parent().width();
							if ( jQuery( thisTFSlider ).parents( '.post-content' ).length >= 1 ) {
								compareWidth = jQuery( thisTFSlider ).width();
							}
							if ( compareWidth > arcSliderWidth && true === percentageWidth && 1 != jQuery( thisTFSlider ).data( 'full_screen' ) ) {
								arcSliderWidth = '100%';
								arcSliderLeft = 0;
							}
							jQuery( this ).width( arcSliderWidth );
							jQuery( this ).css( 'left', arcSliderLeft );
						});
					}

					jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'max-height', sliderHeight );
					jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'height', sliderHeight );
					jQuery( thisTFSlider ).css( 'height', sliderHeight );
					jQuery( thisTFSlider ).find( '.background, .mobile_video_image' ).css( 'height', sliderHeight );

					if ( 1 === jQuery( thisTFSlider ).data( 'parallax' ) && ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).css( 'position', 'fixed' );
						if ( 'absolute' != jQuery( '.fusion-header-wrapper' ).css( 'position' ) ) {
							jQuery( '.fusion-header-wrapper' ).css( 'position', 'relative' );
							$navigationArrowsTranslate = 'translate(0, ' + ( headerHeight / 2 ) + 'px)';

							if ( 'below' === avadaFusionSliderVars.slider_position ) {
								jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'margin-top', '-' + headerHeight + 'px' );
							}
						} else {
							$navigationArrowsTranslate = 'translate(0, 0)';
						}
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-webkit-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-ms-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-o-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-moz-transform', $navigationArrowsTranslate );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( 'transform', $navigationArrowsTranslate );

						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'position', 'relative' );
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'z-index', '3' );
						jQuery( '.fusion-header-wrapper' ).css( 'z-index', '5' );
						jQuery( '.fusion-header-wrapper' ).css( 'height', headerHeight );

						if ( 1 == jQuery( thisTFSlider ).data( 'full_screen' ) ) {
							jQuery( slider ).find( '.flex-control-nav' ).css( 'bottom', ( headerHeight / 2 ) );
						} else {
							jQuery( slider ).find( '.flex-control-nav' ).css( 'bottom', 0 );
						}

						if ( jQuery( thisTFSlider ).hasClass( 'fixed-width-slider' ) ) {
							if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
								if ( jQuery( thisTFSlider ).parents( '#sliders-container' ).length ) {
									wrappingContainer = jQuery( '#sliders-container' );
								} else {
									wrappingContainer = jQuery( '#main' );
								}

								if ( wrappingContainer.width() < parseFloat( jQuery( thisTFSlider ).parent().css( 'max-width' ) ) ) {
									jQuery( thisTFSlider ).css( 'max-width', wrappingContainer.width() );
								} else {
									jQuery( thisTFSlider ).css( 'max-width', jQuery( thisTFSlider ).parent().css( 'max-width' ) );
								}

								if ( 'Left' === avadaFusionSliderVars.header_position ) {
									fixedWidthCenter = '-' + ( ( jQuery( thisTFSlider ).width() - jQuery( '#side-header' ).width() ) / 2 ) + 'px';
								} else {
									fixedWidthCenter = '-' + ( ( jQuery( thisTFSlider ).width() + jQuery( '#side-header' ).width() ) / 2 ) + 'px';
								}

								if ( ( -1 ) * fixedWidthCenter > jQuery( thisTFSlider ).width() ) {
									fixedWidthCenter = ( -1 ) * jQuery( thisTFSlider ).width();
								}
							} else {
								fixedWidthCenter = '-' + ( jQuery( thisTFSlider ).width() / 2 ) + 'px';
							}
							jQuery( thisTFSlider ).css( 'left', '50%' );
							jQuery( thisTFSlider ).css( 'margin-left', fixedWidthCenter );
						}

						if ( ( 0 === avadaFusionSliderVars.header_transparency || '0' === avadaFusionSliderVars.header_transparency || false === avadaFusionSliderVars.header_transparency ) && 'below' === avadaFusionSliderVars.slider_position ) {
							slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								jQuery( this ).css( 'padding-top',  headerHeight + 'px' );
							});
						}

					} else if ( 1 == jQuery( thisTFSlider ).data( 'parallax' ) && Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
						jQuery( thisTFSlider ).css( 'position', 'relative' );
						jQuery( thisTFSlider ).css( 'left', '0' );
						jQuery( thisTFSlider ).css( 'margin-left', '0' );
						if ( 'absolute' !== jQuery( '.fusion-header-wrapper' ).css( 'position' ) ) {
							jQuery( '.fusion-header-wrapper' ).css( 'position', 'relative' );
						}
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'position', 'relative' );
						jQuery( '#main, .fusion-footer-widget-area, .fusion-footer-copyright-area, .fusion-page-title-bar' ).css( 'z-index', '3' );
						jQuery( '.fusion-header-wrapper' ).css( 'z-index', '5' );
						jQuery( '.fusion-header-wrapper' ).css( 'height', 'auto' );
						jQuery( thisTFSlider ).parents( '.fusion-slider-container' ).css( 'margin-top', '' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-webkit-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-ms-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-o-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( '-moz-transform', 'translate(0, 0)' );
						jQuery( thisTFSlider ).find( '.flex-direction-nav li a' ).css( 'transform', 'translate(0, 0)' );

						jQuery( thisTFSlider ).find( '.flex-control-nav' ).css( 'bottom', 0 );

						if ( ( 0 === avadaFusionSliderVars.header_transparency || '0' === avadaFusionSliderVars.header_transparency || false === avadaFusionSliderVars.header_transparency ) && 'below' === avadaFusionSliderVars.slider_position ) {
							slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								jQuery( this ).css( 'padding-top',  '' );
							});
						}
					}

					slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );

					jQuery( slider.slides.eq( slider.currentSlide ) ).find( 'video' ).each( function() {
						if ( 'yes' === jQuery( this ).parents( 'li' ).attr( 'data-autoplay' ) ) {
							if ( 'function' === typeof jQuery( this )[0].play ) {
								jQuery( this )[0].play();
							}
						}
					});

					/* WIP
					jQuery( slider.slides.eq( slider.currentSlide ) ).find( 'iframe' ).each( function() {
						if ( jQuery( this ).parents( 'li' ).attr( 'data-autoplay' ) == 'yes' ) {
							jQuery( thisTFSlider ).flexslider( 'pause' );
							var video = this;
							setTimeout( function() {
								video.contentWindow.postMessage( '{"event":"command","func":"' + 'playVideo' + '","args":""}', '*' );
							}, 1000);
						}
					});
					*/

					if ( 'Left' === avadaFusionSliderVars.header_position || 'Right' === avadaFusionSliderVars.header_position ) {
						if ( jQuery( thisTFSlider ).parents( '#sliders-container' ).length >= 1 ) {
							slideContent = jQuery( thisTFSlider ).parents( '#sliders-container' ).find( '.slide-content-container' );
							jQuery( slideContent ).each( function() {
								if ( ! Modernizr.mq( 'only screen and (max-width: ' + avadaFusionSliderVars.side_header_break_point + 'px)' ) ) {
									if ( jQuery( this ).hasClass( 'slide-content-right' ) ) {
										jQuery( this ).find( '.slide-content' ).css( 'margin-right', '100px' );
									} else if ( jQuery( this ).hasClass( 'slide-content-left' ) ) {
										jQuery( this ).find( '.slide-content' ).css( 'margin-left', '100px' );
									}
								}
							});
						}
					}

					fusionReanimateSlider( slideContent );

					// Control Videos
					if ( 'undefined' !== typeof( slider.slides ) && 0 !== slider.slides.eq( slider.currentSlide ).find( 'iframe' ).length ) {

						// Vimeo
						if ( Number( avadaFusionSliderVars.status_vimeo ) ) {
							$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'pause' );

							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'autoplay' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'play' );
							}
							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'mute' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'setVolume', 0 );
							}
						}

						playVideoAndPauseOthers( slider );
					}

					jQuery( thisTFSlider ).find( '.overlay-link' ).hide();
					jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.overlay-link' ).show();

					// Resize videos
					jQuery( thisTFSlider ).find( '[data-youtube-video-id], [data-vimeo-video-id]' ).each(
						function() {
							var $this = jQuery( this );
							setTimeout(
								function() {
									resizeVideo( $this );
								}, 500
							);
						}
					);

					// Reinitialize waypoint
					jQuery.waypoints( 'viewportHeight' );
					jQuery.waypoints( 'refresh' );

				},
				before: function( slider ) {
					jQuery( thisTFSlider ).find( '.slide-content-container' ).hide();

					// Control Videos
					if ( 0 !== slider.slides.eq( slider.currentSlide ).find( 'iframe' ).length ) {

						// Vimeo
						if ( Number( avadaFusionSliderVars.status_vimeo ) ) {
							jQuery( thisTFSlider ).find( 'iframe' ).each( function() {
								$f( jQuery( this )[0] ).api( 'pause' );
							});

							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'autoplay' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'play' );
							}
							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'mute' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'setVolume', 0 );
							}
						}
					}

					playVideoAndPauseOthers( slider );
				},
				after: function( slider ) {
					jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.slide-content-container' ).show();

					// jscs:disable
					/* jshint ignore:start */
					// Remove title separators and padding, when there is not enough space
					if ( 'function' === typeof fusion_responsive_title_shortcode ) {
						jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.fusion-title' ).fusion_responsive_title_shortcode();
					}
					// jscs:enable
					/* jshint ignore:end */

					slideContent = jQuery( thisTFSlider ).find( '.slide-content-container' );

					fusionReanimateSlider( slideContent );

					// Control Videos
					if ( 0 !== slider.slides.eq( slider.currentSlide ).find( 'iframe' ).length ) {

						// Vimeo
						if ( Number( avadaFusionSliderVars.status_vimeo ) ) {
							jQuery( thisTFSlider ).find( 'iframe' ).each( function() {
								$f( jQuery( this )[0] ).api( 'pause' );
							});

							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'autoplay' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'play' );
							}
							if ( 'yes' === jQuery( slider.slides.eq( slider.currentSlide ) ).data( 'mute' ) ) {
								$f( slider.slides.eq( slider.currentSlide ).find( 'iframe' )[0] ).api( 'setVolume', 0 );
							}
						}
					}

					jQuery( thisTFSlider ).find( '.overlay-link' ).hide();
					jQuery( slider.slides.eq( slider.currentSlide ) ).find( '.overlay-link' ).show();

					jQuery( slider.slides.eq( slider.currentSlide ) ).find( '[data-youtube-video-id], [data-vimeo-video-id]' ).each( function() {
						resizeVideo( jQuery( this ) );
					});

					playVideoAndPauseOthers( slider );

					jQuery( '[data-spy="scroll"]' ).each( function() {
					  var $spy = jQuery( this ).scrollspy( 'refresh' );
					});
				}
			});
		});

	}
});
