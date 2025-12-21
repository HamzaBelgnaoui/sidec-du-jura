<?php
if (!defined('ABSPATH')) exit;

// Options Page
add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Réglages du site',
            'menu_title' => 'Réglages du site',
            'menu_slug'  => 'site-settings',
            'capability' => 'manage_options',
            'redirect'   => false
        ]);
    }
});
