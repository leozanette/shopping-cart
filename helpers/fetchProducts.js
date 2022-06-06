const produtosUrl = (endpoint) => `https://api.mercadolibre.com/sites/MLB/search?q=${endpoint}`;

const fetchProducts = async (endpoint) => {
  try {
    const url = produtosUrl(endpoint);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

// fetchProducts()
//   .then((data) => console.log(data))

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
