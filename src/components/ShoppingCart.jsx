import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    produtosAdicionadosCarrinho: [],
  };

  componentDidMount() {
    this.recuperaListaLocalStorage();
  }

  recuperaListaLocalStorage = () => {
    const produtosAdicionadosCarrinho = JSON.parse(localStorage
      .getItem('carrinho'));
    this.setState({ produtosAdicionadosCarrinho });
  };

  render() {
    const { produtosAdicionadosCarrinho } = this.state;
    return (
      <div>
        {JSON.parse(localStorage.getItem('carrinho')) === null
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : produtosAdicionadosCarrinho.map(({ id, price, quantidade, title }) => (
            <div key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <p>{price}</p>
              <p data-testid="shopping-cart-product-quantity">{quantidade}</p>
            </div>
          ))}
      </div>
    );
  }
}

export default ShoppingCart;
