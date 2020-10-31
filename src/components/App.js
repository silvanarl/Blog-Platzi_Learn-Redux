import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './users/index';

const Tasks = () => <div>Tasks</div>;

const App = () => (
  <BrowserRouter>
  	  <Menu />
      <div className="margin">
        <Route exact path='/'>
          <Users />
        </Route>
        <Route exact path='/tasks'>
          <Tasks />
        </Route>
      </div>
  </BrowserRouter>
);

export default App;
