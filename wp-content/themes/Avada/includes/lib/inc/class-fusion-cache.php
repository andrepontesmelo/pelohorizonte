<?php
/**
 * The main cache class.
 *
 * @package Fusion-Library
 * @subpackage Fusion-Cache
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * The cache handler.
 *
 * @since 1.1.2
 */
class Fusion_Cache {

	/**
	 * Resets all caches.
	 *
	 * @since 1.1.2
	 * @access public
	 */
	public function reset_all_caches() {

		// Get the upload directory for this site.
		$upload_dir = wp_upload_dir();

		if ( ! defined( 'FS_METHOD' ) ) {
			define( 'FS_METHOD', 'direct' );
		}

		// The Wordpress filesystem.
		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once wp_normalize_path( ABSPATH . '/wp-admin/includes/file.php' );
			WP_Filesystem();
		}

		// Delete file caches.
		$delete_js_files   = $wp_filesystem->delete( $upload_dir['basedir'] . '/fusion-scripts', true, 'd' );
		$delete_css_files  = $wp_filesystem->delete( $upload_dir['basedir'] . '/fusion-styles', true, 'd' );
		$delete_demo_files = $wp_filesystem->delete( $upload_dir['basedir'] . '/avada-demo-data', true, 'd' );
		$delete_fb_pages   = $wp_filesystem->delete( $upload_dir['basedir'] . '/fusion-builder-avada-pages', true, 'd' );

		// Delete cached CSS in the database.
		update_option( 'fusion_dynamic_css_posts', array() );

		// Delete transients with dynamic names.
		$dynamic_transients = array(
			'_transient_fusion_dynamic_css_%',
			'_transient_avada_remote_installer_%',
			'_transient_avada_ri_%',
			'_transient_avada_autoloader_%',
			'_transient_list_tweets_%',
		);
		global $wpdb;
		foreach ( $dynamic_transients as $transient ) {
			// @codingStandardsIgnoreLine
			$wpdb->query( $wpdb->prepare(
				"DELETE FROM $wpdb->options WHERE option_name LIKE %s",
				$transient
			) );
		}

		// Cleanup other transients.
		$transients = array(
			'avada_demos',
			'fusion_css_cache_cleanup',
			'_fusion_ajax_works',
			'fusion_builder_demos_import_skip_check',
			'fusion_patches',
			'fusion_envato_api_down',
			'fusion_dynamic_js_filenames',
			'fusion_patcher_check_num',
		);
		foreach ( $transients as $transient ) {
			delete_transient( $transient );
			delete_site_transient( $transient );
		}

	}

	/**
	 * Handles resetting caches.
	 *
	 * @access public
	 * @since 1.1.2
	 */
	public function reset_caches_handler() {

		if ( is_multisite() && is_main_site() ) {
			$sites = get_sites();
			foreach ( $sites as $site ) {
				// @codingStandardsIgnoreLine
				switch_to_blog( $site->blog_id );
				$this->reset_all_caches();
			}
			restore_current_blog();
		}
		$this->reset_all_caches();
	}
}
