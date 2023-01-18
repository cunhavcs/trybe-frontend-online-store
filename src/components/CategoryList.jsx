import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// 1 - Adicionar produtos à uma lista pela lista de produtos (CategoryList e ProductLista)
// OK criar uma lista vazia
// OK acessar o produto clicado e usar apenas as chaves que preciso (id, nome, preço)
// OK adicionar uma chave "quantidade" ao produto e atribuir o valor "1"
// OK se o produto já existir na lista, adicionar +1 a quantidade
// OK se o produto não existir na lista, adicionar produto à lista

// 2 - Gravar a lista de produtos no local storage (CategoryList e ProductLista)
// OK a cada alteração na lista de produtos, atualizar a lista do local storage

// 3 - Renderizar os itens da lista na página do carrinho de compras (ShoppingCart)
// acessar a lista do local storage
// se a lista do local storage estiver vazia, continuar renderizando "Seu carrinho está vazio"
// se a lista do local storage tiver pelo menos 1 item, renderizar na tela
// a cada alteração na lista do local storage, atualizar a lista de renderização

class CategoryList extends React.Component {
  state = {
    produtosAdicionadosCarrinho: [],
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
            <div key={ product.id }>
              <Link
                to={ `/productdetail/${product.id}` }
                data-testid="product-detail-link"
              >
                Detalhe de produto
              </Link>
              <div data-testid="product">
                <h3>{ product.title }</h3>
                <img src={ product.thumbnail } alt="imagem-do=produto" />
                <h4>{ product.price }</h4>
                <input
                  type="button"
                  data-testid="product-add-to-cart"
                  id={ product.id }
                  onClick={ this.adicionaProdutosListaCarrinho }
                  value="Adicionar ao carrinho"
                />
              </div>
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
    price: PropTypes.number,
  })).isRequired,
};

export default CategoryList;
