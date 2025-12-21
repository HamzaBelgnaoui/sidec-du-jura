<?php
if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('sidec/v1', '/site-settings', [
        'methods'  => 'GET',
        'callback' => function () {

            $get_image = function ($field) {
                $img = get_field($field, 'option');
                return is_array($img) ? $img['url'] : null;
            };

            return [
                'logo' => $get_image('site_logo'),

                'icons' => [
                    'search'   => $get_image('icon_search'),
                    'user'     => $get_image('icon_user'),
                    'burger'   => $get_image('icon_burger'),
                    'close'    => $get_image('icon_close'),
                    'eye_off'  => $get_image('icon_eye_off'),
                ]
            ];
        }
    ]);
});
