<?php
/**
 * Images handler.
 *
 * @package Fusion-Library
 * @since 1.0.0
 */

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

/**
 * Handle images.
 * Includes responsive-images tweaks.
 *
 * @since 1.0.0
 */
class Fusion_Images {

	/**
	 * The grid image meta.
	 *
	 * @static
	 * @access public
	 * @var array
	 */
	public static $grid_image_meta;

	/**
	 * An array of the accepted widths.
	 *
	 * @static
	 * @access public
	 * @var array
	 */
	public static $grid_accepted_widths;

	/**
	 * An array of supported layouts.
	 *
	 * @static
	 * @access public
	 * @var array
	 */
	public static $supported_grid_layouts;

	/**
	 * Constructor.
	 *
	 * @access  public
	 */
	public function __construct() {

		self::$grid_image_meta = array();
		self::$grid_accepted_widths = array( '200', '400', '600', '800', '1200' );
		self::$supported_grid_layouts = array( 'grid', 'timeline', 'large', 'portfolio_full', 'related-posts' );

		add_filter( 'max_srcset_image_width', array( $this, 'set_max_srcset_image_width' ) );
		add_filter( 'wp_calculate_image_srcset', array( $this, 'set_largest_image_size' ), '10', '5' );
		add_filter( 'wp_calculate_image_srcset', array( $this, 'edit_grid_image_srcset' ), '15', '5' );
		add_filter( 'wp_calculate_image_sizes', array( $this, 'edit_grid_image_sizes' ), '10', '5' );
		add_filter( 'post_thumbnail_html', array( $this, 'edit_grid_image_src' ), '10', '5' );
		add_action( 'delete_attachment', array( $this, 'delete_resized_images' ) );
	}

	/**
	 * Adds lightbox attributes to links.
	 *
	 * @param  string $content The content.
	 */
	public function prepare_lightbox_links( $content ) {

		preg_match_all( '/<a[^>]+href=([\'"])(.+?)\1[^>]*>/i', $content, $matches );
		$attachment_id = self::get_attachment_id_from_url( $matches[2][0] );
		$attachment_id = apply_filters( 'wpml_object_id', $attachment_id, 'attachment' );
		$title = get_post_field( 'post_title', $attachment_id );
		$caption = get_post_field( 'post_excerpt', $attachment_id );

		$content = preg_replace( '/<a/', '<a data-rel="iLightbox[postimages]" data-title="' . $title . '" data-caption="' . $caption . '"' , $content, 1 );

		return $content;
	}

	/**
	 * Modify the maximum image width to be included in srcset attribute.
	 *
	 * @since 1.0.0
	 * @param int $max_width  The maximum image width to be included in the 'srcset'. Default '1600'.
	 * @return int 	The new max width.
	 */
	public function set_max_srcset_image_width( $max_width ) {
		return 1920;
	}

	/**
	 * Add the fullsize image to the scrset attribute.
	 *
	 * @since 1.0.0
	 *
	 * @param array  $sources {
	 *     One or more arrays of source data to include in the 'srcset'.
	 *
	 *     @type array $width {
	 *         @type string $url        The URL of an image source.
	 *         @type string $descriptor The descriptor type used in the image candidate string,
	 *                                  either 'w' or 'x'.
	 *         @type int    $value      The source width if paired with a 'w' descriptor, or a
	 *                                  pixel density value if paired with an 'x' descriptor.
	 *     }
	 * }
	 * @param array  $size_array    Array of width and height values in pixels (in that order).
	 * @param string $image_src     The 'src' of the image.
	 * @param array  $image_meta    The image meta data as returned by 'wp_get_attachment_metadata()'.
	 * @param int    $attachment_id Image attachment ID or 0.
	 *
	 * @return array $sources 		One or more arrays of source data to include in the 'srcset'.
	 */
	public function set_largest_image_size( $sources, $size_array, $image_src, $image_meta, $attachment_id ) {
		$cropped_image = false;

		foreach ( $sources as $source => $details ) {
			if ( $details['url'] === $image_src ) {
				$cropped_image = true;
			}
		}

		if ( ! $cropped_image ) {
			$full_image_src = wp_get_attachment_image_src( $attachment_id, 'full' );

			$full_size = array(
				'url'        => $full_image_src[0],
				'descriptor' => 'w',
				'value'      => $image_meta['width'],
			);

			$sources[ $image_meta['width'] ] = $full_size;
		}

		return $sources;
	}

