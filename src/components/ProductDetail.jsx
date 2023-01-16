import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.loadSingleProduct();
  }

  loadSingleProduct = async () => {
    const { match } = this.props;
    console.log(this.props);
    const singleProduct = await getProductById(match.params.id);
    this.setState({
      product: singleProduct,
    });
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
