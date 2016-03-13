var React = require('react'),
    ReactDOM = require('react-dom');

var DurationBar = React.createClass({
  render: function () {
    return (
      <svg width={98} height={8}><g><rect className="duration-bar" width={this.props.xScale(this.props.duration)} height={8}></rect></g></svg>
    )
  }
});

module.exports = DurationBar;
