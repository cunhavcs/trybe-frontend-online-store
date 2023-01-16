import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getProductById } from '../services/api';

class CategoryList extends React.Component {
  render() {
    const { produtosFiltrados } = this.props;

    return (
      <div>
        {!produtosFiltrados
          ? <p />
          : produtosFiltrados.map((product) => (
            <Link
              to={ `/productdetail/${product.id}` }
              key={ product.id }
              data-testid="product-detail-link"
            >
              <div data-testid="product">
                <h3>{ product.title }</h3>
                <img src={ product.thumbnail } alt="imagem-do=produto" />
                <h4>{ product.price }</h4>
              </div>
            </Link>))}
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
