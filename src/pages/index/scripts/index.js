import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import kfcArray from './data/dominos.json';
import macArray from './data/dominos.json';

const tabsContent = document.querySelectorAll('.tabs__content')[0];

class Dish {
  #count;
  constructor({id, price, title, img, count}){
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
  };
}

const dominosOrder = dominosArray.map(item => new Dish(item));
const kfcOrder = kfcArray.map(item => new Dish(item));
const macOrder = macArray.map(item => new Dish(item));

const dishDishCard = (dish) => `
    <div id="${dish.id}" class="dish">
    <img class="dish__image" src="${dish.img}" alt="">
    <div class="dish__title">${dish.title}</div>
    <div class="dish__info">
      <div class="dish__price">${dish.price}</div>
      <div class="counter">
        <button class="counter__button counter__button--increase"></button>
      </div>
    </div>
  </div>
`;

const listGenerate = (arr) => arr.reduce((list, dish) => {
  list += dishDishCard(dish);
  return list;
}, '');

tabsContent.insertAdjacentHTML('afterbegin', listGenerate(dominosOrder));
