const saveCartItems = (valor) => localStorage.setItem('cartItems', valor);
  // const array = JSON.parse(localStorage.getItem('cartItems'));
  // array.push(valor);
  // const stringArray = JSON.stringify(array);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
