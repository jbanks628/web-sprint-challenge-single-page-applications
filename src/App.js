import React from "react";
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Form from './Form';



const App = () => {


  return (
    <Router>
    <div className='pizzaPage'>
      
        <h1>Bloomer Eats</h1>
        <h2>Eat like a real Bloomeranian!</h2>

        <Link to='/'>
        <button id='order-pizza'>
          Home
        </button>
      </Link>

      <Link to='/pizza'>
        <button id='pizza-form'>
          Build-A-Pizza
        </button>
      </Link>

      <Link to='/complete'>
        Complete Order
      </Link>

      <Switch>
        <Route path='/'/>
        <Route path='/pizza' component={Form}>
        </Route>
      </Switch>

    </div>
    </Router>
  );
};
export default App;
