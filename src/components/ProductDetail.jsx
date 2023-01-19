import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

// necessário fazer a mesma alteração no componentes ProductList e CategoryList

class ProductDetail extends React.Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.loadSingleProduct();
    this.recuperaListaLocalStorage();
  }

  loadSingleProduct = async () => {
    const { match } = this.props;
    const singleProduct = await getProductById(match.params.id);
    this.setState({
      product: singleProduct,
    });
  };

  recuperaListaLocalStorage = () => {
    let produtosAdicionadosCarrinho = [];
    if (JSON.parse(localStorage.getItem('carrinho')) !== null) {
      produtosAdicionadosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    }
    this.setState({ produtosAdicionadosCarrinho });
  };

  adicionaProdutosListaCarrinho = () => {
    const { product, produtosAdicionadosCarrinho } = this.state;

    const idProdutoFormatoCarrinho = product.id;
    const titleProdutoFormatoCarrinho = product.title;
    const priceProdutoFormatoCarrinho = product.price;

    const produtoClicadoFormatoCarrinho = {
      id: idProdutoFormatoCarrinho,
      title: titleProdutoFormatoCarrinho,
      price: priceProdutoFormatoCarrinho,
    };
    produtoClicadoFormatoCarrinho.quantidade = 1;

    const produtoExisteNaLista = produtosAdicionadosCarrinho
      .some((produtoDaLista) => produtoDaLista.id === idProdutoFormatoCarrinho);

    if (produtoExisteNaLista) {
      produtosAdicionadosCarrinho
        .find((produto) => produto.id === idProdutoFormatoCarrinho).quantidade += 1;
    } else {
      produtosAdicionadosCarrinho.push(produtoClicadoFormatoCarrinho);
      this.setState({ produtosAdicionadosCarrinho });
    }

    localStorage.setItem('carrinho', JSON.stringify(produtosAdicionadosCarrinho));
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">
          { product.title }
        </h3>
        <img
          src={ product.thumbnail }
          alt="imagem-do=produto"
          data-testid="product-detail-image"
        />
        <h4 data-testid="product-detail-price">{ product.price }</h4>
        <input
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.adicionaProdutosListaCarrinho }
          value="Adicionar ao carrinho"
        />
        <br />
        <br />
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compra
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
