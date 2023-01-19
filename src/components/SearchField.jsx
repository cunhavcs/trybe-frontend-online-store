import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';
import CategoryList from './CategoryList';

class SearchField extends React.Component {
  state = {
    categories: [],
    clicouEmPesquisar: false,
    clicouEmRadioBtn: false,
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
    this.setState({ clicouEmPesquisar: true, clicouEmRadioBtn: false });
    const { queryValue } = this.state;
    const productList = await getProductsFromCategoryAndQuery('', queryValue);
    if (productList.results.length < 1) {
      this.setState({
        products: false,
      });
    } else {
      this.setState({ products: productList.results, queryValue: '' });
    }
  };

  handleRadioClick = async ({ target }) => {
    this.setState({ clicouEmPesquisar: false, clicouEmRadioBtn: true });
    const idCategory = target.id;
    const productList = await getProductsFromCategoryAndQuery(idCategory, '');
    if (productList.results.length < 1) {
      this.setState({
        products: false,
      });
    } else {
      this.setState({ products: productList.results });
    }
  };

  renderizaListaDeProdutos = () => {
    const { clicouEmPesquisar, clicouEmRadioBtn, products } = this.state;

    if (clicouEmPesquisar && !clicouEmRadioBtn) {
      return (<ProductList produtosFiltrados={ products } />);
    } if (!clicouEmPesquisar && clicouEmRadioBtn) {
      return (<CategoryList produtosFiltrados={ products } />);
    }
    return '';
  };

  render() {
    const {
      categories,
      queryValue } = this.state;

    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          onChange={ this.handlechange }
          value={ queryValue }
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
        { this.renderizaListaDeProdutos() }
      </div>
    );
  }
}

export default SearchField;
