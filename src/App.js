import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import SearchField from './components/SearchField';
import ProductDetail from './components/ProductDetail';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ SearchField } />
          <Route path="/cart" component={ ShoppingCart } />
          <Route path="/productdetail" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
