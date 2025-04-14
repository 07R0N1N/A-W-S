const slider = document.getElementById('slider');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const nikkahBtn = document.getElementById('nikkahBtn');
const receptionBtn = document.getElementById('receptionBtn');
let currentIndex = 1; // Landing page

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
  leftBtn.classList.toggle('hidden', currentIndex === 0);
  rightBtn.classList.toggle('hidden', currentIndex === 2);
}

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

rightBtn.addEventListener('click', () => {
  if (currentIndex < 2) {
    currentIndex++;
    updateSlider();
  }
});

// Nikkah button (left arrow)
nikkahBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Reception button (right arrow)
receptionBtn.addEventListener('click', () => {
  if (currentIndex < 2) {
    currentIndex++;
    updateSlider();
  }
});

// Swipe gesture support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const swipeThreshold = 50; // px
  if (touchEndX < touchStartX - swipeThreshold && currentIndex < 2) {
    currentIndex++;
    updateSlider();
  }
  if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

// Hide arrows initially if needed
updateSlider();
