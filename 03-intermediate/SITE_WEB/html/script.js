// Script principal pour le site DockerMaster

document.addEventListener('DOMContentLoaded', function() {
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            // Pour un effet plus sophistiqué sur mobile
            if (window.innerWidth <= 768) {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '20px';
                    navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    navLinks.style.gap = '15px';
                    navLinks.style.zIndex = '1000';
                }
            }
        });
    }
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Animation au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.formation-card, .feature, .floating-element');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Gestion du formulaire d'inscription
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const level = document.getElementById('level').value;
            
            // Validation simple
            if (!name || !email || !level) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulation d'envoi
            const submitBtn = inscriptionForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            submitBtn.disabled = true;
            
            // Simulation d'appel API
            setTimeout(() => {
                // Message de succès
                alert(`Merci ${name} ! Votre inscription a été prise en compte. Un email de confirmation avec vos leçons gratuites a été envoyé à ${email}.`);
                
                // Réinitialisation du formulaire
                inscriptionForm.reset();
                
                // Restauration du bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll vers le haut
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 1500);
        });
    }
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Animation des statistiques dans la hero section
    const statElements = document.querySelectorAll('.stat h3');
    
    function animateStats() {
        statElements.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '%');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '%');
                }
            }, 30);
        });
    }
    
    // Démarrer l'animation des stats quand la section hero est visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Effet de surbrillance sur les cartes de formation au survol
    const formationCards = document.querySelectorAll('.formation-card');
    
    formationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
    
    // Animation du terminal dans la carte Docker
    const terminalLines = document.querySelectorAll('.terminal-command');
    let currentLine = 0;
    
    function typeTerminalLine() {
        if (currentLine < terminalLines.length) {
            const line = terminalLines[currentLine];
            const text = line.textContent;
            line.textContent = '';
            
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    currentLine++;
                    setTimeout(typeTerminalLine, 500);
                }
            };
            
            typeChar();
        }
    }
    
    // Démarrer l'animation du terminal après un délai
    setTimeout(typeTerminalLine, 1000);
    
    // Changement dynamique de couleur de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Date dynamique dans le footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});