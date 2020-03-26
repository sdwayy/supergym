'use strict';

var subscriptionsListItems = document.querySelectorAll('.subscriptions__list-item');

if (subscriptionsListItems.length > 0) {
  for (
    var subscriptionsItemIndex = 0;
    subscriptionsItemIndex < subscriptionsListItems.length;
    subscriptionsItemIndex++
  ) {
    var currentItem = subscriptionsListItems[subscriptionsItemIndex];
    var price = currentItem.querySelector('span:last-of-type');
    price.dataset.price = price.textContent.trim();
  }
}
