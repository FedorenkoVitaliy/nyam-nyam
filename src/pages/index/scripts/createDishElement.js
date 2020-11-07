const elementCreate = ({tagName, classList, children, onClick, text, attributes}) => {
  const element = document.createElement(tagName || 'div');
  if(classList?.length){
    classList.forEach(className => element.classList.add(className));
  }
  if(attributes){
    Object.entries(attributes)?.forEach(([key, value]) => element.setAttribute(key, value));
  }
  if(text !== undefined){
    element.appendChild(document.createTextNode(text));
  }
  if(children?.length){
    children.forEach(child => element.appendChild(child instanceof window.HTMLElement? child: elementCreate(child)));
  }
  if(onClick){
    element.addEventListener('click', onClick);
  }
  return element;
};

export const createDishCard = (dish) => elementCreate({
  tagName: 'div',
  classList: ['dish'],
  children: [
    {
      tagName: 'img',
      classList: ['dish__image'],
      attributes: {
        "src": dish.img,
      }
    },
    {
      tagName: 'div',
      classList: ['dish__title'],
      text: dish.title,
    },
    {
      tagName: 'div',
      classList: ['dish__info'],
      children: [
        {
          tagName: 'div',
          classList: ['dish__price'],
          text: dish.price
        },
        {
          tagName: 'div',
          classList: ['counter'],
          children: [
            {
              tagName: 'button',
              classList: ['counter__button', 'counter__button--decrease'],
              onClick: () => dish.setCount(dish.getCount() -1),
              attributes: {
                'style': `display: ${dish.getCount()>0?'inherit':'none'}`
              }
            },
            {
              tagName: 'div',
              classList: ['counter__number'],
              text: dish.getCount(),
            },
            {
              tagName: 'button',
              classList: ['counter__button', 'counter__button--increase'],
              onClick: () => dish.setCount(8),
            },
          ]
        }
      ]
    },
  ]
});
