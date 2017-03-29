<?php
/**
 * Dynamic-CSS handler.
 *
 * @package Fusion-Library
 * @since 1.0.0
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Handle generating the dynamic CSS.
 *
 * @since 1.0.0
 */
class Fusion_Dynamic_CSS {

	/**
	 * The one, true instance of this object.
	 *
	 * @access protected
	 * @since 1.0.0
	 * @var null|object
	 */
	protected static $instance = null;

	/**
	 * The mode we'll be using (file/inline).
	 *
	 * @access public
	 * @since 1.0.0
	 * @var string
	 */
	public $mode;

	/**
	 * An object containing helper methods.
	 *
	 * @access private
	 * @since 1.0.0
	 * @var null|object Fusion_Dynamic_CSS_Helpers
	 */
	private $helpers = null;

	/**
	 * An instance of the Fusion_Dynamic_CSS_Inline class.
	 * null if we're not using inline mode.
	 *
	 * @access public
	 * @since 1.0.0
	 * @var null|object Fusion_Dynamic_CSS_Inline
	 */
	public $inline = null;

	/**
	 * An instance of the Fusion_Dynamic_CSS_File class.
	 * null if we're not using file mode.
	 *
	 * @access protected
	 * @since 1.0.0
	 * @var null|object Fusion_Dynamic_CSS_File
	 */
	protected $file = null;

	/**
	 * Needs update?
	 *
	 * @static
	 * @access public
	 * @since 1.0.0
	 * @var bool
	 */
	public static $needs_update = false;

	/**
	 * An array of extra files that we want to add in our CSS.
	 *
	 * @static
	 * @access private
	 * @since 1.0.0
	 * @var array
	 */
	private static $extra_files = array();

	/**
	 * Constructor.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	protected function __construct() {

		if ( null === $this->helpers ) {
			$this->helpers = $this->get_helpers();
		}

		add_action( 'wp', array( $this, 'init' ), 999 );

		// When a post is saved, reset its caches to force-regenerate the CSS.
		add_action( 'save_post', array( $this, 'reset_post_transient' ) );
		add_action( 'save_post', array( $this, 'post_update_option' ) );

		add_action( 'customize_save_after', array( $this, 'reset_all_caches' ) );
		add_filter( 'fusion_dynamic_css', array( $this, 'add_extra_files' ) );
		add_filter( 'fusion_dynamic_css', array( $this, 'icomoon_css' ) );

		add_action( 'wp', array( $this, 'maintenance' ) );

	}

	/**
	 * Gets the instance of this object.
	 *
	 * @static
	 * @since 1.0.0
	 * @return object
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Add extra actions.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function init() {

		// Add options.
		$this->add_options();

		// Set the $needs_update property.
		$this->needs_update();

		// Set mode.
		$this->set_mode();

		if ( 'inline' === $this->mode ) {
			$this->inline = new Fusion_Dynamic_CSS_Inline( $this );
		} else {
			$this->file = new Fusion_Dynamic_CSS_File( $this );
		}

	}

	/**
	 * Determine if we're using file mode or inline mode.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function set_mode() {

		$this->mode = 'inline';

		// Early exit if on the customizer.
		// This will force-using inline mode.
		global $wp_customize;
		if ( $wp_customize ) {
			return;
		}

		// Check if we're using file mode or inline mode.
		// This simply checks the css_cache_method options.
		$settings = Fusion_Settings::get_instance();
		if ( 'file' === $settings->get( 'css_cache_method' ) ) {
			$this->mode = 'file';
		}

		// Additional checks for file mode.
		if ( 'file' === $this->mode && self::$needs_update ) {

			// Only allow processing 1 file every 5 seconds.
			$current_time = (int) time();
			$last_time    = (int) get_option( 'fusion_dynamic_css_time' );
			if ( 5 > ( $current_time - $last_time ) ) {
				$this->mode = 'inline';
				return;
			}
		}
	}

	/**
	 * This function takes care of creating the CSS.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return string The final CSS.
	 */
	public function make_css() {

		// Creates the content of the CSS file.
		// We're adding a warning at the top of the file to prevent users from editing it.
		// The warning is then followed by the actual CSS content.
		$content = '/********* Compiled on ' . date( DATE_ATOM ) . " - Do not edit *********/\n" . $this->helpers->dynamic_css_cached();
		$content = apply_filters( 'fusion_dynamic_css_final', $content );

		// When using domain-mapping plugins we have to make sure that any references to the original domain
		// are replaced with references to the mapped domain.
		// We're also stripping protocols from these domains so that there are no issues with SSL certificates.
		if ( defined( 'DOMAIN_MAPPING' ) && DOMAIN_MAPPING ) {

			if ( function_exists( 'domain_mapping_siteurl' ) && function_exists( 'get_original_url' ) ) {

				// The mapped domain of the site.
				$mapped_domain   = domain_mapping_siteurl( false );
				$mapped_domain   = str_replace( 'https://', '//', $mapped_domain );
				$mapped_domain   = str_replace( 'http://', '//', $mapped_domain );

				// The original domain of the site.
				$original_domain = get_original_url( 'siteurl' );
				$original_domain = str_replace( 'https://', '//', $original_domain );
				$original_domain = str_replace( 'http://', '//', $original_domain );

				// Replace original domain with mapped domain.
				$content = str_replace( $original_domain, $mapped_domain, $content );

			}
		}

		// Replace wp-content url with relative path.
		if ( 'file' === $this->mode ) {
			$upload_dir = wp_upload_dir();
			$content    = str_replace( $upload_dir['baseurl'], '..', $content );
			$content    = str_replace( content_url(), '../..', $content );
		}

		// Strip protocols. This helps avoid any issues with https sites.
		$content = str_replace( 'https://', '//', $content );
		$content = str_replace( 'http://', '//', $content );

		return $content;

	}

