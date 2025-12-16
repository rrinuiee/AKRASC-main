// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- Close mobile menu when a link is clicked ---
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Fade-in sections on scroll ---
const sections = document.querySelectorAll('.section-fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// --- FAQ Accordion ---
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('span:last-child');

        // Close other open answers
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.nextElementSibling.style.maxHeight = null;
                otherQuestion.querySelector('span:last-child').style.transform = 'rotate(0deg)';
            }
        });

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// --- Upcoming Events Carousel Logic ---
const posters = document.querySelectorAll('.poster');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
    posters.forEach((poster, index) => {
        poster.classList.remove('center', 'left', 'right', 'hidden');

        if (index === currentIndex) {
            poster.classList.add('center');
        } else if (index === (currentIndex - 1 + posters.length) % posters.length) {
            poster.classList.add('left');
        } else if (index === (currentIndex + 1) % posters.length) {
            poster.classList.add('right');
        } else {
            poster.classList.add('hidden');
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % posters.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + posters.length) % posters.length;
    updateCarousel();
});

// Initialize carousel
updateCarousel();

// --- Wave Animation for Hero Title ---
document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('wave-title');
    if (titleElement) {
        titleElement.innerHTML = ''; // Clear any fallback text
        const line1 = titleElement.getAttribute('data-line1') || '';
        const line2 = titleElement.getAttribute('data-line2') || '';
        
        let charIndex = 0;

        const setupLine = (text) => {
            const lineContainer = document.createElement('div');
            text.split('').forEach((char) => {
                const span = document.createElement('span');
                if (char === ' ') {
                    span.textContent = '\u00A0'; // Non-breaking space
                    span.style.marginRight = '0.3em'; // Extra spacing for words
                } else {
                    span.textContent = char;
                }
                span.style.animationDelay = `${charIndex * 0.05}s`; // stagger letters
                lineContainer.appendChild(span);
                charIndex++;
            });
            titleElement.appendChild(lineContainer);
        };

        setupLine(line1);
        setupLine(line2);
    }
});

// --- Scroll-based animations ---
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section-fade-in');
    const header = document.getElementById('header');

    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
});
