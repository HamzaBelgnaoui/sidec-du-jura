<?php
if (!defined('ABSPATH')) exit;

// Support images + menus

add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('title-tag');

add_action('rest_api_init', function () {
    register_setting('general', 'custom_logo', [
        'show_in_rest' => true,
        'type' => 'integer',
    ]);
});