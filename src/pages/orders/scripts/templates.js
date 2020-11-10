import { joinStringItems } from './helper';

const createActiveOrderCard = (order) => `
  <div class="coming-up__item coming-up-item">
    <div class="coming-up-item__header">
        <h4 class="h4">${order.getRestaurant()}</h4>
        <div class="badge badge--orange">Доставка</div>
    </div>

    <div class="coming-up-info">
        <img src="img/icons/clock.svg" alt="">
        <div class="coming-up-info__content">
            <div>Заказ будет доставлен через</div>
            <div class="coming-up-info__title">${order.getCheckoutTime()} мин</div>
        </div>
    </div>

    <div class="progress-bar">
        <div class="progress-bar__line" style="width: ${order.getCheckoutTimePercent()}%"></div>
        <div class="progress-bar__overlay">
            <div class="progress-bar__item progress-bar__item--first"></div>
            <div class="progress-bar__item progress-bar__item--sec"></div>
            <div class="progress-bar__item progress-bar__item--third"></div>
        </div>
    </div>
</div>
`;

const prevDishItem = (dish) => `<li class="previous-item-dishes__item">
<span class="previous-item-dishes__quantity">${dish.count}</span>
  ${dish.title}
</li>`;

const createPreviouslyOrderCard = (order) => `
  <div class="previous__item previous-item">
    <div class="previous-item__header">
        <h4 class="h4">${order.getRestaurant()}</h4>
        <div class="badge badge--green">Выполнен</div>
    </div>

    <div class="previous-item-info">
        <div class="previous-item-info__date">${order.getFormattedDate()}</div>
        <div class="previous-item-info__time">${order.getFormattedTime()}</div>
    </div>

    <ul class="previous-item-dishes">
        ${joinStringItems(order.getOrders().map(dish => prevDishItem(dish)))}
    </ul>
</div>
 `;

export { createActiveOrderCard, createPreviouslyOrderCard };
