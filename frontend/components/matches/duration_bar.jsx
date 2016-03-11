var React = require('react'),
    ReactDOM = require('react-dom');

var DurationBar = React.createClass({
  render: function () {
    return (
      <svg width="100" height="10"><g><rect className="duration-bar" width={this.props.xScale(this.props.duration)} height="10"></rect></g></svg>
    )
  }
});

module.exports = DurationBar;
