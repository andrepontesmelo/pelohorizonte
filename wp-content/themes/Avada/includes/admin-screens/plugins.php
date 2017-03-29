<?php
/**
 * Plugins Admin page.
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

$plugins           = TGM_Plugin_Activation::$instance->plugins;
$installed_plugins = get_plugins();
?>
<div class="wrap about-wrap avada-wrap">
	<?php $this->get_admin_screens_header( 'plugins' ); ?>
	<?php add_thickbox(); ?>
	 <div class="avada-important-notice">
		<p class="about-description">
			<?php if ( false !== get_option( 'avada_previous_version' ) ) : ?>
				<?php echo wp_kses_post( sprintf( __( 'Fusion Core and Fusion Builder are required to use Avada. Fusion Builder can only be installed after Fusion Core is updated to version 3.0 or higher. Slider Revolution & Layer Slider are premium plugins that can be installed once your <a %1$s>product is registered</a>. The other plugins below offer design integration with Avada. You can manage the plugins from this tab. <a href="%2$s" target="_blank"> Subscribe to our newsletter</a> to be notified about new products coming in the future!', 'Avada' ), 'href="' . esc_url_raw( admin_url( 'admin.php?page=avada-registration' ) ) . '"', 'http://theme-fusion.us2.list-manage2.com/subscribe?u=4345c7e8c4f2826cc52bb84cd&id=af30829ace' ) ); ?>
			<?php else : ?>
				<?php echo wp_kses_post( sprintf( __( 'Fusion Core and Fusion Builder are required to use Avada. Slider Revolution & Layer Slider are premium plugins that can be installed once your <a %1$s>product is registered</a>. The other plugins below offer design integration with Avada. You can manage the plugins from this tab. <a href="%2$s" target="_blank">Subscribe to our newsletter</a> to be notified about new products coming in the future!', 'Avada' ), 'href="' . esc_url_raw( admin_url( 'admin.php?page=avada-registration' ) ) . '"', 'http://theme-fusion.us2.list-manage2.com/subscribe?u=4345c7e8c4f2826cc52bb84cd&id=af30829ace' ) ); ?>
			<?php endif; ?>
		</p>
	</div>
	<?php if ( ! Avada()->registration->is_registered() ) : ?>
		<div class="avada-important-notice" style="border-left: 4px solid #dc3232;">
			<h3 style="color: #dc3232; margin-top: 0;"><?php esc_attr_e( 'Premium Plugins Can Only Be Installed and Updated With A Valid Token Registration', 'Avada' ); ?></h3>
			<p><?php printf( esc_attr__( 'Please visit the %s page and enter a valid token to install or update the premium plugins; Slider Revolution and Layer Slider.', 'Avada' ), '<a href="' . esc_url_raw( admin_url( 'admin.php?page=avada-registration' ) ) . '">' . esc_attr__( 'Product Registration', 'Avada' ) . '</a>' ); ?></p>
		</div>
	<?php endif; ?>
	<div id="avada-install-plugins" class="avada-demo-themes avada-install-plugins">
		<div class="feature-section theme-browser rendered">
			<?php foreach ( $plugins as $plugin ) : ?>
				<?php
				$class = '';
				$plugin_status = '';
				$file_path = $plugin['file_path'];
				$plugin_action = $this->plugin_link( $plugin );

				// We have a repo plugin.
				if ( ! $plugin['version'] ) {
					$plugin['version'] = TGM_Plugin_Activation::$instance->does_plugin_have_update( $plugin['slug'] );
				}

				if ( is_plugin_active( $file_path ) ) {
					$plugin_status = 'active';
					$class = 'active';
				}
				?>
				<div class="theme <?php echo esc_attr( $class ); ?>">
					<div class="theme-wrapper">
						<div class="theme-screenshot">
							<img src="<?php echo esc_url_raw( $plugin['image_url'] ); ?>" alt="" />
							<div class="plugin-info">
								<?php if ( isset( $installed_plugins[ $plugin['file_path'] ] ) ) : ?>
									<?php echo wp_kses_post( sprintf( __( 'Version: %1$s | <a href="%2$s" target="_blank">%3$s</a>', 'Avada' ), esc_attr( $installed_plugins[ $plugin['file_path'] ]['Version'] ), esc_url_raw( $installed_plugins[ $plugin['file_path'] ]['AuthorURI'] ), esc_attr( $installed_plugins[ $plugin['file_path'] ]['Author'] ) ) ); ?>
								<?php elseif ( 'bundled' == $plugin['source_type'] ) : ?>
									<?php printf( esc_attr__( 'Available Version: %s', 'Avada' ), esc_attr( $plugin['version'] ) ); ?>
								<?php endif; ?>
							</div>
						</div>
						<?php if ( isset( $plugin_action['update'] ) && $plugin_action['update'] ) : ?>
							<div class="update-message notice inline notice-warning notice-alt">
								<p><?php printf( esc_attr__( 'New Version Available: %s', 'Avada' ), esc_attr( $plugin['version'] ) ); ?></p>
							</div>
						<?php endif; ?>
						<h3 class="theme-name">
							<?php if ( 'active' == $plugin_status ) : ?>
								<span><?php printf( esc_attr__( 'Active: %s', 'Avada' ), esc_attr( $plugin['name'] ) ); ?></span>
							<?php else : ?>
								<?php echo esc_attr( $plugin['name'] ); ?>
							<?php endif; ?>
						</h3>
						<div class="theme-actions">
							<?php foreach ( $plugin_action as $action ) : ?>
								<?php
								// Sanitization is already taken care of in Avada_Admin class.
								// No need to re-sanitize it...
								// @codingStandardsIgnoreLine
								echo $action;
								?>
							<?php endforeach; ?>
						</div>
						<?php if ( isset( $plugin['required'] ) && $plugin['required'] ) : ?>
							<div class="plugin-required">
								<?php esc_html_e( 'Required', 'Avada' ); ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="avada-thanks">
		<p class="description"><?php esc_html_e( 'Thank you for choosing Avada. We are honored and are fully dedicated to making your experience perfect.', 'Avada' ); ?></p>
	</div>
</div>
<div class="fusion-clearfix" style="clear: both;"></div>
<?php
