import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import kfcArray from './data/kfc.json';
import macArray from './data/mac.json';

const tabsContent = document.querySelectorAll('.tabs__content')[0];
const featuredControls = document.querySelectorAll('.featured-item');

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

const orders = {
  'dominos': dominosArray.map(item => new Dish(item)),
  'mac': macArray.map(item => new Dish(item)),
  'kfc': kfcArray.map(item => new Dish(item)),
};

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
  tabsContent.insertAdjacentHTML('afterbegin', listGenerate(orders[orderType]));
};

changeActive(featuredControls[0], featuredControls);

tabsContent.insertAdjacentHTML('afterbegin',  listGenerate(orders['dominos']));

featuredControls.forEach((item) => item.addEventListener('click', selectFeatures));
