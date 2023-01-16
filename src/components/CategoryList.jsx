import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {
  render() {
    const { produtosFiltrados } = this.props;
    console.log(produtosFiltrados);

    return (
      <div>
        {!produtosFiltrados
          ? <p />
          : produtosFiltrados.map((product) => (
            <div data-testid="product" key={ product.id }>
              <h3>{ product.title }</h3>
              <img src={ product.thumbnail } alt="imagem-do=produto" />
              <h4>{ product.price }</h4>
            </div>))}
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
