class Dish {
  #count = 0;
  constructor({id, price, title, img}){
    this.id = id;
    this.price = price;
    this.title = title;
    this.img = img;
    this.#count;
  }

  getCount = () => this.#count;
  setCount = (number) => {
    if(typeof(number) !== 'number' || number < 0){
      throw new Error('Неверное значение счётчика');
    }
    this.#count = number;
  };
}

export { Dish };