const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const arrayProdutos = async () => {
  const dados = await fetchProducts('computador').then((data) => data);
  const { results } = dados;
  results.forEach((iten) => {
    const { id, title, thumbnail } = iten;
    const obj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const section = createProductItemElement(obj);
    document.querySelector('.items').appendChild(section);
  });
};

//----------------------------------------------------------------------------

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const putInCart = () => {
  document.addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const carrinho = document.querySelector('.cart__items');
      const sku = getSkuFromProductItem(event.target.parentElement);
      const item = await fetchItem(sku);
      const { id, title, price } = item;
      const obj = { sku: id, name: title, salePrice: price };
      const li = createCartItemElement(obj);
      carrinho.appendChild(li);
    }
  });
};

window.onload = () => {
  arrayProdutos();
  putInCart();
};