	/**
	 * Filter out all srcset attributes, that do not fit current grid layout.
	 *
	 * @since 1.0.0
	 *
	 * @param array  $sources {
	 *     One or more arrays of source data to include in the 'srcset'.
	 *
	 *     @type array $width {
	 *         @type string $url        The URL of an image source.
	 *         @type string $descriptor The descriptor type used in the image candidate string,
	 *                                  either 'w' or 'x'.
	 *         @type int    $value      The source width if paired with a 'w' descriptor, or a
	 *                                  pixel density value if paired with an 'x' descriptor.
	 *     }
	 * }
	 * @param array  $size_array    Array of width and height values in pixels (in that order).
	 * @param string $image_src     The 'src' of the image.
	 * @param array  $image_meta    The image meta data as returned by 'wp_get_attachment_metadata()'.
	 * @param int    $attachment_id Image attachment ID or 0.
	 *
	 * @return array $sources 		One or more arrays of source data to include in the 'srcset'.
	 */
	public function edit_grid_image_srcset( $sources, $size_array, $image_src, $image_meta, $attachment_id ) {
		// Only do manipulation for blog images.
		if ( ! empty( self::$grid_image_meta ) ) {
			// Only include the uncropped sizes in srcset.
			foreach ( $sources as $width => $source ) {

				// Make sure the original image isn't deleted.
				preg_match( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif|tiff|svg)$)/i', $source['url'], $matches );

				// @codingStandardsIgnoreLine
				if ( ! in_array( $width, self::$grid_accepted_widths ) && isset( $matches[0] )  ) {
					unset( $sources[ $width ] );
				}
			}
		}

		ksort( $sources );

