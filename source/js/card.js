const featurecarousel = document.querySelector('.featurecarousel');
const cards = featurecarousel.querySelectorAll('.featurecards');
let currentCardIndex = 0;
let autoSlideInterval;
let cardWidth;

// Set the width of the cards based on the viewport width
function setCardWidth() {
  if (window.innerWidth <= 760) {
    cardWidth = window.innerWidth;
    cardWidth = cardWidth + 100

  } else if (window.innerWidth <= 900) {
    
    cardWidth = window.innerWidth / 2;
    cardWidth = cardWidth + 100
  } else if (window.innerWidth <= 1024) {
    
    cardWidth = window.innerWidth / 2;
    cardWidth = cardWidth + 42
  } else if (window.innerWidth <= 1500) {
    cardWidth = window.innerWidth / 2;
    cardWidth = cardWidth - 180
  } else if (window.innerWidth <= 1779) {
    cardWidth = window.innerWidth / 2;
    cardWidth = cardWidth - 250
  }else if (window.innerWidth <= 2200) {
    cardWidth = window.innerWidth / 3;
    cardWidth = cardWidth 
  } else {
    cardWidth = window.innerWidth / 3;
    cardWidth = cardWidth - 30
  }
  cards.forEach(featurecards => {
    featurecards.style.width = `${cardWidth - 174}px`;
  });
}

// Set the active slide featureindicator
function setActiveIndicator() {
  featureindicators.forEach((featureindicator, index) => {
    if (index === currentCardIndex) {
      featureindicator.classList.add('active');
    } else {
      featureindicator.classList.remove('active');
    }
  });
}

// Slide to the next featurecards
function slideToNextCard() {
  currentCardIndex++;
  if (currentCardIndex >= cards.length) {
    currentCardIndex = 0;
  }

  featurecarousel.scrollLeft = cards[currentCardIndex].offsetLeft;
}

// Slide to the previous featurecards
function slideToPrevCard() {
  currentCardIndex--;
  if (currentCardIndex < 0) {
    currentCardIndex = cards.length - 1;
  }
  featurecarousel.scrollLeft = cards[currentCardIndex].offsetLeft;
}

// Start auto slide
function startAutoSlide() {
  //autoSlideInterval = setInterval(slideToNextCard, 3000);
}

// Stop auto slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

featurecarousel.addEventListener('mouseenter', stopAutoSlide);
featurecarousel.addEventListener('mouseleave', startAutoSlide);

const prevArrow = document.getElementById('prev');
const nextArrow = document.getElementById('next');
prevArrow.addEventListener('click', slideToPrevCard);
nextArrow.addEventListener('click', slideToNextCard);
// Initialize
setCardWidth();

startAutoSlide();