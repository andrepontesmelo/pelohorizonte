<?php
/**
 * Upgrades Handler.
 *
 * @author     ThemeFusion
 * @copyright  (c) Copyright by ThemeFusion
 * @link       http://theme-fusion.com
 * @package    Avada
 * @subpackage Core
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Handle migrations for Avada 5.1.3.
 *
 * @since 5.1.3
 */
class Avada_Upgrade_513 extends Avada_Upgrade_Abstract {

	/**
	 * The version.
	 *
	 * @access protected
	 * @since 5.1.3
	 * @var string
	 */
	protected $version = '5.1.3';

	/**
	 * The actual migration process.
	 *
	 * @access protected
	 * @since 5.1.3
	 */
	protected function migration_process() {

		// Reset fusion-caches.
		if ( ! class_exists( 'Fusion_Cache' ) ) {
			include_once Avada::$template_dir_path . '/includes/lib/inc/class-fusion-cache.php';
		}

		$fusion_cache = new Fusion_Cache();
		$fusion_cache->reset_all_caches();
	}
}
