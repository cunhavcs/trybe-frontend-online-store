const api = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const resposta = await fetch(`${api}/categories`);
  const data = await resposta.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`${api}/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data.results;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de
}
