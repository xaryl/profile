document.addEventListener('DOMContentLoaded', function () {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const allNavLinks = document.querySelectorAll('.nav-links li a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (navLinks.classList.contains('active')) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });

    const canvas = document.querySelector('.canvas');
    let lastToggleTime = 0;

    function toggleLoop(timestamp) {
        if (!lastToggleTime) {
            lastToggleTime = timestamp;
        }

        const elapsed = timestamp - lastToggleTime;

        if (elapsed > 2000) {
            canvas.classList.toggle('is-fbt');

            lastToggleTime = timestamp;
        }

        animationFrameId = requestAnimationFrame(toggleLoop);
    }

    animationFrameId = requestAnimationFrame(toggleLoop);

});