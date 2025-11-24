// scrollFade.js

const sections = document.querySelectorAll('main > section');

const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.90;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
window.addEventListener('load', revealSection);
