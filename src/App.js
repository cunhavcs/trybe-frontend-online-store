import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import SearchField from './components/SearchField';
import ProductDetail from './components/ProductDetail';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ SearchField } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route path="/productdetail/:id" component={ ProductDetail } />
      </Switch>
    );
  }
}

export default App;
