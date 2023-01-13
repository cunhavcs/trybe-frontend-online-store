import PropTypes from 'prop-types';
import React from 'react';
// .

class ProductList extends React.Component {
  render() {
    const { productList } = this.props;
    console.log(productList);
    return (
      <div>
        {!productList
          ? <p>Nenhum produto foi encontrado</p>
          : productList.map((product) => (
            <div data-testid="product" key={ product.id }>
              <h3>{ product.title }</h3>
              <img src={ product.thumbnail } alt="imagem-do=produto" />
              <h4>{ product.price }</h4>
            </div>))}
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
