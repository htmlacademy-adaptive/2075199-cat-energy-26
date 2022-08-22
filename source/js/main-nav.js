const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', function () {
    if (mainNav.classList.contains('main-nav--close')) {
      mainNav.classList.remove('main-nav--close');
      mainNav.classList.add('main-nav--open');
    } else {
      mainNav.classList.remove('main-nav--open');
      mainNav.classList.add('main-nav--close');
    }
  });
