import '../../../styles/index.scss';
import { sortOrders, joinStringItems } from './helper';
import { Checkout } from './classes';

const activeOrders = document.querySelector('#coming-up-orders');
const previousOrders = document.querySelector('#previous-orders');

let checkoutList = JSON.parse(localStorage.getItem('placedOrders')).map((item) => new Checkout(item));
const ordersList = sortOrders(checkoutList);
const activeOrdersList = joinStringItems(ordersList.active);
const previousOrdersList = joinStringItems(ordersList.prev);
activeOrders.insertAdjacentHTML('afterbegin', activeOrdersList);
previousOrders.insertAdjacentHTML('afterbegin', previousOrdersList);