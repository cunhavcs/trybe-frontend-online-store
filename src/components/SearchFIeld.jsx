import React from 'react';
import { Link } from 'react-router-dom';

class SearchField extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compra
        </Link>
      </div>
    );
  }
}

export default SearchField;
