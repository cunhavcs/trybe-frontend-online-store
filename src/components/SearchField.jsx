import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class SearchField extends React.Component {
  state = {
    categories: [],
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

  render() {
    const { categories } = this.state;
    return (
      <div>
        {console.log(categories)}
        <input type="text" />
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
      </div>
    );
  }
}

export default SearchField;
