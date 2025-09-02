const canvas = document.querySelector('.canvas');
let lastToggleTime = 0;
let animationFrameId;

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

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            const sectionTitle = entry.target.querySelector('h2');
            if (sectionTitle) {
                sectionTitle.classList.remove('shimmer');
                sectionTitle.offsetHeight;
                sectionTitle.classList.add('shimmer');

                setTimeout(() => {
                    sectionTitle.classList.remove('shimmer');
                }, 1000);
            }
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 50);
            });
        } else {
            entry.target.classList.remove('animate');
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach(card => {
                card.classList.remove('animate');
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    const opacity = Math.min(scrolled / 100, 0.95);
    header.style.background = `rgba(10, 10, 20, ${0.4 + opacity * 0.3})`;
});