jQuery( document ).ready( function( $ ) { // Start document_ready_1

	var froogaloopLoaded;

	// Enable autoplaying videos when not in a modal
	jQuery( '.fusion-video' ).each( function() {
		if ( ! jQuery( this ).parents( '.fusion-modal' ).length && 1 == jQuery( this ).data( 'autoplay' ) && jQuery( this ).is( ':visible' ) ) {
			jQuery( this ).find( 'iframe' ).each( function( i ) {
				jQuery( this ).attr( 'src', jQuery( this ).attr( 'src' ).replace( 'autoplay=0', 'autoplay=1' ) );
			});
		}
	});

	froogaloopLoaded = false;
	if ( Number( fusionVideoVars.status_vimeo ) && jQuery( '.fusion-vimeo' ).length ) {
		jQuery.getScript( 'https://secure-a.vimeocdn.com/js/froogaloop2.min.js' ).done(
			function( script, textStatus ) {
				froogaloopLoaded = true;
			}
		);
	}

	// Video resize
	jQuery( window ).on( 'resize', function() {

		var vimeoPlayers = document.querySelectorAll( 'iframe' ),
		    player,
		    i,
		    length = vimeoPlayers.length,
		    func   = 'pauseVideo';

		// Stop autoplaying youtube video when not visible on resize
		jQuery( '.fusion-youtube' ).each( function() {
			if ( ! jQuery( this ).is( ':visible' ) && ( ! jQuery( this ).parents( '.fusion-modal' ).length || jQuery( this ).parents( '.fusion-modal' ).is( ':visible' ) ) ) {
				jQuery( this ).find( 'iframe' ).each( function( i ) {
					this.contentWindow.postMessage( '{"event":"command","func":"' + func + '","args":""}', '*' );
				});
			}
		});

		// Stop autoplaying vimeo video when not visible on resize
		if ( froogaloopLoaded ) {

			for ( i = 0; i < length; i++ ) {
				if ( ! jQuery( vimeoPlayers[i] ).is( ':visible' )  && ( ! jQuery( vimeoPlayers[i] ).parents( '.fusion-modal' ).length || jQuery( vimeoPlayers[i] ).parents( '.fusion-modal' ).is( ':visible' ) ) ) {
					player = $f( vimeoPlayers[i] );
					player.api( 'pause' );
				}
			}
		}
	});
});
