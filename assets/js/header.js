document.addEventListener('DOMContentLoaded', function () {
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
        mobileToggle.addEventListener('click', function (e) {
            console.log('Mobile toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', function (e) {
            console.log('Mobile close clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking overlay background
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function (e) {
            if (e.target === mobileOverlay) {
                console.log('Overlay background clicked');
                toggleMenu();
            }
        });
    }

    // Helper to toggle menu item
    function toggleMenuItem(element) {
        const parent = element.closest('.mobile-item');
        if (parent) {
            // ACCORDION LOGIC: Close all other open menus
            const allMobileItems = document.querySelectorAll('.mobile-item.has-children');
            allMobileItems.forEach(function (item) {
                if (item !== parent && item.classList.contains('open')) {
                    item.classList.remove('open');
                }
            });
            // Toggle current
            parent.classList.toggle('open');
            console.log('Submenu toggled via ' + element.tagName);
        }
    }

    // Handle submenu toggles (Arrow Buttons)
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenuItem(this);
        });
    });

    // Handle submenu toggles (Text Links)
    // Select the A tag inside the wrapper of items that have children
    const textLinks = document.querySelectorAll('.mobile-item.has-children .mobile-link-wrapper > a');
    textLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent jump/nav
            e.stopPropagation();
            toggleMenuItem(this);
        });
    });

    // Close mobile menu on resize if screen becomes large
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) {
            if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                console.log('Window resized to desktop, closing mobile menu');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});
