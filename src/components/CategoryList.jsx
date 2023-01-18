import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class CategoryList extends React.Component {
  state = {
    productToCart:[],
  };

  handleButton = async (target) => {
    const productId = target.target.name;
    const singleProduct = await getProductById(productId);
    singleProduct.quantity = 1;
    const { title, price, quantity, id } = singleProduct;
    const newProduct = { title, price, quantity, id };
    this.setState({
      productToCart: newProduct,
    });
    const recoveredArray = JSON.parse(localStorage.getItem('productToCart'));
    console.log(recoveredArray);
    if (recoveredArray === null) {
      localStorage.setItem('productToCart', JSON.stringify(newProduct));
    } else if (recoveredArray.some((product) => product.id === newProduct.id)) {
      newProduct.quantity += 1;
    }
  };
    // if (JSON.parse(localStorage.getItem('productToCart'))
    //   .some((product) => product.id === newProduct.id)) {
    //   newProduct.quantity += 1;
    // } else {
    //   localStorage.setItem('productToCart', JSON.stringify(newProduct));
    // }

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
                  name={ product.id }
                  onClick={ this.handleButton }
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
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default CategoryList;
