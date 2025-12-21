<?php
/**
 * API REST – Quick Links (Mega Menu droite)
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enregistrement de la route REST
 */
add_action('rest_api_init', function () {

    register_rest_route('sidec/v1', '/quick-links', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'sidec_get_quick_links',
        'permission_callback' => '__return_true',
    ]);

});

/**
 * Callback – retourne les quick links
 *
 * @return array
 */
function sidec_get_quick_links() {

    // Récupération du repeater ACF depuis Options Page
    $links = get_field('quick_links', 'option');

    if (empty($links) || !is_array($links)) {
        return [];
    }

    // Normalisation des données pour React
    return array_map(function ($link) {

        return [
            'label' => $link['label'] ?? '',
            'url'   => $link['url']['url'] ?? '',
            'icon'  => $link['icon']['url'] ?? '',
        ];

    }, $links);
}
