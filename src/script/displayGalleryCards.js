import harmonyGift from "./../images/gift-for-harmony.png";
import healthGift from "./../images/gift-for-health.png";
import workGift from "./../images/gift-for-work.png";
import snowflake from "./../images/snowflake.png";

import data from "../gifts.json";

const galleryContainer = document.getElementById("gifts-container");
const bestGiftsContainer = document.getElementById("best-gifts-container");
const categoryContainer = document.getElementById("gifts-category");

document.addEventListener("DOMContentLoaded", () => {
  const shuffleArr = shuffleArray(data);
  if (galleryContainer) {
    displayGiftsCards(shuffleArr, galleryContainer);
  }
  if (bestGiftsContainer) {
    displayGiftsCards(shuffleArr.slice(0, 4), bestGiftsContainer);
  }
});

const displayGiftsCards = (arr, target) => {
  const content = arr
    .map((card) => {
      return `<div class="gifts-card">
                    <div class="gifts-card__img">
                        <img src=${
                          card.category === "For Work"
                            ? workGift
                            : card.category === "For Health"
                            ? healthGift
                            : harmonyGift
                        } alt='${card.category}' >
                    </div>
                    <div class="gifts-card__info">
                    <span class="gifts-card__tag action-text" tag=${card.category
                      .replace(" ", "-")
                      .toLowerCase()}>${card.category}</span>
                    <h2 class="gifts-card__title title-text-h3">${
                      card.name
                    }</h2>
                    </div>
                </div>`;
    })
    .join("");
  target.innerHTML = content;
};

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const displayCategoryList = () => {
  const categories = data.reduce((values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, []);

  const categoryBtns = categories
    .map((category) => {
      return `<button class="gifts-gallery__category-btn action-text" data-id="${category}" type="button">${category}</button>`;
    })
    .join("");
  categoryContainer.innerHTML += categoryBtns;
};

const filterCardsByCategory = () => {
  const filterBtns = document.querySelectorAll(".gifts-gallery__category-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.dataset.id;
      const menuCategory = data.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayGiftsCards(data, galleryContainer);
      } else {
        displayGiftsCards(menuCategory, galleryContainer);
      }
    });
  });
};

const markActiveCategoryBtn = () => {
  categoryContainer.addEventListener("click", (e) => {
    e.preventDefault();
    let activeBtn = document.querySelector(
      ".gifts-gallery__category-btn_active"
    );
    if (activeBtn) {
      activeBtn.classList.remove("gifts-gallery__category-btn_active");
      e.target.classList.add("gifts-gallery__category-btn_active");
    }
  });
};

if (categoryContainer) {
  displayCategoryList();
  markActiveCategoryBtn();
}

filterCardsByCategory();

const displayModalWindow = (card) => {
  const modalContainer = document.getElementById("modal");
  modalContainer.classList.add("show-modal");
  const content = `
                <div class="gifts-card modal__content">
                <button class="modal__btn-close" type="button">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                    <div class="gifts-card__img modal__img">
                        <img src=${
                          card.category === "For Work"
                            ? workGift
                            : card.category === "For Health"
                            ? healthGift
                            : harmonyGift
                        } alt='${card.category}' >
                    </div>
                    <div class="gifts-card__info modal__info">
                    <span class="gifts-card__tag action-text modal__tag" tag='${card.category
                      .replace(" ", "-")
                      .toLocaleLowerCase()}'>${card.category}</span>
                    <h2 class="gifts-card__title title-text-h3 modal__title">${
                      card.name
                    }</h2>
                    <p class="modal__desc">${card.description}</p>
                    <ul class="modal__stats">
                      <h4 class="modal__stats-title action-text">Adds superpowers to:</h4>
                      <li class="modal__stats-item"><span>Live</span><span>${
                        card.superpowers.live
                      }</span></li>
                      <li class="modal__stats-item"><span>Create</span><span>${
                        card.superpowers.create
                      }</span></li>
                      <li class="modal__stats-item"><span>Love</span><span>${
                        card.superpowers.love
                      }</span></li>
                      <li class="modal__stats-item"><span>Dream</span><span>${
                        card.superpowers.dream
                      }</span></li>
                      </ul>
                    </div>
                    </div>
    `;
  modalContainer.innerHTML = content;
  const closeBtn = modalContainer.querySelector(".modal__btn-close");
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modalContainer.classList.remove("show-modal");
    modalContainer.innerHTML = '';
  });

  modalContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!e.target.closest('.modal__content')) {
      modalContainer.classList.remove("show-modal");
      modalContainer.innerHTML = '';
    }
  })
};

const giftsContainer = document.querySelector(".gifts-container");

giftsContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const targetCard = e.target.closest(".gifts-card");
  const key = targetCard
    .querySelector(".gifts-card__title")
    .innerText.toLowerCase();
  const targetCardData = data.filter(
    (item) => item.name.toLocaleLowerCase() === key
  );
  displayModalWindow(targetCardData[0]);
});
