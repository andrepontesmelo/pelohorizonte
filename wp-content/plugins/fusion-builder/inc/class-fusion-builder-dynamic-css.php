<?php

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Handle generating the dynamic CSS.
 *
 * @since 1.1.0
 */
class Fusion_Builder_Dynamic_CSS extends Fusion_Dynamic_CSS {

	/**
	 * Constructor.
	 *
	 * @access public
	 */
	public function __construct() {
		parent::get_instance();

		if ( ! class_exists( 'Avada' ) ) {
			add_filter( 'fusion_dynamic_css', array( $this, 'custom_css' ) );
		}

		add_action( 'fusionredux/options/fusion_options/saved', array( $this, 'reset_all_caches' ) );
	}

	/**
	 * Appends the custom-css option to the dynamic-css.
	 *
	 * @access public
	 * @since 1.1.0
	 * @param string $css The final CSS.
	 * @return string
	 */
	public function custom_css( $css ) {

		// Append the user-entered dynamic CSS.
		$option = get_option( Fusion_Settings::get_option_name(), array() );
		if ( isset( $option['custom_css'] ) && ! empty( $option['custom_css'] ) ) {
			$css .= wp_strip_all_tags( $option['custom_css'] );
		}

		return $css;

	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
