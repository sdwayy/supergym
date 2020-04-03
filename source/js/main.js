import $ from 'jquery';
import Swiper from 'swiper';
import IMask from 'imask';

const trainersCards = document.querySelectorAll(`.trainers__card`);
const trainers = document.querySelector(`.trainers`);
const subscriptionsListItems = document.querySelectorAll(`.subscriptions__list-item`);
const promoBtn = document.querySelector(`.promo__btn`);
const reviews = document.querySelector(`.reviews`);

const onAnchorClick = (anchor) => {
  const block = $(anchor).attr(`href`);

  $(`html, body`).animate({scrollTop: $(block).offset().top + `px`});
};

if (promoBtn) {
  const onPromoBtnClick = () => {
    onAnchorClick(promoBtn);
  };

  promoBtn.addEventListener(`click`, onPromoBtnClick);
}

if (subscriptionsListItems.length > 0) {
  for (const subscriptionsItems of subscriptionsListItems) {
    const priceBlock = subscriptionsItems.querySelector(`span:last-of-type`);
    const priceBlockContent = priceBlock.textContent.trim();
    const price = priceBlockContent.slice(0, priceBlockContent.length - 2);

    priceBlock.dataset.price = price;
  }
}

if (trainers) {
  trainers.classList.remove(`trainers--no-js`);

  const trainersSwiper = new Swiper(`.trainers__list-container`, {
    // Optional parameters
    loop: true,
    loopFillGroupWithBlank: true,

    // Navigation arrows
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30
      }
    },
  });
}

if (trainersCards.length > 0) {
  for (const trainerCard of trainersCards) {
    const trainerName = trainerCard.querySelector(`h3`);
    const trainerDescription = trainerCard.querySelector(`.trainers__description`);
    const trainerNameBlockCopy = trainerName.cloneNode(true);

    trainerDescription.prepend(trainerNameBlockCopy);
  }
}

if (reviews) {
  reviews.classList.remove(`reviews--no-js`);

  const reviewsSwiper = new Swiper(`.reviews__container`, {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: `.reviews .swiper-button-next`,
      prevEl: `.reviews .swiper-button-prev`,
    },
  });
}

const phoneInput = document.querySelector(`#user-phone`);
if (phoneInput) {
  const validatePhone = new IMask(phoneInput, {
    mask: `+{7}(000)000-00-00`
  });
}
