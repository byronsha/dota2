var React = require('react'),
    Link = require("react-router").Link;

var Navbar = React.createClass({
  render: function () {
    return (
        <nav>
          <div className="container">
            <ul className="links">
              <li><Link to={'/'}><span>home</span></Link></li>
              <li><Link to={'/matches'}><span>matches</span></Link></li>
              <li><Link to={'/heroes'}><span>heroes</span></Link></li>
              <li><Link to={'/items'}><span>items</span></Link></li>
            </ul>
          </div>
        </nav>
    )
  }
});

module.exports = Navbar;

// <Link to={'/'}><img src="http://shotsfiredgaming.com/misc/stream_images/dota2_symbol.png"></img></Link>
