document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    entry.target.classList.add('slide-in-left');
                } else if (entry.target.id === 'skills') {
                    entry.target.classList.add('slide-in-right');
                } else if (entry.target.id === 'projects') {
                    entry.target.classList.add('slide-in-left');
                } else if (entry.target.id === 'contact') {
                    entry.target.classList.add('slide-in-right');
                }
                entry.target.style.visibility = 'visible';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => {
        section.style.visibility = 'hidden';
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_h59rc0j', 'template_8wwvtoz', this)
            .then(function(response) {
                alert('SUCCESS! Your message has been sent.', response.status, response.text);
                contactForm.reset();
            }, function(error) {
                alert('FAILED... Please try again.', error);
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const kuromiImage = document.getElementById('kuromi-click');
    const modal = document.getElementById('social-modal');
    const closeBtn = document.querySelector('.close-btn');

    kuromiImage.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});