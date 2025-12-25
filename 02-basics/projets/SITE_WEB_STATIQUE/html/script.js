// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Éléments du DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const counterBtn = document.getElementById('counterBtn');
    const counter = document.getElementById('counter');
    
    // Compteur de clics
    let clickCount = 0;
    
    // Gestion du menu hamburger (mobile)
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Changer l'icône du menu
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fermer le menu mobile en cliquant sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Gestion du thème sombre/clair
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-theme');
        
        // Changer l'icône du bouton thème
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Restaurer le thème depuis le localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Gestion du compteur
    counterBtn.addEventListener('click', function() {
        clickCount++;
        counter.textContent = clickCount;
        
        // Animation du compteur
        counter.style.transform = 'scale(1.5)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
        
        // Changement de couleur aléatoire du bouton
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
        
        // Réinitialiser la couleur après 1 seconde
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 1000);
    });
    
    // Générer une couleur aléatoire
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Animation au défilement
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .docker-card, .content-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialiser les éléments pour l'animation
    const animatedElements = document.querySelectorAll('.feature-card, .docker-card, .content-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Écouter l'événement de défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Démarrer l'animation une première fois
    animateOnScroll();
    
    // Ajouter un effet de parallaxe léger
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
    
    // Message de bienvenue dans la console
    console.log('%c🚀 Site Docker chargé avec succès!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
    console.log('%c👉 Cliquez sur le bouton "Cliquez-moi" pour voir une animation!', 'color: #2196F3;');
});