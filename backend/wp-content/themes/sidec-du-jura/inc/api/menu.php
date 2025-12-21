<?php 
if (!defined('ABSPATH')) exit;

/**
 * Endpoint API pour exposer le menu WordPress à React
 */
add_action('rest_api_init', function () {
    register_rest_route('sidec/v1', '/menu', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => 'sidec_get_menu_items',
    ]);
});

/**
 * Retourne le menu structuré en JSON
 */
function sidec_get_menu_items() {

    $locations = get_nav_menu_locations();
    if (empty($locations['main-menu'])) {
        return [];
    }

    $menu_items = wp_get_nav_menu_items($locations['main-menu']);
    if (!$menu_items) return [];

    $items_by_id = [];

    foreach ($menu_items as $item) {

        $items_by_id[$item->ID] = [
            'id'          => $item->ID,
            'title'       => $item->title,
            'hover_title' => get_field('hover_title', $item->ID) ?: $item->title,
            'url'         => $item->url,
            'mega_menu'   => get_field('mega_menu', $item->ID),
            'mega_image'  => ($img = get_field('mega_image', $item->ID))
                                ? wp_get_attachment_url($img)
                                : null,
            'mega_links'  => [
                ['label' => get_field('link_1_label', $item->ID), 'url' => get_field('link_1_url', $item->ID)],
                ['label' => get_field('link_2_label', $item->ID), 'url' => get_field('link_2_url', $item->ID)],
                ['label' => get_field('link_3_label', $item->ID), 'url' => get_field('link_3_url', $item->ID)],
                ['label' => get_field('link_4_label', $item->ID), 'url' => get_field('link_4_url', $item->ID)],
            ],
            'parent'      => (int) $item->menu_item_parent,
            'children'    => [],
        ];
    }

    // Construction de l'arbre
    $tree = [];

    foreach ($items_by_id as $id => &$item) {
        if ($item['parent'] === 0) {
            $tree[] = &$item;
        } elseif (isset($items_by_id[$item['parent']])) {
            $items_by_id[$item['parent']]['children'][] = &$item;
        }
    }

    return $tree;
}
