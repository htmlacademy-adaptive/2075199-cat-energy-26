const slider = document.querySelector('.slider');
document.querySelector('.slider__range').addEventListener('input', (e) => {
  slider.style.setProperty('--position', `${e.target.value}%`);
})
