import React from 'react';
// import CategorySideBar from './CategorySideBar';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        {/* <CategorySideBar /> */}
      </div>
    );
  }
}

export default ShoppingCart;
