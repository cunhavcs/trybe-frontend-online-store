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

  verificaCarrinhoVazio = () => {
    const { produtosAdicionadosCarrinho } = this.state;
    return (produtosAdicionadosCarrinho === null
      || produtosAdicionadosCarrinho.length === 0);
  };

  removeUnidadeProduto = ({ target: { name } }) => {
    // CRIAR FUNÇÃO DO BOTÃO (-)
    // acessar lista do Local Storage
    const { produtosAdicionadosCarrinho } = this.state;
    const produtosNoCarrinho = produtosAdicionadosCarrinho;

    // acessar o target.name que contem o id do produto
    const idProduto = name;

    // usar a HOF 'find' para procurar o produto na lista do LS pelo id
    // acessar a chave 'quantidade' do produto encontrado e subtrair uma unidade
    // * deve haver uma validação para que 'quantidade' seja maior ou igual a 1
    if (produtosNoCarrinho.find((produto) => produto.id === idProduto).quantidade > 1) {
      produtosNoCarrinho.find((produto) => produto.id === idProduto).quantidade -= 1;
    }

    // atualizar a lista do LS
    localStorage.setItem('carrinho', JSON.stringify(produtosNoCarrinho));

    // atualiza a lista do state
    this.setState({ produtosAdicionadosCarrinho: produtosNoCarrinho });
  };

  adicionaUnidadeProduto = ({ target: { name } }) => {
    // CRIAR FUNÇÃO DO BOTÃO (+)
    // acessar lista do Local Storage
    const { produtosAdicionadosCarrinho } = this.state;
    const produtosNoCarrinho = produtosAdicionadosCarrinho;

    // acessar o target.name que contem o id do produto
    const idProduto = name;

    // usar a HOF 'find' para procurar o produto na lista do LS pelo id
    // acessar a chave 'quantidade' do produto encontrado e somar uma unidade
    produtosNoCarrinho.find((produto) => produto.id === idProduto).quantidade += 1;

    // atualizar a lista do LS
    localStorage.setItem('carrinho', JSON.stringify(produtosNoCarrinho));

    // atualiza a lista do state
    this.setState({ produtosAdicionadosCarrinho: produtosNoCarrinho });
  };

  deletaProduto = async ({ target: { name } }) => {
    // CRIAR FUNÇÃO DO BOTÃO (EXCLUIR)
    // acessar lista do Local Storage
    const { produtosAdicionadosCarrinho } = this.state;
    const produtosNoCarrinho = produtosAdicionadosCarrinho;

    // acessar o target.name que contem o id do produto
    const idProduto = name;

    // usar a HOF 'filter' para gerar uma nova lista que não considere o produto identificado pelo id
    const listaProdutosAtualizada = produtosNoCarrinho
      .filter((produto) => produto.id !== idProduto);

    // atualiza a lista do state
    this.setState({ produtosAdicionadosCarrinho: listaProdutosAtualizada });

    // atualizar a lista do LS
    localStorage.setItem('carrinho', JSON.stringify(listaProdutosAtualizada));
  };

  render() {
    const { produtosAdicionadosCarrinho } = this.state;
    return (
      <div>
        {this.verificaCarrinhoVazio()
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : produtosAdicionadosCarrinho.map(({ id, price, quantidade, title }) => (
            <div key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <p>{price}</p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                name={ id }
                onClick={ this.removeUnidadeProduto }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{quantidade}</p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                name={ id }
                onClick={ this.adicionaUnidadeProduto }
              >
                +
              </button>
              <br />
              <br />
              <button
                data-testid="remove-product"
                type="button"
                name={ id }
                onClick={ this.deletaProduto }
              >
                Remover
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default ShoppingCart;
