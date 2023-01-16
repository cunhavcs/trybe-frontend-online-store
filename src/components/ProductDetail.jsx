import React from 'react';

class ProductDetail extends React.Component {
  render() {
    const { product } = this.props;

    return (
      <div>
        {console.log({ product })}
        <p>Product Detail</p>
      </div>
    );
  }
}

export default ProductDetail;
