var React = require('react'),
    d3 = require('d3'),
    Navbar = require('./navbar/navbar.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar/>
        <div id="app">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = App;
