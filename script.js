
const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('header nav a');


navlinks.forEach(link => {
    link.addEventListener('click', e => {

        navlinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

function onScroll() {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector('header nav a[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('active');

            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    const header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x'); // swap icon (menu -> close)
  });

  // Close menu after clicking a nav link on mobile
  navlinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
    });
  });
}