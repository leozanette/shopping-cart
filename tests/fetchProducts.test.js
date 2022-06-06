require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('teste se a função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('teste se a função é chamada e retorna o objeto', async () => {
    const response = await fetchProducts('computador');
    expect.assertions(3);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    await expect(response).toEqual(computadorSearch);
  });

  it('teste se a função fetch é chamada', async () => {
    expect.assertions(1);
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });

});
