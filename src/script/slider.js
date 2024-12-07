const sliderContainer = document.getElementById("slider-container");
const slides = document.querySelectorAll(".slider__slide");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let index = 0;
const slidesLength = slides.length;
let screenWidth = document.body.clientWidth;

sliderContainer && window.addEventListener("resize", () => {
  if (screenWidth !== document.body.clientWidth) {
    index = 0;
    sliderContainer.style.transform = `translateX(${index}%)`;
    prevBtn.classList.add("slider-btn_disable");
    nextBtn.classList.remove("slider-btn_disable");
  }
});

const changeSliderPosition = () => {
  if (index === 0) {
    prevBtn.classList.add("slider-btn_disable");
  } else {
    prevBtn.classList.remove("slider-btn_disable");
  }
  if (index === slidesLength - 1) {
    nextBtn.classList.add("slider-btn_disable");
  } else {
    nextBtn.classList.remove("slider-btn_disable");
  }

  sliderContainer.style.transform = `translateX(-${index * 30}%)`;
};

sliderContainer && nextBtn.addEventListener("click", () => {
  index++;
  changeSliderPosition();
});

sliderContainer && prevBtn.addEventListener("click", () => {
  index--;
  changeSliderPosition();
});
