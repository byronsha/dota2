var React = require('react'),
    d3 = require('d3'),
    Navbar = require('./navbar/navbar.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Navbar/>
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
