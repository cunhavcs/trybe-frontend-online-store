import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  render() {
    const { productList } = this.props;
    // console.log(productList);
    return (
      <div>
        {!productList
          ? <p>Nenhum produto foi encontrado</p>
          : productList.map((product) => (
            <div key={ product.id }>
              <Link
                to={ `/productdetail/${product.id}` }
                data-testid="product-detail-link"
              >
                Detalhes do produto
              </Link>
              <div data-testid="product">
                <h3>{ product.title }</h3>
                <img src={ product.thumbnail } alt="imagem-do=produto" />
                <h4>{ product.price }</h4>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default ProductList;
