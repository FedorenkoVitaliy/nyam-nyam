const changeActive = (current, all) => {
  all.forEach(element => element.classList.remove('active'));
  current.classList.add('active');
};

const listGenerate = (list, templateCreator) => list.reduce((list, dish) => {
  list += templateCreator(dish);
  return list;
},'');

export { changeActive, listGenerate };
