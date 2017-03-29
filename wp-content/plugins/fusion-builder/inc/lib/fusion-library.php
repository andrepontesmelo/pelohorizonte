<?php
/**
 * Loads common Fusion libraries.
 *
 * @package Fusion-Library
 * @version 1.0.0
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

// Define the path.
// Will be used to load other files.
if ( ! defined( 'FUSION_LIBRARY_PATH' ) ) {
	$dirname = dirname( __FILE__ );
	$dirname = wp_normalize_path( $dirname );
	define( 'FUSION_LIBRARY_PATH', $dirname );
}
if ( ! defined( 'FUSION_LIBRARY_URL' ) ) {
	$dir    = dirname( __FILE__ );
	$dir    = wp_normalize_path( $dir ); // Current directory.
	$link   = str_replace( wp_normalize_path( WP_CONTENT_DIR ), WP_CONTENT_URL, $dir );
	$scheme = ( ( isset( $_SERVER['HTTPS'] ) && 'on' === $_SERVER['HTTPS'] ) || is_ssl() ) ? 'https' : 'http';
	$link   = set_url_scheme( $link, $scheme );
	define( 'FUSION_LIBRARY_URL', $link );
}

// Font Awesome path.
if ( ! defined( 'FUSION_FA_PATH' ) ) {
	define( 'FUSION_FA_PATH', FUSION_LIBRARY_PATH . '/assets/fonts/fontawesome/font-awesome.css' );
}

// Include functions.
include_once wp_normalize_path( FUSION_LIBRARY_PATH . '/inc/functions.php' );
include_once wp_normalize_path( FUSION_LIBRARY_PATH . '/inc/fusion-icon.php' );
include_once wp_normalize_path( FUSION_LIBRARY_PATH . '/inc/wc-functions.php' );

// Autoloader.
if ( ! function_exists( 'fusion_library_autoloader' ) ) {
	/**
	 * Autoloader for Fusion classes.
	 * If the file is located it is directly included.
	 *
	 * @access protected
	 * @since 1.0.0
	 * @param string $class_name The class-name we're looking for.
	 */
	function fusion_library_autoloader( $class_name ) {

		$paths = array();
		if ( 0 === stripos( $class_name, 'Fusion' ) ) {

			$filename = 'class-' . strtolower( str_replace( '_', '-', $class_name ) ) . '.php';

			$path = wp_normalize_path( FUSION_LIBRARY_PATH . '/inc/' . $filename );
			if ( file_exists( $path ) ) {
				include_once $path;
				return;
			}
		}
	}
}
spl_autoload_register( 'fusion_library_autoloader' );

// Plugins loaded if FB.
if ( ! function_exists( 'get_fusion_library' ) ) {
	/**
	 * Sets the $fusion_library global.
	 *
	 * @since 1.0.0
	 */
	function get_fusion_library() {
		global $fusion_library;
		if ( ! $fusion_library ) {
			$fusion_library = Fusion::get_instance();
		}
	}
}
add_action( 'plugins_loaded', 'get_fusion_library' );

// If hasn't been loaded already in FB, load now after theme setup.
if ( ! defined( 'FUSION_BUILDER_PLUGIN_DIR' ) || ! defined( 'FUSION_BUILDER_VERSION' ) || version_compare( FUSION_BUILDER_VERSION, '1.1', '<' ) ) {
	global $fusion_library;
	if ( ! $fusion_library ) {
		$fusion_library = Fusion::get_instance();
	}
}
