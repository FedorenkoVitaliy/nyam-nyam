import {getShoppingCartCount, setShoppingCartCount} from "./shopingCart";

const getCounterElements = (counter) => ({
  decrease: counter.querySelector('.counter__button--decrease'),
  number: counter.querySelector('.counter__number'),
  increase: counter.querySelector('.counter__button--increase')
});

const resetCounters = (dishList) => {
  dishList.forEach(item => item.setCount(0));
  return dishList;
};

const handleCounter = (dishList, counter, counterElements, operation) => {
  const id = Number(counter.getAttribute("data-id"));
  const currentDish = dishList.find(dish => dish.id === id);
  const { decrease, number } = counterElements;

  currentDish.setCount(currentDish.getCount() + operation);
  number.innerHTML = currentDish.getCount();
  setShoppingCartCount(getShoppingCartCount(dishList));
  decrease.style.display = `${currentDish.getCount() === 0 ? 'none' : 'inherit'}`;
};

const setupCounters = (dishList) => {
  const dishCounter = document.querySelectorAll('.counter');
  dishCounter.forEach((counter) => {
    const counterElements = getCounterElements(counter);
    const { decrease, increase } = counterElements;
    decrease.addEventListener('click', () => handleCounter(dishList, counter, counterElements, -1));
    increase.addEventListener('click', () => handleCounter(dishList, counter, counterElements, +1));
  });
};

export { resetCounters, handleCounter, setupCounters };