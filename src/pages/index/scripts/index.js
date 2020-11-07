import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import kfcArray from './data/kfc.json';
import macArray from './data/mac.json';
import { createDishCard } from "./templates";
import { setupCounters, resetCounters } from './counters';
import { changeActive, listGenerate } from './helper';
import { drawerToggle, orderCartInit, getShoppingCartCount, setShoppingCartCount, getDeliveryPrice } from './shopingCart';

//variables
const tabsContent = document.querySelector('.tabs__content');
const restaurantButtons = document.querySelectorAll('.featured-item');
const shopCartButton = document.getElementById('shopCartButton');
const closeDrawerButton = document.getElementById('closeDrawerButton');
let currentDishList = null;

class Dish {
  #count;
  constructor({id, price, title, img, count = 0}){
    this.id = id;
    this.price = price;
    this.title = title;
    this.img = img;
    this.#count = count;
  }

  getCount = () => this.#count;
  setCount = (number) => {
    if(typeof(number) !== 'number' || number < 0){
      throw new Error('Неверное значение счётчика');
    }
    this.#count = number;
  };
}
const orders = {
  'dominos': dominosArray.map(item => new Dish(item)),
  'mac': macArray.map(item => new Dish(item)),
  'kfc': kfcArray.map(item => new Dish(item)),
};

const dishListChange = () => {
  tabsContent.innerHTML = null;
  const newDishList = resetCounters(currentDishList);
  setShoppingCartCount(getShoppingCartCount(newDishList));
  tabsContent.insertAdjacentHTML('beforeend', listGenerate(newDishList, createDishCard));
};
const selectRestaurant = (e) => {
  e.preventDefault();
  const target = e.currentTarget;
  const orderType = target.getAttribute("data-featured");

  changeActive(target, restaurantButtons);
  currentDishList = orders[orderType];
  dishListChange();
  setupCounters(currentDishList);
  getDeliveryPrice();
};

//task-4
shopCartButton.addEventListener('click', () => orderCartInit(currentDishList));
closeDrawerButton.addEventListener('click', drawerToggle);



// First Init
restaurantButtons.forEach((item) => item.addEventListener('click', selectRestaurant));
restaurantButtons[0].click();
