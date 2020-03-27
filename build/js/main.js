'use strict';

var subscriptionsListItems = document.querySelectorAll('.subscriptions__list-item');

if (subscriptionsListItems.length > 0) {
  for (
    var subscriptionsItemIndex = 0;
    subscriptionsItemIndex < subscriptionsListItems.length;
    subscriptionsItemIndex++
  ) {
    var currentItem = subscriptionsListItems[subscriptionsItemIndex];
    var priceBlock = currentItem.querySelector('span:last-of-type');
    var priceBlockContent = priceBlock.textContent.trim();
    var price = priceBlockContent.slice(0, priceBlockContent.length - 2);
    priceBlock.dataset.price = price;
  }
}
