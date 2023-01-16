const api = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const resposta = await fetch(`${api}/categories`);
  const data = await resposta.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`${api}/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

// export async function getProductsByCategory(idCategory, query) {
//   const response = await fetch(`${api}/search?category=${idCategory}&q=${query}`);
//   const data = await response.json();
//   return data.results;
// }

export async function getProductById(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
}
