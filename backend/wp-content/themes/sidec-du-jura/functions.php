<?php

function sidecdujura_enqueue_assets() {
    // CSS principal
    // wp_enqueue_style(
    //     'sidec-style',
    //     get_stylesheet_uri(),
    //     [],
    //     filemtime(get_template_directory() . '../styles/sidec-style.css')
    // );

    // JS principal
    wp_enqueue_script(
        'sidec-main',
        get_template_directory_uri() . '/assets/js/main.js',
        ['jquery'],
        filemtime(get_template_directory() . '/assets/js/main.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'sidecdujura_enqueue_assets');

// Support images + menus
add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('title-tag');

// +++++++menu +++++++++++++++

function sidec_register_menus() {
    register_nav_menus([
        'main-menu' => __('Menu Principal', 'sidec'),
    ]);
}
add_action('init', 'sidec_register_menus');



// REST API – menu dynamique
add_action('rest_api_init', function () {
    register_rest_route('sidec/v1', '/menu', [
        'methods'  => 'GET',
        'callback' => 'sidec_get_menu_items',
    ]);
});

// function sidec_get_menu_items() {
//     // Récupère les emplacements de menus
//     $locations = get_nav_menu_locations();

//     // Vérifie que 'main-menu' existe
//     if (!isset($locations['main-menu'])) {
//         return [];
//     }

//     // Récupère l’ID du menu assigné à 'main-menu'
//     $menu_id = $locations['main-menu'];

//     // Récupère les éléments du menu
//     $menu_items = wp_get_nav_menu_items($menu_id);

//     $items = [];

//     foreach ($menu_items as $item) {
//         // Recup text survol dans menu
//         $hover = get_field('hover_title', $item);
//         $items[] = [
//             'id'    => $item->ID,
//             'title' => $item->title,
//             'hover_title' => $hover ? $hover : $item->title, // ← ICI LE TEXTE SURVOL
//             'url'   => $item->url,
            
//         ];
//     }

//     return $items;
// }

function sidec_get_menu_items() {
    // Récupère les emplacements de menus
    $locations = get_nav_menu_locations();
    // Vérifie que 'main-menu' existe
    if (!isset($locations['main-menu'])) {
        return [];
    }
    
    // Récupère l’ID du menu assigné à 'main-menu'
    $menu_id = $locations['main-menu'];
    // Récupère les éléments du menu
    $menu_items = wp_get_nav_menu_items($menu_id);

    // Tableau indexé par ID
    $items_by_id = [];
    // 
    

    // Préparer les items
    foreach ($menu_items as $item) {
        // Recup text survol dans menu
        $hover = get_field('hover_title', $item);
        // 
        $links = get_field('mega_links_group', $item->ID) ?: [];
        $items_by_id[$item->ID] = [
            'id'          => $item->ID,
            'title'       => $item->title,
            'hover_title' => $hover ?: $item->title,
            'url'         => $item->url,
            'mega_menu'   => get_field('mega_menu', $item->ID),
            'mega_image'  => wp_get_attachment_url(get_field('mega_image', $item->ID)),

            // 🔥 Construire un tableau dynamique depuis le group
            'mega_links' => [
                [
                'label' => $links['link_1_label'] ?? null,
                'url'   => $links['link_1_url'] ?? null,
                ],
                [
                'label' => $links['link_2_label'] ?? null,
                'url'   => $links['link_2_url'] ?? null,
                ],
                [
                'label' => $links['link_3_label'] ?? null,
                'url'   => $links['link_3_url'] ?? null,
                ],
                [
                'label' => $links['link_4_label'] ?? null,
                'url'   => $links['link_4_url'] ?? null,
                ],
            ],

            'parent'      => intval($item->menu_item_parent),
            'children'    => []
        ];
    }

    // Construire l’arborescence
    $tree = [];

    foreach ($items_by_id as $id => &$item) {
        if ($item['parent'] === 0) {
            // Élément principal
            $tree[] = &$item;
        } else {
            // Ajouter comme enfant du parent
            if (isset($items_by_id[$item['parent']])) {
                $items_by_id[$item['parent']]['children'][] = &$item;
            }
        }
    }
    return $tree;
}


// AJOUTE TEXT SURVOL DE MENU 
add_filter('wp_nav_menu_objects', function ($items) {
    foreach ($items as &$item) {
        $hover = get_field('hover_title', $item);
        $item->hover_title = $hover ? $hover : $item->title;
    }
    return $items;
});

// ++++++++++++ACT  +++++++++++++++
// Ajouter une page d'options ACF
// Ajouter une page d'options ACF
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

// ACTIVE LOGO 
add_action('rest_api_init', function () {
    register_setting('general', 'custom_logo', [
        'show_in_rest' => true,
        'type'         => 'integer',
    ]);
});


/* Autoriser SVG dans WordPress */
function sidec_allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'sidec_allow_svg_uploads');

/* Sécuriser les SVG */
function sidec_fix_svg_security($data, $file, $filename, $mimes, $real_mime = '') {
    if ('.svg' === strtolower(substr($filename, -4))) {
        $data['type'] = 'image/svg+xml';
        $data['ext']  = 'svg';
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'sidec_fix_svg_security', 10, 5);

// CPT
add_action('init', function () {
    register_post_type('global_settings', [
        'labels' => [
            'name' => 'Réglages du site A',
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title'],
    ]);
});



