const carrinho = document.querySelector('.cart__items');

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
//---------------------------------------------------
const somaCart = () => {
  const itens = document.getElementsByClassName('cart__item');
  const array = [...itens];
  const text = array.map((item) => item.innerText);
  let total = 0;
  text.forEach((item) => {
    const parte = item.search('PRICE:');
    const slice = Number(item.slice(parte + 8));
    total += slice;
  });
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = total;
};

//----------------------------------------------------------------------------
const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(carrinho.innerHTML);
  somaCart();
};

//------------------------------------------------------------------------------------------

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

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
      const sku = getSkuFromProductItem(event.target.parentElement);
      const item = await fetchItem(sku);
      const { id, title, price } = item;
      const obj = { sku: id, name: title, salePrice: price };
      const li = createCartItemElement(obj);
      carrinho.appendChild(li);
      saveCartItems(carrinho.innerHTML);
      somaCart();
    }
  });
};

//--------------------------------------------------------

const getListLocalStorage = () => {
  const lista = getSavedCartItems();
  carrinho.innerHTML = lista;
  const itens = document.getElementsByClassName('cart__item');
  const array = [...itens];
  array.forEach((iten) => iten.addEventListener('click', cartItemClickListener));
};

//----------------------------------------------------------

const emptyCart = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    carrinho.replaceChildren();
    saveCartItems(carrinho.innerHTML);
    somaCart();
  });
};

//----------------------------------------------------------------------------
const totalPrice = () => {
  const section = document.querySelector('.cart');
  const p = document.createElement('p');
  p.className = 'total-price';
  section.appendChild(p);
};

window.onload = () => {
  // createLocalStorage();
  totalPrice();
  getListLocalStorage();
  arrayProdutos();
  putInCart();
  emptyCart();
  // somaCart();
};
