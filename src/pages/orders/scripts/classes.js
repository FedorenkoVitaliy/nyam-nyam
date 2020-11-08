class Checkout {
  #orders;
  #checkoutTime;
  #restaurant;
  constructor({orders, checkout, restaurant}){
    this.#orders = orders;
    this.#checkoutTime = checkout;
    this.#restaurant = restaurant;
    this.ifOrderFinished = this.getCheckoutTime() < 0;
  }

  getRestaurant = () => this.#restaurant;
  getCheckoutTime = () => (((new Date(this.#checkoutTime).getTime() + 60 * 60 * 1000) - Date.now()) / 1000 / 60).toFixed(0);

  getFormattedDate = () => (
    new Date(this.#checkoutTime).toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );
  getFormattedTime = () => (
    new Date(this.#checkoutTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })
  );

  getOrders = () => this.#orders;
  getCheckoutTimePercent = () => {
    let timePercent = 100 - (Number(this.getCheckoutTime()) * 100) / 60;
    return timePercent <= 100 ? timePercent.toFixed(2) : 100;
  }

}

export { Checkout };