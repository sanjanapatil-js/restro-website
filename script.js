document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-nav a');
    const body = document.body;

    // --- MENU OVERLAY TOGGLE ---
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navOverlay.classList.toggle('open');
        body.classList.toggle('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // --- CLOSE MENU WHEN A LINK IS CLICKED ---
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- STICKY HEADER ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MENU FILTERING AND RENDERING ---
    const gallery = document.querySelector('.menu-gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCountEl = document.querySelector('.product-count');

    const renderMenuItems = (items) => {
        gallery.innerHTML = '';
        if (items.length === 0) {
            gallery.innerHTML = '<p>No items match this category.</p>';
        } else {
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'menu-card';
                card.innerHTML = `
                    <span class="item-number">${item.id}</span>
                    <div class="card-image ${item.imageShape === 'oval' ? 'oval-mask' : ''}">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="card-info">
                        <p class="ingredients">${item.ingredients}</p>
                        <div class="name-price">
                            <h3>${item.name}</h3>
                            <span class="price">${item.price}</span>
                        </div>
                    </div>
                `;
                gallery.appendChild(card);
            });
        }
        productCountEl.textContent = `(${items.length} Products)`;
    };

    // Check if menu elements exist before adding listeners
    if (gallery && filterBtns.length > 0 && productCountEl) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const filteredItems = filter === 'All' 
                    ? menuItems 
                    : menuItems.filter(item => item.category === filter);
                renderMenuItems(filteredItems);
            });
        });
        renderMenuItems(menuItems);
    }
    
    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- ON-SCROLL FADE-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToObserve = document.querySelectorAll('.observe-me');
    elementsToObserve.forEach(el => observer.observe(el));

});
