import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/header";
import AddTodo from "./components/AddTodo";
import About from './components/pages/about';
//import uuid from "uuid";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => {
        return this.setState({
          todos: res.data
        });
      });
  }

  //Toggle Completed
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //delete To do
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>{
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      });
    });
  };

  //ultimate id

  ultimateId() {
    return this.state.todos[this.state.todos.length - 1].id + 1;
  }

  //Add Todo
  addTodo = title => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false
    }).then(res =>{
      this.setState({
        todos: [...this.state.todos, res.data]
      })
    });
  };

  render() {
    //console.log(this.ultimateId());
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" Component={About}/> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
