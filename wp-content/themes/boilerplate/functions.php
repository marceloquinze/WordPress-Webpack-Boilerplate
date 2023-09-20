<?php

function my_theme_load_scripts() {
	wp_enqueue_style( 'main-style', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0', 'all' );
	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_theme_load_scripts' );
