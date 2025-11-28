<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header class="sdj-header">

    <div class="sdj-header-container">

        <!-- LOGO -->
        <div class="sdj-logo">
            <a href="<?php echo home_url(); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/LOGO_SIDEC_.png" alt="SIDEC du Jura">
            </a>
        </div>

        <!-- MENU PRINCIPAL -->
        <nav class="sdj-main-nav">
            <?php
                wp_nav_menu([
                    'theme_location' => 'main-menu',
                    'container' => false,
                    'menu_class' => 'sdj-menu',
                ]);
            ?>
        </nav>

        <!-- ACTIONS À DROITE -->
        <div class="sdj-actions">

            <a href="#" class="sdj-espace-adherent">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/user-icon.svg" alt=""> 
                Espace adhérent
            </a>

            <button class="sdj-search-btn">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/search.svg" alt="Recherche">
            </button>

            <button class="sdj-access-btn">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/access.svg" alt="Accessibilité">
            </button>

        </div>

    </div>
</header>
