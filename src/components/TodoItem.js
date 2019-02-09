import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  //Let me put styles dinamics in the jsx
  getStyle = () => {
    return {
      background: "#f4f4f4",
      paddding: "10px",
      borderBottom: "1px #ccc doted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
          />
          {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
        </p>
      </div>
    );
  }
}

//propTypes
TodoItem.propTypes = {
  todo: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

const btnStyle = {
    background: 'ff0000',
    color: 'red',
    border: 'none',
    paddding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem;
