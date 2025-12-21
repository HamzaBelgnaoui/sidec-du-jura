<?php
if (!defined('ABSPATH')) exit;

/**
 * Enregistrement des emplacements de menus WordPress
 * (utilisé uniquement par l'admin WP)
 */
function sidec_register_menus() {
    register_nav_menus([
        'main-menu' => __('Menu Principal', 'sidec'),
    ]);
}
add_action('init', 'sidec_register_menus');

/**
 * Ajout du texte de survol (hover_title) aux objets menu WP
 * Utile pour l'admin + fallback
 */
add_filter('wp_nav_menu_objects', function ($items) {
    foreach ($items as &$item) {
        $hover = get_field('hover_title', $item);
        $item->hover_title = $hover ?: $item->title;
    }
    return $items;
});
