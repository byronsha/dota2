var React = require('react');

var LoadingDots = React.createClass({
  render: function () {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    )
  }
});

module.exports = LoadingDots;
