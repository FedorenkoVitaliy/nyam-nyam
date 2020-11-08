import {listGenerate} from "./helper";
import {createCartElement} from "./templates";

const orderList = document.querySelector('#order-list');
const drawer = document.querySelector('#drawer');
const orderConfirm = document.querySelector('#ordersConfirm');
const deliveryPriceValue = document.querySelector('.delivery-price__value');

const setShoppingCartCount = (count = 0) => document.querySelector('.icon-button__badge').innerHTML = String(count);
const getShoppingCartCount = (dishList) => dishList.reduce((acc, dish) => {
  dish.getCount() && acc++;
  return acc;
}, 0);

const drawerToggle = () => drawer.classList.toggle('visible');

const getDeliveryPrice = () => Number(document.querySelector('.featured-item.active .deliveryPrice').getAttribute("data-delivery-price"));
const setDeliveryPrice = () => deliveryPriceValue.innerHTML = `${getDeliveryPrice()} грн`;

const getShoppingPrice = (dishList) => Number(dishList.reduce((sum, dish) => {
    sum += dish.price * dish.getCount();
    return sum;
  }, 0));
const setShoppingPrice = (totalPrice) => orderConfirm.childNodes[2].data = `(${totalPrice} грн)`;

const orderListCreate = (dishList) => {
  orderList.innerHTML = null;
  const selectedOrders = dishList.filter(item => item.getCount() > 0);
  orderList.insertAdjacentHTML('beforeend', listGenerate(selectedOrders, createCartElement));
};

const orderCartInit = (dishList) => {
  orderListCreate(dishList);
  setDeliveryPrice();
  setShoppingPrice(getShoppingPrice(dishList) + getDeliveryPrice());
  drawerToggle();
};

export { drawerToggle, orderCartInit, setShoppingCartCount, getShoppingCartCount, getDeliveryPrice };
