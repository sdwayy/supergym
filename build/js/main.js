'use strict';

var Swiper = window.Swiper;
var imask = window.IMask;

var phoneInput = document.querySelector('#user-phone');
var trainers = document.querySelector('.trainers');
var subscriptionsSection = document.querySelector('.subscriptions');
var subscriptionsListItems = subscriptionsSection.querySelectorAll('.subscriptions__list-item');
var promoBtn = document.querySelector('.promo__btn');
var reviews = document.querySelector('.reviews');
var subscriptionsDurationBlocks = subscriptionsSection.querySelectorAll('.subscriptions__duration');

var findActiveSubscriptionsRadioBtnParent = function () {
  var subscriptionsRadioBtns = subscriptionsSection.querySelectorAll('input[name="subscription-duration"]');

  for (
    var subscriptionsRadioBtnIndex = 0;
    subscriptionsRadioBtnIndex < subscriptionsRadioBtns.length;
    subscriptionsRadioBtnIndex++
  ) {
    if (subscriptionsRadioBtns[subscriptionsRadioBtnIndex].checked) {
      return subscriptionsRadioBtns[subscriptionsRadioBtnIndex].parentElement;
    }
  }

  return null;
};

var makeSubscriptionsListActive = function (list) {
  var subscriptionsLists = subscriptionsSection.querySelectorAll('.subscriptions__list');

  for (
    var subscriptionsListIndex = 0;
    subscriptionsListIndex < subscriptionsLists.length;
    subscriptionsListIndex++
  ) {
    var currentItem = subscriptionsLists[subscriptionsListIndex];

    if (currentItem.classList.contains('subscriptions__list--active')) {
      currentItem.classList.remove('subscriptions__list--active');
    }
  }

  list.classList.add('subscriptions__list--active');
};

var onSubscriptionDurationClick = function () {
  var activeLabel = findActiveSubscriptionsRadioBtnParent();
  var subscriptionsListOneMonth = subscriptionsSection.querySelector('.subscriptions__list--one-month');
  var subscriptionsListSixMonths = subscriptionsSection.querySelector('.subscriptions__list--six-months');
  var subscriptionsListYear = subscriptionsSection.querySelector('.subscriptions__list--year');

  if (activeLabel.classList.contains('subscriptions__duration--one-month')) {
    makeSubscriptionsListActive(subscriptionsListOneMonth);
    return;
  }

  if (activeLabel.classList.contains('subscriptions__duration--six-months')) {
    makeSubscriptionsListActive(subscriptionsListSixMonths);
    return;
  }

  if (activeLabel.classList.contains('subscriptions__duration--year')) {
    makeSubscriptionsListActive(subscriptionsListYear);
    return;
  }
};

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
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
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

var scrollToAnchor = function (anchor) {
  var anchorId = anchor.getAttribute('href').substr(1);

  document.getElementById(anchorId).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

if (promoBtn) {
  var onPromoBtnClick = function () {
    scrollToAnchor(promoBtn);
  };

  promoBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    onPromoBtnClick();
  });
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

if (reviews) {
  reviews.classList.remove('reviews--no-js');
  createMonoSlideSwiper('.reviews__container');
}

if (phoneInput) {
  validatePhone(phoneInput);
}

if (subscriptionsDurationBlocks) {
  for (
    var subscriptionsDurationBlockIndex = 0;
    subscriptionsDurationBlockIndex < subscriptionsDurationBlocks.length;
    subscriptionsDurationBlockIndex++
  ) {
    var currentItem = subscriptionsDurationBlocks[subscriptionsDurationBlockIndex];

    currentItem.addEventListener('click', onSubscriptionDurationClick);
  }
}

if (phoneInput) {
  var onPhoneInput = function (evt) {
    evt.preventDefault();
    var phoneInputLength = phoneInput.value.length;
    var minInputLength = 16;

    if (phoneInputLength < minInputLength) {
      phoneInput.setCustomValidity('Минимальное количество символов - 16');
    } else {
      phoneInput.setCustomValidity('');
    }
  };

  phoneInput.addEventListener('input', onPhoneInput);
}
