
var React = require('react');
var ReactDOM = require('react-dom');

var TodoList = React.createClass({
  handleSearchTextUpdate: function (searchText) {
    this.state.searchText = searchText;
    this.setState(this.state)
  },
  getInitialState: function () {
    return {
      data: [],
      searchText: ''
    }
  },
  componentDidMount : function () {
    console.log('in real dev we get data via: ' + this.props.url);

    var networkTime = 1000;

    var mockData = [
      {id: 1, name: "report the updates to Boss", time: "9:30"},
      {id: 2, name: "Stand-up meeting", time: "10:00"},
      {id: 3, name: "Draw up a plan for next step", time: "11:00"}
    ];

    this.state.data = mockData;

    this.setState(this.state)

    console.log(this.state)

  },

  render: function () {

    var state = this.state;

    var todoItems = state.data.filter(function(todo) {
      return todo.name.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1;
    }).map(function(todo) {
      return (
        <TodoItem key={todo.id} todo={todo}/>
      );
    });
    return (
      <div className='todoList'>
        <SearchBox onSearchTextUpdate={this.handleSearchTextUpdate}/>
        {todoItems}
      </div>
    );
  }
});

var TodoItem = React.createClass({
  handleClick: function () {
    var todoData = this.props.todo;

    todoData.hasDone = !todoData.hasDone;

    this.setState({
      hasDone : todoData.hasDone
    })
  },
  getInitialState: function () {
    return {
      hasDone: false
    }
  },
  componentDidMount: function () {
    this.setState({
      hasDone: this.props.todo.hasDone
    })
  },
  render: function () {
    var classList = ['todoItem'];
    this.state.hasDone && classList.push('hasDone');
    var classNames = classList.join(' ');

    return (
      <div className={classNames}>
        <input type="checkbox" onClick={this.handleClick} checked={this.props.todo.hasDone} />
        <div className="name">{this.props.todo.name}</div>
        <div className="time">{this.props.todo.time}</div>
      </div>
    );
  }
});

var SearchBox = React.createClass({

  handleChange: function (event) {
    var newInput = event.target.value;
    this.props.onSearchTextUpdate(newInput)
  },
  render: function () {
    return (
      <div className="searchBox">
        <input type="text" onChange={this.handleChange} placeholder="type in keywords to search"/>
      </div>
    )
  }
})

var url = 'http://localhost:8080/todos';

ReactDOM.render(
  <TodoList url={url} />,
  document.getElementById('container')
)