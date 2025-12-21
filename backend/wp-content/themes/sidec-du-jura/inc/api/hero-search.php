<?php
if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('sidec/v1', '/hero-search', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            return [
                'placeholder' => get_field('hero_search_placeholder', 'option'),
                'links'       => get_field('hero_search_links', 'option'),
            ];
        }
    ]);

});