		return $sources;
	}

	/**
	 * Edits the'sizes' attribute for grid images.
	 *
	 * @since 1.0.0
	 *
	 * @param string       $sizes         A source size value for use in a 'sizes' attribute.
	 * @param array|string $size          Image size to retrieve. Accepts any valid image size, or an array
	 *                                    of width and height values in pixels (in that order). Default 'medium'.
	 * @param string       $image_src     Optional. The URL to the image file. Default null.
	 * @param array        $image_meta    Optional. The image meta data as returned by 'wp_get_attachment_metadata()'.
	 *                                    Default null.
	 * @param int          $attachment_id Optional. Image attachment ID. Either `$image_meta` or `$attachment_id`
	 *                                    is needed when using the image size name as argument for `$size`. Default 0.
	 * @return string|bool A valid source size value for use in a 'sizes' attribute or false.
	 */
	public function edit_grid_image_sizes( $sizes, $size, $image_src, $image_meta, $attachment_id ) {
		if ( isset( self::$grid_image_meta['layout'] ) ) {
			$content_break_point = apply_filters( 'fusion_library_content_break_point', 1100 );
			$content_width       = apply_filters( 'fusion_library_content_width', 1170 );

			if ( isset( self::$grid_image_meta['gutter_width'] ) ) {
				$content_width -= self::$grid_image_meta['gutter_width'] * ( (int) self::$grid_image_meta['columns'] - 1 );
			}

			// Grid.
			if ( in_array( self::$grid_image_meta['layout'], array( 'grid', 'portfolio_full', 'related-posts' ), true ) ) {

				$main_break_point = (int) apply_filters( 'fusion_library_grid_main_break_point', 800 );
				if ( 640 < $main_break_point ) {
					$breakpoint_range = $main_break_point - 640;
				} else {
					$breakpoint_range = 360;
				}

				$breakpoint_interval = $breakpoint_range / 5;

				$main_image_break_point = apply_filters( 'fusion_library_main_image_breakpoint', $main_break_point );
				$break_points = apply_filters( 'fusion_library_image_breakpoints', array(
					6 => $main_image_break_point,
					5 => $main_image_break_point - $breakpoint_interval,
					4 => $main_image_break_point - 2 * $breakpoint_interval,
					3 => $main_image_break_point - 3 * $breakpoint_interval,
					2 => $main_image_break_point - 4 * $breakpoint_interval,
					1 => $main_image_break_point - 5 * $breakpoint_interval,
				) );

				$sizes = apply_filters( 'fusion_library_image_grid_initial_sizes', '', $main_break_point, (int) self::$grid_image_meta['columns'] );

				foreach ( $break_points as $columns => $breakpoint ) {
					if ( $columns <= (int) self::$grid_image_meta['columns'] ) {
						$width = $content_width / $columns;
						if ( $breakpoint < $width ) {
							$width = $breakpoint + $breakpoint_interval;
						}
						$sizes .= '(min-width: ' . round( $breakpoint ) . 'px) ' . round( $width ) . 'px, ';
					}
				}
				$sizes .= '100vw';

				// Timeline.
			} elseif ( 'timeline' === self::$grid_image_meta['layout'] ) {
				$width = 40;
				$sizes = '(max-width: ' . $content_break_point . 'px) 100vw, ' . $width . 'vw';

				// Large Layouts.
			} elseif ( false !== strpos( self::$grid_image_meta['layout'], 'large' ) ) {
				$sizes = '(max-width: ' . $content_break_point . 'px) 100vw, ' . $content_width . 'px';
			}
		}

		return $sizes;
	}

	/**
	 * Change the src attribute for grid images.
	 *
	 * @since 1.0.0
	 *
	 * @param string       $html              The post thumbnail HTML.
	 * @param int          $post_id           The post ID.
	 * @param string       $post_thumbnail_id The post thumbnail ID.
	 * @param string|array $size              The post thumbnail size. Image size or array of width and height
	 *                                        values (in that order). Default 'post-thumbnail'.
	 * @param string       $attr              Query string of attributes.
	 * @return string The html markup of the image.
	 */
	public function edit_grid_image_src( $html, $post_id = null, $post_thumbnail_id = null, $size = null, $attr = null ) {
		// @codingStandardsIgnoreLine
		if ( isset( self::$grid_image_meta['layout'] ) && in_array( self::$grid_image_meta['layout'], self::$supported_grid_layouts ) && 'full' === $size ) {

			$image_size = $this->get_grid_image_base_size( $post_thumbnail_id, self::$grid_image_meta['layout'], self::$grid_image_meta['columns'] );

			$full_image_src = wp_get_attachment_image_src( $post_thumbnail_id, $image_size );

			$html = preg_replace( '@src="([^"]+)"@', 'src="' . $full_image_src[0] . '"', $html );
		}

		return $html;
	}

	/**
	 * Get image size based on column size.
	 *
	 * @since 1.0.0
	 *
	 * @param null|int    $post_thumbnail_id Attachment ID.
	 * @param null|string $layout            The layout.
	 * @param null|int    $columns           Number of columns.
	 * @return string Image size name.
	 */
	public function get_grid_image_base_size( $post_thumbnail_id = null, $layout = null, $columns = null ) {
		// @codingStandardsIgnoreLine
		global $is_IE;
		$sizes = array();

		// Get image metadata.
		$image_meta = wp_get_attachment_metadata( $post_thumbnail_id );

		if ( $image_meta ) {
			$image_sizes = array();
			if ( isset( $image_meta['sizes'] ) && ! empty( $image_meta['sizes'] ) ) {
				$image_sizes = $image_meta['sizes'];
			}

			if ( $image_sizes && is_array( $image_sizes ) ) {
				foreach ( $image_sizes as $name => $image ) {
					if ( in_array( $name, self::$grid_accepted_widths, true ) ) {
						// Create accepted sizes array.
						if ( $image['width'] ) {
							$sizes[ $image['width'] ] = $name;
						}
					}
				}
			}
			$sizes[ $image_meta['width'] ] = 'full';
		}
		$gutter = isset( self::$grid_image_meta['gutter_width'] ) ? self::$grid_image_meta['gutter_width'] : '';
		$width = apply_filters( 'fusion_library_image_base_size_width', 1000, $layout, $columns, $gutter );

		ksort( $sizes );

		// Find closest size match.
		$image_size = null;
		$size_name = null;

		foreach ( $sizes as $size => $name ) {
			if ( null === $image_size || abs( $width - $image_size ) > abs( $size - $width ) ) {
				$image_size = $size;
				$size_name = $name;
			}
		}

		// Fallback to 'full' image size if no match was found or Internet Explorer is used.
		// @codingStandardsIgnoreLine
		if ( null == $size_name || '' == $size_name || $is_IE ) {
			$size_name = 'full';
		}

		return $size_name;
	}

	/**
	 * Setter function for the $grid_image_meta variable.
	 *
	 * @since 1.0.0
	 *
	 * @param array $grid_image_meta    Array containing layout and number of columns.
	 *
	 * @return void
	 */
	public function set_grid_image_meta( $grid_image_meta ) {
		self::$grid_image_meta = $grid_image_meta;
	}

	/**
	 * Gets the attachment ID from the url.
	 *
	 * @param string $attachment_url The url of the attachment.
	 * @return string The attachment ID
	 */
	public static function get_attachment_id_from_url( $attachment_url = '' ) {
		global $wpdb;
		$attachment_id = false;

		if ( '' === $attachment_url || ! is_string( $attachment_url ) ) {
			return '';
		}

		$upload_dir_paths = wp_upload_dir();
		$upload_dir_paths_baseurl = $upload_dir_paths['baseurl'];

		if ( substr( $attachment_url, 0, 2 ) === '//' ) {
			$upload_dir_paths_baseurl = Fusion_Sanitize::get_url_with_correct_scheme( $upload_dir_paths_baseurl );
		}

		// Make sure the upload path base directory exists in the attachment URL, to verify that we're working with a media library image.
		if ( false !== strpos( $attachment_url, $upload_dir_paths_baseurl ) ) {

			// If this is the URL of an auto-generated thumbnail, get the URL of the original image.
			$attachment_url = preg_replace( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif|tiff|svg)$)/i', '', $attachment_url );

			// Remove the upload path base directory from the attachment URL.
			$attachment_url = str_replace( $upload_dir_paths_baseurl . '/', '', $attachment_url );

			// Run a custom database query to get the attachment ID from the modified attachment URL. @codingStandardsIgnoreLine
			$attachment_id = $wpdb->get_var( $wpdb->prepare( "SELECT wposts.ID FROM $wpdb->posts wposts, $wpdb->postmeta wpostmeta WHERE wposts.ID = wpostmeta.post_id AND wpostmeta.meta_key = '_wp_attached_file' AND wpostmeta.meta_value = '%s' AND wposts.post_type = 'attachment'", $attachment_url ) );
			$attachment_id = apply_filters( 'wpml_object_id', $attachment_id, 'attachment' );
		}

		return $attachment_id;
	}

	/**
	 * Gets the most important attachment data from the url.
	 *
	 * @since 1.0.0
	 * @param string $attachment_url The url of the used attachment.
	 * @return array/bool The attachment data of the image, false if the url is empty or attachment not found.
	 */
	public static function get_attachment_data_from_url( $attachment_url = '' ) {

		if ( '' === $attachment_url ) {
			return false;
		}

		$attachment_data['url'] = preg_replace( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif|tiff|svg)$)/i', '', $attachment_url );
		$attachment_data['id'] = self::get_attachment_id_from_url( $attachment_data['url'] );

		if ( ! $attachment_data['id'] ) {
			return false;
		}

		preg_match( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif|tiff|svg)$)/i', $attachment_url, $matches );
		if ( count( $matches ) > 0 ) {
			$dimensions = explode( 'x', $matches[0] );
			$attachment_data['width'] = absint( $dimensions[0] );
			$attachment_data['height'] = absint( $dimensions[1] );
		} else {
			$attachment_src = wp_get_attachment_image_src( $attachment_data['id'], 'full' );
			$attachment_data['width'] = $attachment_src[1];
			$attachment_data['height'] = $attachment_src[2];
		}

		$attachment_data['alt'] = get_post_field( '_wp_attachment_image_alt', $attachment_data['id'] );
		$attachment_data['caption'] = get_post_field( 'post_excerpt', $attachment_data['id'] );
		$attachment_data['title'] = get_post_field( 'post_title', $attachment_data['id'] );

		return $attachment_data;
	}

	/**
	 * Deletes the resized images when the original image is deleted from the Wordpress Media Library.
	 * This is necessary in order to handle custom image sizes created from the Fusion_Image_Resizer class.
	 *
	 * @param  int $post_id The post ID.
	 */
	function delete_resized_images( $post_id ) {
		// Get attachment image metadata.
		$metadata = wp_get_attachment_metadata( $post_id );
		if ( ! $metadata ) {
			return;
		}
		// Do some bailing if we cannot continue.
		if ( ! isset( $metadata['file'] ) || ! isset( $metadata['image_meta']['resized_images'] ) ) {
			return;
		}
		$pathinfo = pathinfo( $metadata['file'] );
		$resized_images = $metadata['image_meta']['resized_images'];
		// Get Wordpress uploads directory (and bail if it doesn't exist).
		$wp_upload_dir = wp_upload_dir();
		$upload_dir    = $wp_upload_dir['basedir'];
		if ( ! is_dir( $upload_dir ) ) {
			return;
		}
		// Delete the resized images.
		foreach ( $resized_images as $dims ) {
			// Get the resized images filename.
			$file = $upload_dir . '/' . $pathinfo['dirname'] . '/' . $pathinfo['filename'] . '-' . $dims . '.' . $pathinfo['extension'];
			// Delete the resized image.
			// @codingStandardsIgnoreLine
			@unlink( $file );
		}
	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
