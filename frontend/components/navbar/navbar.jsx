var React = require('react'),
    Link = require("react-router").Link;

var Navbar = React.createClass({
  render: function () {
    return (
      <div className="navbar-default">
        <ul className="horizontal">
          <li><Link to={'/'}>home</Link></li>
          <li><Link to={'/matches'}>matches</Link></li>
          <li><Link to={'/heroes'}>heroes</Link></li>
        </ul>
      </div>
    )
  }
});

module.exports = Navbar;
