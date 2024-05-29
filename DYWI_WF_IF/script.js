
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

document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('fade-in');
});

document.getElementById('clickable-heading').addEventListener('click', function() {
    window.location.href = '/index.html';  // 다른 HTML 파일 경로
});

function showContact() {
    const contactInfo = "전화번호: 010-4106-9850\n이메일: Devms2048@gmail.com";
    alert(contactInfo);
}