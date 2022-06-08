const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('teste se ao executar a funão saveCartItems com o argumento <ol><li>Item</li></ol> o método localStorage.setItem é chamado', () => {
    const item = '<ol><li>Item</li></ol>'
    saveCartItems(item);
    // expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>');
  });
});
