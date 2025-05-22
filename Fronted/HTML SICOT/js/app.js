// Script para hacer que el menú sea responsive en móviles

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-visible');
    });
});


document.getElementById("fabButton").addEventListener("click", function () {
    document.getElementById("fabOptions").classList.toggle("show"); });

    