	/**
	 * Reset ALL CSS transient caches.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function reset_all_transients() {
		global $wpdb;
		$sql = "DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_fusion_dynamic_css_%'";
		// @codingStandardsIgnoreLine
		$wpdb->query( $sql );
	}

	/**
	 * Reset the dynamic CSS transient for a post.
	 *
	 * @access public
	 * @since 1.0.0
	 * @param int $post_id The ID of the post that's being reset.
	 */
	public function reset_post_transient( $post_id ) {
		delete_transient( 'fusion_dynamic_css_' . $post_id );
	}

	/**
	 * Create settings.
	 *
	 * @access private
	 */
	private function add_options() {
		// The 'fusion_dynamic_css_posts' option will hold an array of posts that have had their css generated.
		// We can use that to keep track of which pages need their CSS to be recreated and which don't.
		add_option( 'fusion_dynamic_css_posts', array(), '', 'yes' );
		// The 'fusion_dynamic_css_time' option holds the time the file writer was last used.
		add_option( 'fusion_dynamic_css_time', time(), '', 'yes' );
	}

	/**
	 * Update the fusion_dynamic_css_posts option when a post is saved.
	 * This adds the current post's ID in the array of IDs that the 'fusion_dynamic_css_posts' option has.
	 *
	 * @access public
	 * @since 1.0.0
	 * @param int $post_id The post ID.
	 * @return void
	 */
	public function post_update_option( $post_id ) {
		$option = get_option( 'fusion_dynamic_css_posts', array() );
		$option[ $post_id ] = false;
		update_option( 'fusion_dynamic_css_posts', $option );
	}

	/**
	 * Update the fusion_dynamic_css_posts option when the theme options are saved.
	 * This basically empties the array of page IDs from the 'fusion_dynamic_css_posts' option.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function global_reset_option() {
		update_option( 'fusion_dynamic_css_posts', array() );
	}

	/**
	 * Do we need to update the CSS file?
	 *
	 * @access public
	 * @since 1.0.0
	 * @return bool
	 */
	public function needs_update() {

		global $fusion_library;

		// If the array of active supported plugins has changed return true.
		if ( $this->supported_plugins_changed() ) {
			self::$needs_update = true;
			return true;
		}

		// Get the 'fusion_dynamic_css_posts' option from the DB.
		$option = get_option( 'fusion_dynamic_css_posts', array() );
		// Get the current page ID.
		$page_id = 'global';
		if ( $fusion_library->get_page_id() ) {
			$page_id = $fusion_library->get_page_id();
		}

		// If the current page ID exists in the array of pages defined in the 'fusion_dynamic_css_posts' option
		// then the page has already been compiled and we don't need to re-compile it.
		// If it's not in the array then it has not been compiled before so we need to update it.
		if ( ! isset( $option[ $page_id ] ) || ! $option[ $page_id ] ) {
			self::$needs_update = true;
		}

		return self::$needs_update;

	}

