import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';
// .

class SearchField extends React.Component {
  state = {
    categories: [],
    queryValue: '',
    products: [],
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
    if (productList.length < 1) {
      this.setState({
        products: false,
      });
    } else {
      console.log(productList);
      this.setState({
        products: productList,
      });
    }
  };

  render() {
    const { categories, products } = this.state;
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
                />
                { category.name }
              </label>
            </div>
          ))}
        </nav>
        <ProductList productList={ products } />
      </div>
    );
  }
}

export default SearchField;
