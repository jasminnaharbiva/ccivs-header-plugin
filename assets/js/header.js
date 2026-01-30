document.addEventListener('DOMContentLoaded', function() {
    console.log('Header script loaded');
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    console.log('Elements found:', {
        mobileToggle: !!mobileToggle,
        mobileClose: !!mobileClose,
        mobileOverlay: !!mobileOverlay
    });

    function toggleMenu() {
        console.log('Toggle menu called');
        if (mobileOverlay) {
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            console.log('Menu toggled. Active:', mobileOverlay.classList.contains('active'));
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            console.log('Mobile toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            console.log('Mobile close clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking overlay background
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                console.log('Overlay background clicked');
                toggleMenu();
            }
        });
    }

    // Handle submenu toggles
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    console.log('Submenu toggles found:', submenuToggles.length);
    
    submenuToggles.forEach(function(toggle, index) {
        toggle.addEventListener('click', function(e) {
            console.log('Submenu toggle clicked:', index);
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-item');
            if (parent) {
                parent.classList.toggle('open');
                console.log('Submenu toggled. Open:', parent.classList.contains('open'));
            }
        });
    });
});
