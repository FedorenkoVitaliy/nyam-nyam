import { createActiveOrderCard, createPreviouslyOrderCard } from './templates';

const sortOrders = (orders) => orders.reduce((list, order) => {
  order.ifOrderFinished?
    list.prev.push(createPreviouslyOrderCard(order)):
    list.active.push(createActiveOrderCard(order));
  return list;
}, {active: [], prev:[]});

const joinStringItems = array => array.reduce((list, order) => {
  list += order;
  return list;
}, '');

export { sortOrders, joinStringItems };