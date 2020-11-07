const createDishCard = (dish) => `
  <div id="${dish.id}" class="dish">
    <img class="dish__image" src="${dish.img}" alt="">
    <div class="dish__title">${dish.title}</div>
    <div class="dish__info">
      <div class="dish__price">${dish.price}</div>
      <div class="counter" data-id="${dish.id}">
        <button class="counter__button counter__button--decrease" style=${dish.getCount()===0?"display:none":"display:inherit"}></button>
        <span class="counter__number">${dish.getCount()}</span>
        <button class="counter__button counter__button--increase" style="display: inherit"></button>
      </div>
    </div>
  </div>
`;

const createOrderCard = (dish) => `
  <div class="order__item order-item">
    <img class="order-item__image" src="${dish.img}" alt="">
    <span class="order-item__quantity">${dish.getCount()}</span>
    <div class="order-item__info">
      <h3 class="order-item__title h3">${dish.title}</h3>
      <div class="order-item__price">${dish.price}</div>
    </div>
    <button class="icon-button icon-button--red"><img src="img/icons/delete.svg" alt=""></button>
  </div>
`;

export {createDishCard, createOrderCard};
