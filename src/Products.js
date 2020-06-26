import React from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
import ProductForm from './ProductForm';

var PRODUCTS = {
  '1': {id: 1, category: 'Drugs', price: '$459.99', stocked: true, name: 'Paracetamol'},
  '2': {id: 2, category: 'Foods', price: '$5,000', stocked: true, name: 'Shawama'},
  '3': {id: 3, category: 'Drinks', price: '$11,000', stocked: false, name: 'ColdStone'},
  '4': {id: 4, category: 'Electronics', price: '$799', stocked: true, name: 'Laptop'},
  '5': {id: 5, category: 'Furnitures', price: '$1,300', stocked: false, name: 'Dining Table'},
  '6': {id: 6, category: 'Foods', price: '$100', stocked: true, name: 'Bean'}
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: PRODUCTS
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }
  handleFilter(filterInput) {
    this.setState(filterInput);
  }
  saveProduct(product) {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState((prevState) => {
      let products = prevState.products;
      products[product.id] = product;
      return { products };
    });
  }
  handleDestroy(productId) {
    this.setState((prevState) => {
      let products = prevState.products;
      delete products[productId];
      return { products };
    });
  }
  render() {
    return (
      <div >
        <Filters
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilter={this.handleFilter}
        ></Filters>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onDestroy={this.handleDestroy}
        ></ProductTable>
        <ProductForm onSave={this.saveProduct} ></ProductForm>
      </div>
    );
  }
}

export default Products;