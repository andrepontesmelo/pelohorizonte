<?php
/**
 * Fonts handling.
 *
 * @author     ThemeFusion
 * @copyright  (c) Copyright by ThemeFusion
 * @link       http://theme-fusion.com
 * @package    Avada
 * @subpackage Core
 * @since      3.8
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Fonts handling.
 */
class Avada_Fonts {

	/**
	 * Constructor.
	 *
	 * @access  public
	 */
	public function __construct() {
		add_filter( 'upload_mimes', array( $this, 'mime_types' ) );
	}

	/**
	 * Allow uploading font file types.
	 *
	 * @param  array $mimes The mime types allowed.
	 * @access  public
	 */
	public function mime_types( $mimes ) {

		$mimes['ttf']   = 'font/ttf';
		$mimes['woff']  = 'font/woff';
		$mimes['svg']   = 'font/svg';
		$mimes['eot']   = 'font/eot';
		$mimes['woff2'] = 'font/woff2';

		return $mimes;

	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
