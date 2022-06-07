const getEndpoint = (end) => `https://api.mercadolibre.com/items/${end}`;

const fetchItem = async (endpoint) => {
  try {
    const url = getEndpoint(endpoint);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
