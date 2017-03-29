<?php
/**
 * Widget Class.
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
 * Widget class.
 */
class Fusion_Widget_Contact_Info extends WP_Widget {

	/**
	 * Constructor.
	 *
	 * @access public
	 */
	public function __construct() {

		$widget_ops  = array( 'classname' => 'contact_info', 'description' => '' );
		$control_ops = array( 'id_base' => 'contact_info-widget' );
		parent::__construct( 'contact_info-widget', 'Avada: Contact Info', $widget_ops, $control_ops );

	}

	/**
	 * Echoes the widget content.
	 *
	 * @access public
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance The settings for the particular instance of the widget.
	 */
	public function widget( $args, $instance ) {

		extract( $args );

		$title = apply_filters( 'widget_title', isset( $instance['title'] ) ? $instance['title'] : '' );

		echo wp_kses_post( $before_widget );

		if ( $title ) {
			echo wp_kses_post( $before_title . $title . $after_title );
		}
		?>

		<div class="contact-info-container">
			<?php if ( isset( $instance['address'] ) && $instance['address'] ) : ?>
				<p class="address"><?php echo wp_kses_post( $instance['address'] ); ?></p>
			<?php endif; ?>

			<?php if ( isset( $instance['phone'] ) && $instance['phone'] ) : ?>
				<p class="phone"><?php esc_attr_e( 'Phone:', 'Avada' ); ?> <?php echo wp_kses_post( $instance['phone'] ); ?></p>
			<?php endif; ?>

			<?php if ( isset( $instance['mobile'] ) && $instance['mobile'] ) : ?>
				<p class="mobile"><?php esc_attr_e( 'Mobile:', 'Avada' ); ?> <?php echo wp_kses_post( $instance['mobile'] ); ?></p>
			<?php endif; ?>

			<?php if ( isset( $instance['fax'] ) && $instance['fax'] ) : ?>
				<p class="fax"><?php esc_attr_e( 'Fax:', 'Avada' ); ?> <?php echo wp_kses_post( $instance['fax'] ); ?></p>
			<?php endif; ?>

			<?php if ( isset( $instance['email'] ) && $instance['email'] ) : ?>
				<p class="email"><?php esc_attr_e( 'Email:', 'Avada' ); ?> <a href="mailto:<?php echo wp_kses_post( antispambot( $instance['email'] ) ); ?>"><?php echo ( wp_kses_post( $instance['emailtxt'] ) ) ? wp_kses_post( $instance['emailtxt'] ) : wp_kses_post( $instance['email'] ); ?></a></p>
			<?php endif; ?>

			<?php if ( isset( $instance['web'] ) && $instance['web'] ) : ?>
				<p class="web"><?php esc_attr_e( 'Web:', 'Avada' ); ?> <a href="<?php echo wp_kses_post( $instance['web'] ); ?>">
					<?php if ( isset( $instance['webtxt'] ) && $instance['webtxt'] ) : ?>
						<?php echo wp_kses_post( $instance['webtxt'] ); ?>
					<?php else : ?>
						<?php echo wp_kses_post( $instance['web'] ); ?>
					<?php endif; ?>
				</a></p>
			<?php endif; ?>
		</div>
		<?php

		echo wp_kses_post( $after_widget );

	}

	/**
	 * Updates a particular instance of a widget.
	 *
	 * This function should check that `$new_instance` is set correctly. The newly-calculated
	 * value of `$instance` should be returned. If false is returned, the instance won't be
	 * saved/updated.
	 *
	 * @access public
	 * @param array $new_instance New settings for this instance as input by the user via
	 *                            WP_Widget::form().
	 * @param array $old_instance Old settings for this instance.
	 * @return array Settings to save or bool false to cancel saving.
	 */
	public function update( $new_instance, $old_instance ) {

		$instance = $old_instance;

		$instance['title']    = $new_instance['title'];
		$instance['address']  = $new_instance['address'];
		$instance['phone']    = $new_instance['phone'];
		$instance['mobile']   = $new_instance['mobile'];
		$instance['fax']      = $new_instance['fax'];
		$instance['email']    = $new_instance['email'];
		$instance['emailtxt'] = $new_instance['emailtxt'];
		$instance['web']      = $new_instance['web'];
		$instance['webtxt']   = $new_instance['webtxt'];

		return $instance;

	}

	/**
	 * Outputs the settings update form.
	 *
	 * @access public
	 * @param array $instance Current settings.
	 */
	public function form( $instance ) {

		$defaults = array(
			'title'    => 'Contact Info',
			'address'  => '',
			'phone'    => '',
			'mobile'   => '',
			'fax'      => '',
			'email'    => '',
			'emailtxt' => '',
			'web'      => '',
			'webtxt'   => '',
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_attr_e( 'Title:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'address' ) ); ?>"><?php esc_attr_e( 'Address:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'address' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'address' ) ); ?>" value="<?php echo esc_attr( $instance['address'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'phone' ) ); ?>"><?php esc_attr_e( 'Phone:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'phone' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'phone' ) ); ?>" value="<?php echo esc_attr( $instance['phone'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'mobile' ) ); ?>"><?php esc_attr_e( 'Mobile:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'mobile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'mobile' ) ); ?>" value="<?php echo esc_attr( $instance['mobile'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'fax' ) ); ?>"><?php esc_attr_e( 'Fax:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'fax' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'fax' ) ); ?>" value="<?php echo esc_attr( $instance['fax'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'email' ) ); ?>"><?php esc_attr_e( 'Email:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'email' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'email' ) ); ?>" value="<?php echo esc_attr( $instance['email'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'emailtxt' ) ); ?>"><?php esc_attr_e( 'Email Link Text:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'emailtxt' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'emailtxt' ) ); ?>" value="<?php echo esc_attr( $instance['emailtxt'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'web' ) ); ?>"><?php esc_attr_e( 'Website URL (with HTTP):', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'web' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'web' ) ); ?>" value="<?php echo esc_attr( $instance['web'] ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'webtxt' ) ); ?>"><?php esc_attr_e( 'Website URL Text:', 'Avada' ); ?></label>
			<input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'webtxt' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'webtxt' ) ); ?>" value="<?php echo esc_attr( $instance['webtxt'] ); ?>" />
		</p>
		<?php

	}
}

/* Omit closing PHP tag to avoid "Headers already sent" issues. */
