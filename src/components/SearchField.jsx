import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';
import CategoryList from './CategoryList';

class SearchField extends React.Component {
  state = {
    categories: [],
    queryValue: '',
    products: [],
    produtosFiltrados: [],
  };

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    const categoriesLoaded = await getCategories();
    this.setState({
      categories: categoriesLoaded,
    });
  };

  handlechange = (event) => {
    this.setState({
      queryValue: event.target.value,
    });
  };

  handleClick = async () => {
    const { queryValue } = this.state;
    const productList = await getProductsFromCategoryAndQuery('', queryValue);
    if (productList.results.length < 1) {
      this.setState({
        products: false,
      });
    } else {
      this.setState({
        products: productList.results,
      });
    }
  };

  handleRadioClick = async ({ target }) => {
    const idCategory = target.id;
    const produtosFiltrados = await getProductsFromCategoryAndQuery(idCategory, '');
    this.setState({ produtosFiltrados: produtosFiltrados.results });
  };

  render() {
    const { categories, products, produtosFiltrados } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.handlechange }
        />
        <input
          type="button"
          data-testid="query-button"
          value="Pesquisar"
          onClick={ this.handleClick }
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compra
        </Link>
        <nav>
          {categories.map((category) => (
            <div key={ category.id }>
              <label htmlFor={ category.id } data-testid="category">
                <input
                  type="radio"
                  id={ category.id }
                  name="category"
                  value={ category.name }
                  onClick={ this.handleRadioClick }
                />
                { category.name }
              </label>
            </div>
          ))}
        </nav>
        <ProductList produtosFiltrados={ products } onClick={ this.handleProductClick } />
        <CategoryList
          produtosFiltrados={ produtosFiltrados }
          onClick={ this.handleProductClick }
        />
      </div>
    );
  }
}

export default SearchField;
