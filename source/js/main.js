'use strict';

var Swiper = window.Swiper;
var imask = window.IMask;
var $ = window.$;

var trainersCards = document.querySelectorAll('.trainers__card');
var trainers = document.querySelector('.trainers');
var subscriptionsListItems = document.querySelectorAll('.subscriptions__list-item');
var promoBtn = document.querySelector('.promo__btn');
var reviews = document.querySelector('.reviews');
var phoneInput = document.querySelector('#user-phone');

var createMultiSlidesSwiper = function (сontainer) {
  return new Swiper(сontainer, {
    // Optional parameters
    loop: true,
    loopFillGroupWithBlank: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
};

var createMonoSlideSwiper = function (container) {
  return new Swiper(container, {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.reviews .swiper-button-next',
      prevEl: '.reviews .swiper-button-prev',
    }
  });
};

var validatePhone = function (input) {
  return imask(input, {
    mask: '+{7}(000)000-00-00'
  });
};

var onAnchorClick = function (anchor) {
  var block = $(anchor).attr('href');

  $('html, body').animate({scrollTop: $(block).offset().top + 'px'});
};

if (promoBtn) {
  var onPromoBtnClick = function () {
    onAnchorClick(promoBtn);
  };

  promoBtn.addEventListener('click', onPromoBtnClick);
}

if (subscriptionsListItems.length > 0) {
  for (
    var subscriptionsItemIndex = 0;
    subscriptionsItemIndex < subscriptionsListItems.length;
    subscriptionsItemIndex++
  ) {
    var subscriptionsItem = subscriptionsListItems[subscriptionsItemIndex];
    var priceBlock = subscriptionsItem.querySelector('span:last-of-type');
    var priceBlockContent = priceBlock.textContent.trim();
    var price = priceBlockContent.slice(0, priceBlockContent.length - 2);

    priceBlock.dataset.price = price;
  }
}

if (trainers) {
  trainers.classList.remove('trainers--no-js');
  createMultiSlidesSwiper('.trainers__list-container');
}

if (trainersCards.length > 0) {
  for (
    var trainerCardIndex = 0;
    trainerCardIndex < trainersCards.length;
    trainerCardIndex++
  ) {
    var trainerCard = trainersCards[trainerCardIndex];
    var trainerName = trainerCard.querySelector('h3');
    var trainerDescription = trainerCard.querySelector('.trainers__description');
    var trainerNameBlockCopy = trainerName.cloneNode(true);

    trainerDescription.insertBefore(trainerNameBlockCopy, trainerDescription.firstChild);
  }
}

if (reviews) {
  reviews.classList.remove('reviews--no-js');
  createMonoSlideSwiper('.reviews__container');
}

if (phoneInput) {
  validatePhone(phoneInput);
}
