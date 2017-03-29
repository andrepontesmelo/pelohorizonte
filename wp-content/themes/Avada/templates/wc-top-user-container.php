<?php
/**
 * WooCommere Top User Container.
 *
 * @author     ThemeFusion
 * @copyright  (c) Copyright by ThemeFusion
 * @link       http://theme-fusion.com
 * @package    Avada
 * @subpackage Core
 * @since      5.1
 */

global $woocommerce, $current_user;
?>
<div class="avada-myaccount-user">
	<span class="username">
		<?php if ( $current_user->display_name ) { ?>
			<span class="hello">
				<?php printf(
					esc_attr__( 'Hello %1$s (not %2$s? %3$s)', 'Avada' ),
					'<strong>' . esc_html( $current_user->display_name ) . '</strong></span><span class="not-user">',
					esc_html( $current_user->display_name ),
					'<a href="' . esc_url( wc_get_endpoint_url( 'customer-logout', '', wc_get_page_permalink( 'myaccount' ) ) ) . '">' . esc_attr__( 'Sign Out', 'Avada' ) . '</a>'
				); ?>
			</span>
		<?php } else { ?>
			<span class="hello"><?php esc_attr_e( 'Hello', 'Avada' ); ?></span>
		<?php } ?>

	</span>

	<?php if ( Avada()->settings->get( 'woo_acc_msg_1' ) ) : ?>
		<span class="msg"><?php echo wp_kses_post( Avada()->settings->get( 'woo_acc_msg_1' ) ); ?></span>
	<?php endif; ?>

	<?php if ( Avada()->settings->get( 'woo_acc_msg_2' ) ) : ?>
		<span class="msg"><?php echo wp_kses_post( Avada()->settings->get( 'woo_acc_msg_2' ) ); ?></span>
	<?php endif; ?>
	<span class="view-cart"><a href="<?php echo esc_url_raw( get_permalink( get_option( 'woocommerce_cart_page_id' ) ) ); ?>"><?php esc_attr_e( 'View Cart', 'Avada' ); ?></a></span>
</div>
