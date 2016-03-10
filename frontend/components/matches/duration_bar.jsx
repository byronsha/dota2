var React = require('react'),
    ReactDOM = require('react-dom');

var DurationBar = React.createClass({
  render: function () {
    return (
      <svg width="100" height="5"><g><rect className="duration-bar" width={this.props.xScale(this.props.duration)} height="5"></rect></g></svg>
    )
  }
});

module.exports = DurationBar;
