document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');

    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', () => {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 500);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const closeButtons = document.querySelectorAll('.close');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Accordion
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherBtn.nextElementSibling.classList.remove('show');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });

            this.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('show');
            
            if (content.classList.contains('show')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            const frame = this.closest('.modal').querySelector('iframe');
            if (frame) {
                frame.src = '';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            const frame = e.target.querySelector('iframe');
            if (frame) {
                frame.src = '';
            }
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
        updateThemeIcon();
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }

    function updateThemeIcon() {
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }

    updateThemeIcon();

    // Back to Top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Fun Fact Generator
    const funFacts = [
        "El cerebro humano genera alrededor de 70,000 pensamientos al día.",
        "La creatividad aumenta un 60% cuando caminas.",
        "El 90% de las decisiones se toman de forma subconsciente.",
        "Los zurdos tienden a ser más creativos que los diestros.",
        "El color azul estimula la creatividad.",
        "La procrastinación puede aumentar la creatividad.",
        "El 98% de los niños de 3-5 años son genios creativos.",
        "La música mejora el rendimiento cognitivo.",
        "El cerebro es más activo durante el sueño que durante el día.",
        "La multitarea reduce la productividad en un 40%."
    ];

    function getRandomFunFact() {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        return funFacts[randomIndex];
    }

    const funFactElement = document.getElementById('fun-fact-text');
    funFactElement.textContent = getRandomFunFact();

    // Change fun fact every 30 seconds
    setInterval(() => {
        funFactElement.textContent = getRandomFunFact();
    }, 30000);

    // Resource viewer
    window.openResource = function(resourceUrl) {
        const resourceViewer = document.getElementById('resource-viewer');
        const resourceFrame = document.getElementById('resource-frame');
        resourceFrame.src = resourceUrl;
        resourceViewer.style.display = 'block';
    }
});

function openPdfViewer(pdfPath) {
    const viewer = document.getElementById('pdf-viewer');
    const frame = document.getElementById('pdf-frame');
    frame.src = pdfPath + '#toolbar=0&navpanes=0&scrollbar=0';
    viewer.style.display = 'block';
}

function openPowerPoint(pptPath) {
    const viewer = document.getElementById('ppt-viewer');
    const frame = document.getElementById('ppt-frame');
    frame.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(window.location.origin + pptPath);
    viewer.style.display = 'block';
}

// Cerrar modales cuando se hace clic en la X
document.querySelectorAll('.close').forEach(button => {
    button.onclick = function() {
        this.closest('.modal').style.display = 'none';
        const frame = this.closest('.modal').querySelector('iframe');
        if (frame) {
            frame.src = '';
        }
    }
});

// Cerrar modales cuando se hace clic fuera de ellos
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        const frame = event.target.querySelector('iframe');
        if (frame) {
            frame.src = '';
        }
    }
}

function openResource(url) {
    const resourceViewer = document.getElementById('resource-viewer');
    const resourceFrame = document.getElementById('resource-frame');
    resourceFrame.src = url;
    resourceViewer.style.display = 'block';
}

