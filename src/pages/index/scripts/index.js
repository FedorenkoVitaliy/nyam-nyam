import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import kfcArray from './data/kfc.json';
import macArray from './data/mac.json';
//import { createDishCard } from './createDishElement';

const tabsContent = document.querySelectorAll('.tabs__content')[0];
const featuredControls = document.querySelectorAll('.featured-item');
const shopCounter = document.querySelector('.icon-button__badge');
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
const allDish = Object.values(orders).reduce((acc, restaurant) => {
  acc = [
    ...acc,
    ...restaurant
  ];
  return acc;
},[]);

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

const listGenerate = (arr) => {
  currentDishList = arr;
  arr.forEach((dish) => tabsContent.insertAdjacentHTML('beforeend',  createDishCard(dish)));
};

const changeActive = (current, all) => {
  all.forEach(element => element.classList.remove('active'));
  current.classList.add('active');
};

const selectFeatures = (e) => {
  e.preventDefault();
  const target = e.currentTarget;
  const orderType = target.getAttribute("data-featured");
  changeActive(target, featuredControls);
  tabsContent.innerHTML = null;
  listGenerate(orders[orderType]);
  setupCounters();
};

changeActive(featuredControls[0], featuredControls);

listGenerate(orders['dominos']);

featuredControls.forEach((item) => item.addEventListener('click', selectFeatures));

const getCounterElements = (counter) => ({
  decrease: counter.querySelector('.counter__button--decrease'),
  number: counter.querySelector('.counter__number'),
  increase: counter.querySelector('.counter__button--increase')
});

const shopCountHandler = () => {
  shopCounter.innerHTML = allDish.reduce((acc, dish) => {
    dish.getCount() && acc++;
    return acc;
  }, 0);
};

const handleCounter = (counter, counterElements, operation) => {
  const id = Number(counter.getAttribute("data-id"));
  const currentDish = currentDishList.find(dish => dish.id === id);
  const { decrease, number } = counterElements;

  currentDish.setCount(currentDish.getCount() + operation);
  number.innerHTML = currentDish.getCount();
  shopCountHandler();
  decrease.style.display = `${currentDish.getCount() === 0 ? 'none' : 'inherit'}`;
};

const setupCounters = () => {
  const dishCounter = document.querySelectorAll('.counter');
  dishCounter.forEach((counter) => {
    const counterElements = getCounterElements(counter);
    const { decrease, increase } = counterElements;
    decrease.addEventListener('click', () => handleCounter(counter, counterElements, -1));
    increase.addEventListener('click', () => handleCounter(counter, counterElements, +1));
  });
};

setupCounters();
