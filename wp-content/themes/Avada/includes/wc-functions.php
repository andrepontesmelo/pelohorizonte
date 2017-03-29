<?php
/**
 * Override core-WooCommerce functions.
 *
 * @author     ThemeFusion
 * @link       http://theme-fusion.com
 * @package    Avada
 * @subpackage Core
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Display cross-sell template.
 *
 * @param int    $posts_per_page Number of posts in the query.
 * @param int    $columns        Number of culumns.
 * @param string $orderby        Determines how the query will order the posts.
 */
function woocommerce_cross_sell_display( $posts_per_page = 3, $columns = 3, $orderby = 'rand' ) {
	wc_get_template( 'cart/cross-sells.php', array(
		'posts_per_page' => $posts_per_page,
		'orderby'        => $orderby,
		'columns'        => $columns,
	) );
}

/**
 * Gets the shipping calculator template.
 */
function woocommerce_shipping_calculator() {
	if ( ! is_cart() ) {
		wc_get_template( 'cart/shipping-calculator.php' );
	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
