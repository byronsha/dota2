var React = require('react'),
    Link = require("react-router").Link;

var Navbar = React.createClass({
  render: function () {
    return (
      <div className="navbar-default" id="navbar">
        <div className="container" id="navbar-container">
          <ul className="horizontal">
            <li><Link to={'/'}>home</Link></li>
            <li><Link to={'/matches'}>matches</Link></li>
            <li><Link to={'/heroes'}>heroes</Link></li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