	/**
	 * Update the 'fusion_dynamic_css_time' option.
	 * This will save in the db the last time that the compiler has run.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function update_saved_time() {
		update_option( 'fusion_dynamic_css_time', time() );
	}

	/**
	 * Clear cache from:
	 *  - W3TC,
	 *  - WordPress Total Cache
	 *  - WPEngine
	 *  - Varnish
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function clear_cache() {

		// If W3 Total Cache is being used, clear the cache.
		if ( function_exists( 'w3tc_pgcache_flush' ) ) {
			w3tc_pgcache_flush();
		}
		// if WP Super Cache is being used, clear the cache.
		if ( function_exists( 'wp_cache_clean_cache' ) ) {
			global $file_prefix;
			wp_cache_clean_cache( $file_prefix );
		}
		// If SG CachePress is installed, rese its caches.
		if ( class_exists( 'SG_CachePress_Supercacher' ) ) {
			if ( is_callable( array( 'SG_CachePress_Supercacher', 'purge_cache' ) ) ) {
				SG_CachePress_Supercacher::purge_cache();
			}
		}
		// Clear caches on WPEngine-hosted sites.
		if ( class_exists( 'WpeCommon' ) ) {
			WpeCommon::purge_memcached();
			WpeCommon::clear_maxcdn_cache();
			WpeCommon::purge_varnish_cache();
		}

		// Clear Varnish caches.
		$settings = Fusion_Settings::get_instance();
		if ( 'file' === $settings->get( 'css_cache_method' ) && $settings->get( 'cache_server_ip' ) && is_object( $this->file ) ) {
			$this->clear_varnish_cache( $this->file->file( 'url' ) );
		}
	}

	/**
	 * Clear varnish cache for the dynamic CSS file.
	 *
	 * @access public
	 * @since 1.0.0
	 * @param string $url The URL of the file whose cache we want to reset.
	 * @return void
	 */
	public function clear_varnish_cache( $url ) {

		// Parse the URL for proxy proxies.
		$p = wp_parse_url( $url );

		$varnish_x_purgemethod = ( isset( $p['query'] ) && ( 'vhp=regex' === $p['query'] ) ) ? 'regex' : 'default';

		// Build a varniship.
		$varniship = get_option( 'vhp_varnish_ip' );
		$settings = Fusion_Settings::get_instance();
		if ( $settings->get( 'cache_server_ip' ) ) {
			$varniship = $settings->get( 'cache_server_ip' );
		} elseif ( defined( 'VHP_VARNISH_IP' ) && VHP_VARNISH_IP ) {
			$varniship = VHP_VARNISH_IP;
		}
		// If we made varniship, let it sail.
		$purgeme = ( isset( $varniship ) && null !== $varniship ) ? $varniship : $p['host'];

		wp_remote_request( 'http://' . $purgeme,
			array(
				'method'  => 'PURGE',
				'headers' => array(
					'host'           => $p['host'],
					'X-Purge-Method' => $varnish_x_purgemethod,
				),
			)
		);
	}

	/**
	 * This is just a facilitator that will allow us to reset everything.
	 * Its only job is calling the other methods from this class and reset parts of our caches.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function reset_all_caches() {
		$this->reset_all_transients();
		$this->clear_cache();
		$this->global_reset_option();
	}

	/**
	 * Get an instance of the Fusion_Dynamic_CSS_Helpers object.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return object Fusion_Dynamic_CSS_Helpers
	 */
	public function get_helpers() {
		// Instantiate the Fusion_Dynamic_CSS_Helpers object.
		if ( null === $this->helpers ) {
			$this->helpers = new Fusion_Dynamic_CSS_Helpers();
		}
		return $this->helpers;
	}

