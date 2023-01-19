import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CategoryList extends React.Component {
  state = {
  };

  componentDidMount() {
    this.recuperaListaLocalStorage();
  }

  recuperaListaLocalStorage = () => {
    let produtosAdicionadosCarrinho = [];
    if (JSON.parse(localStorage.getItem('carrinho')) !== null) {
      produtosAdicionadosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    }
    this.setState({ produtosAdicionadosCarrinho });
  };

  adicionaProdutosListaCarrinho = ({ target: { id } }) => {
    const { produtosAdicionadosCarrinho } = this.state;
    const { produtosFiltrados } = this.props;

    const produtoClicado = produtosFiltrados
      .find((produto) => produto.id === id);
    const idProdutoFormatoCarrinho = produtoClicado.id;
    const titleProdutoFormatoCarrinho = produtoClicado.title;
    const priceProdutoFormatoCarrinho = produtoClicado.price;

    const produtoClicadoFormatoCarrinho = {
      id: idProdutoFormatoCarrinho,
      title: titleProdutoFormatoCarrinho,
      price: priceProdutoFormatoCarrinho,
    };
    produtoClicadoFormatoCarrinho.quantidade = 1;

    const produtoExisteNaLista = produtosAdicionadosCarrinho
      .some((produtoDaLista) => produtoDaLista.id === id);

    if (produtoExisteNaLista) {
      produtosAdicionadosCarrinho
        .find((produto) => produto.id === id).quantidade += 1;
    } else {
      produtosAdicionadosCarrinho.push(produtoClicadoFormatoCarrinho);
      this.setState({ produtosAdicionadosCarrinho });
    }

    localStorage.setItem('carrinho', JSON.stringify(produtosAdicionadosCarrinho));
  };

  render() {
    const { produtosFiltrados } = this.props;

    return (
      <div>
        {!produtosFiltrados
          ? <p />
          : produtosFiltrados.map((product) => (
            <div key={ product.id } data-testid="product">
              <Link
                to={ `/productdetail/${product.id}` }
                data-testid="product-detail-link"
              >
                <div>
                  <h3>{ product.title }</h3>
                  <img
                    src={ product.thumbnail }
                    alt="imagem-do-produto"
                  />
                  <h4>{ product.price }</h4>
                </div>
              </Link>
              <input
                type="button"
                data-testid="product-add-to-cart"
                id={ product.id }
                onClick={ this.adicionaProdutosListaCarrinho }
                value="Adicionar ao carrinho"
              />
            </div>
          ))}
      </div>
    );
  }
}

CategoryList.propTypes = {
  produtosFiltrados: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default CategoryList;
