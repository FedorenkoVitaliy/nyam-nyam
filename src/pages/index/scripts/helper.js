const changeActive = (current, all) => {
  all.forEach(element => element.classList.remove('active'));
  current.classList.add('active');
};

const listGenerate = (list, templateCreator) => list.reduce((list, dish) => {
  list += templateCreator(dish);
  return list;
},'');


const ordersConfirm = (dishList, restaurant) => {
  const prevOrders = JSON.parse(localStorage.getItem('placedOrders')) || [];
  const order = {
    'restaurant': restaurant,
    'checkout': new Date().toISOString(),
    'orders': dishList.reduce((list, {id, price, title, getCount}) => {
      getCount() && list.push({
        id,
        price,
        title,
        'count': getCount()
      });
      return list;
    }, [])
  };

  localStorage.setItem('placedOrders', JSON.stringify([...prevOrders, order]));
  document.location = 'orders.html';
};

export { changeActive, listGenerate, ordersConfirm };
