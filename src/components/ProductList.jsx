import React from 'react';
// import PropTypes from 'prop-types';

class ProductList extends React.Component {
  render() {
    const { productList } = this.props;

    return (
      <div data-testid="product">
        {productList
          ? <p>Nenhum produto foi encontrado</p>
          : productList.map((product) => (
            <div key={ product.id }>
              <h3>{ product.title }</h3>
              <img src={ product.thumbnail } alt="imagem-do=produto" />
              <h4>{ product.price }</h4>
            </div>))}
      </div>
    );
  }
}

// ProductList.propTypes = {
// productList: PropTypes.arrayOf(PropTypes.)
// }
export default ProductList;
