import React, { Component } from 'react';
import {BrowserRouter as Router , Route , Link} from "react-router-dom";
import TodoList from './components/Todos-list';
import EditTodo from './components/edit-todo';
import CreateTodo from './components/create-todo';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-Blue bg-dark">
            
            <Link to="/" className="navbar-brand" > Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item ">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
            <Route path="/" exact component={TodoList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo}/>
        </div>
      </Router>
    );
  }
}

export default App;
