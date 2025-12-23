<?php

/**
 * API REST – Réglages globaux du site (Header + Hero + Mega Menu)
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {

    register_rest_route('sidec/v1', '/site-settings', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => 'sidec_get_site_settings',
    ]);

});

/**
 * Retourne tous les réglages globaux du site
 */
function sidec_get_site_settings() {

    /**
     * Helper image ACF (options)
     */
    $get_image = function ($field) {
        $img = get_field($field, 'option');
        return is_array($img) ? $img['url'] : null;
    };

    /**
     * -------------------------
     * HEADER – Branding & icônes
     * -------------------------
     */
    $branding = [
        'logo' => $get_image('site_logo'),
        'icons' => [
            'search'   => $get_image('icon_search'),
            'user'     => $get_image('icon_user'),
            'burger'   => $get_image('icon_burger'),
            'close'    => $get_image('icon_close'),
            'eye_off'  => $get_image('icon_eye_off'),
        ],
    ];

    /**
     * -------------------------
     * HERO – Zone de recherche
     * -------------------------
     */
    $hero = [
        'image' => $get_image('hero_image'),
        'badge_text' => get_field('hero_badge_text', 'option'),
        'search' => [
            'placeholder' => get_field('hero_search_placeholder', 'option'),
            'links'       => get_field('hero_search_links', 'option') ?: [],
        ],
    ];

    /**
     * -------------------------
     * MEGA MENU – Quick links
     * -------------------------
     */
    $quick_links_raw = get_field('quick_links', 'option');
    $quick_links = [];

    if (is_array($quick_links_raw)) {
        $quick_links = array_map(function ($link) {
            return [
                'label' => $link['label'] ?? '',
                'url'   => $link['url']['url'] ?? '',
                'icon'  => $link['icon']['url'] ?? '',
            ];
        }, $quick_links_raw);
    }

    /**
     * -------------------------
     * STRUCTURE FINALE
     * -------------------------
     */
    return [
        'branding'  => $branding,
        'hero'      => $hero,
        'mega_menu' => [
            'quick_links' => $quick_links,
        ],
    ];
}
