import {listGenerate} from "./helper";
import {createOrderCard} from "./templates";

const orderList = document.querySelector('#order-list');
const drawer = document.querySelector('#drawer');
const orderConfirm = document.querySelector('#orderConfirm');

const setShoppingCartCount = (count = 0) => document.querySelector('.icon-button__badge').innerHTML = String(count);
const getShoppingCartCount = (dishList) => dishList.reduce((acc, dish) => {
  dish.getCount() && acc++;
  return acc;
}, 0);

const drawerToggle = () => drawer.classList.toggle('visible');

const orderListCreate = (dishList) => {
  orderList.innerHTML = null;
  const selectedOrders = dishList.filter(item => item.getCount() > 0);
  orderList.insertAdjacentHTML('beforeend', listGenerate(selectedOrders, createOrderCard));
};

const setShoppingPrice = (dishList) => {
  const totalPrice = dishList.reduce((sum, dish) => {
    sum += dish.price * dish.getCount();
    return sum;
  }, 0);
  orderConfirm.childNodes[2].data = `(${totalPrice} грн)`;
};

const orderListInit = (dishList) => {
  drawerToggle();
  orderListCreate(dishList);
  setShoppingPrice(dishList);
};

export { drawerToggle, orderListInit, setShoppingCartCount, getShoppingCartCount };
