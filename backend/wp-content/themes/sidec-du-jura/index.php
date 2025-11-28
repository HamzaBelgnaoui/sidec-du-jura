<?php get_header(); ?>

<h1>Bienvenue dans le thème Sidec du Jura</h1>

<?php
if ( have_posts() ) :
    while ( have_posts() ) : the_post();
        the_title('<h2>', '</h2>');
        the_content();
    endwhile;
else :
    echo '<p>Aucun contenu disponible.</p>';
endif;
?>

<?php get_footer(); ?>
