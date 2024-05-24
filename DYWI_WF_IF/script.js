
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu_button');
    const menuScreen = document.getElementById('menu_screen');
    const closeMenuButton = document.getElementById('close_menu');

    function toggleMenu() {
        menuScreen.classList.toggle('hidden');
    }

    menuButton.addEventListener('click', toggleMenu);
    closeMenuButton.addEventListener('click', toggleMenu);
});
