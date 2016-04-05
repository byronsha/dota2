var React = require('react'),
    Link = require("react-router").Link;

var Navbar = React.createClass({
  render: function () {
    return (
      <nav>
        <div className="container-fluid" id="navbar-container">
          <div className="navbar-background-left">
            <div className="navbar-link" id="home-link"><Link to={'/'}><span></span></Link></div>
            <div className="navbar-link" id="live-matches-link"><Link to={'/'}><span></span></Link></div>
          </div>

          <div className="navbar-background-right">
            <div className="navbar-link" id="matches-link"><Link to={'/'}><span><img src="http://dota2stratroulette.netai.net/images/logo.png"></img></span></Link></div>
            <div className="navbar-link" id="heroes-link"><Link to={'/matches'}><span></span></Link></div>
          </div>
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;
