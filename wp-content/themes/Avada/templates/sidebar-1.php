<?php
/**
 * Sidebar-1 template.
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
?>
<div id="sidebar" role="complementary" <?php Avada()->layout->add_class( 'sidebar_1_class' ); ?> <?php Avada()->layout->add_style( 'sidebar_1_style' ); ?>>
	<?php if ( ! Avada()->template->has_sidebar() || 'left' == Avada()->layout->sidebars['position'] || ( 'right' == Avada()->layout->sidebars['position'] && ! Avada()->template->double_sidebars() ) ) : ?>
		<?php echo wp_kses_post( avada_display_sidenav( Avada()->fusion_library->get_page_id() ) ); ?>
		<?php if ( class_exists( 'Tribe__Events__Main' ) && is_singular( 'tribe_events' ) ) : ?>
			<?php do_action( 'tribe_events_single_event_before_the_meta' ); ?>
			<?php tribe_get_template_part( 'modules/meta' ); ?>
		<?php endif; ?>
	<?php endif; ?>

	<?php if ( isset( Avada()->layout->sidebars['sidebar_1'] ) && Avada()->layout->sidebars['sidebar_1'] ) : ?>
		<?php generated_dynamic_sidebar( Avada()->layout->sidebars['sidebar_1'] ); ?>
	<?php endif; ?>
</div>
