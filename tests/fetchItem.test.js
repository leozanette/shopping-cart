require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('teste se a função fetchProducts é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('teste se a função é chamada e retorna o objeto', async () => {
    const response = await fetchItem('MLB1615760527');
    expect.assertions(3);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    await expect(response.id).toEqual(item.id);
  });

  it('teste se a função fetch é chamada', async () => {
    expect.assertions(1);
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