	/**
	 * Makes adding files to the compiled CSS easier.
	 *
	 * @static
	 * @access public
	 * @since 5.1.0
	 * @param string $path The file path.
	 */
	public static function enqueue_style( $path ) {

		self::$extra_files[] = $path;

	}

	/**
	 * Adds our extra files to the final CSS.
	 *
	 * @access public
	 * @since 1.0.0
	 * @param string $css The final CSS.
	 * @return string     The final CSS after our extra files have been added.
	 */
	public function add_extra_files( $css ) {
		$extra_files = array_unique( self::$extra_files );

		$wp_filesystem = Fusion_Helper::init_filesystem();
		$files_css  = '';

		foreach ( $extra_files as $path ) {
			// Get the file contents.
			$file_contents = $wp_filesystem->get_contents( $path );
			if ( $file_contents ) {
				$files_css .= $file_contents;
			}
		}
		return $files_css . $css;

	}

	/**
	 * Clean up the CSS caches once every few days.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function maintenance() {

		$days = apply_filters( 'fusion_css_compiler_reset_days', 10 );

		// If expired equals false.
		if ( false === get_transient( 'fusion_css_cache_cleanup' ) ) {
			$this->reset_all_caches();

			// Delete cached-css files.
			$upload_dir = wp_upload_dir();
			$folder_path = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'fusion-styles';
			$wp_filesystem = Fusion_Helper::init_filesystem();
			$wp_filesystem->delete( $folder_path, true, 'd' );

			// See you again in a few days!
			set_transient( 'fusion_css_cache_cleanup', true, $days * DAY_IN_SECONDS );

		}
	}

	/**
	 * Check if the supported plugins array has changed.
	 * If a supported plugin was activated or deactivated
	 * we should reset all caches.
	 *
	 * @access protected
	 * @since 1.0.0
	 * @return bool True if changed, false if unchanged.
	 */
	protected function supported_plugins_changed() {
		$classes_to_check = array(
			'WPCF7',
			'bbPress',
			'FusionBuilder',
			'FusionCore_Plugin',
			'WooCommerce',
			'Tribe__Events__Main',
		);
		$constants_to_check = array(
			'LS_PLUGIN_VERSION',
			'RS_PLUGIN_PATH',
		);

		$supported_saved    = get_site_option( 'fusion_supported_plugins_active', array() );
		$supported_detected = array();
		foreach ( $classes_to_check as $class ) {
			if ( class_exists( $class ) ) {
				$supported_detected[] = $class;
			}
		}
		foreach ( $constants_to_check as $constant ) {
			if ( defined( $constant ) ) {
				$supported_detected[] = $class;
			}
		}
		if ( $supported_detected !== $supported_saved ) {
			update_site_option( 'fusion_supported_plugins_active', $supported_detected );
			return true;
		}
		return false;
	}

	/**
	 * Adds icomoon CSS.
	 *
	 * @access public
	 * @since 1.0.2
	 * @param string $css The original CSS.
	 * @return string The original CSS with the webfont @font-face declaration appended.
	 */
	public function icomoon_css( $css ) {

		$font_url = untrailingslashit( FUSION_LIBRARY_URL ) . '/assets/fonts/icomoon';
		$font_url = str_replace( array( 'http://', 'https://' ), '//', $font_url );

		$css .= '@font-face {';
			$css .= 'font-family: "icomoon";';
			$css .= "src:url('{$font_url}/icomoon.eot');";
			$css .= "src:url('{$font_url}/icomoon.eot?#iefix') format('embedded-opentype'),";
			$css .= "url('{$font_url}/icomoon.woff') format('woff'),";
			$css .= "url('{$font_url}/icomoon.ttf') format('truetype'),";
			$css .= "url('{$font_url}/icomoon.svg#icomoon') format('svg');";
			$css .= 'font-weight: normal;';
			$css .= 'font-style: normal;';
		$css .= '}';

		return $css;

	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
