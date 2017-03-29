<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpressuser');

/** MySQL database password */
define('DB_PASSWORD', 'MeuGrupo1$');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('FS_METHOD', 'direct');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '(-TGFKW=Iyk]di2E)RGz]!WJeB/LaD40oSi5`X`^sMX9!|]L0({HhP+Cv(uto7Gs');
define('SECURE_AUTH_KEY',  'WzMBex.b]`mg5PF2YgzS?b}R_hQ^_#lF+vw4|&/x-xyl73}h-Cs]%]Z9b_UC?dr(');
define('LOGGED_IN_KEY',    'jN6r9V,bPw8C9jBrFAjp0{QHn:SB<1ky >mD*T]~;IrELN&k{-!w~<]nd#U`eDlP');
define('NONCE_KEY',        'y@]~ijP-&=k4a:US<yXwg#|2j;4ZXWk&,{]DpG3Uahb^XuFRps`d#G}#Z,{6jMN,');
define('AUTH_SALT',        '-)Z$Y^yD;MJCTEMDqf-S_vB{KF|ZP +Nm&%s`_:<6H UnGW5^E7LEbzBudw`Wnsw');
define('SECURE_AUTH_SALT', '=;0cLILv2K;b<[3HR#]C-)s/wff#M/)-xq~?+(x+fy03-<NO&`^,IHwPzLDWkA v');
define('LOGGED_IN_SALT',   '$T450yM`% v+RBd*!&pnYagWEgmJ+-J_]n!3!W?jM]v C2j|a%|R!LpxVbF[Xb,O');
define('NONCE_SALT',       'Y_D;4X5vQ-0~+@@+K>>hCCBx`4fiTp2LB#FO[E[~^y8Q.)R`M=7@.HwiMVOe8E|-');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
