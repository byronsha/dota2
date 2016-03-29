var React = require('react');

var WinLossBar = React.createClass({
  render: function () {
    var hero = this.props.hero;
    var winrate = hero.winrate;
    var lossrate = 100 - winrate;

    return (
      <svg className="win-loss-bar" width={this.props.barWidth} height={10}>
        <g>
          <rect className="wins-bar" x={45} width={this.props.xScale(winrate)} height={10}></rect>
          <rect className="losses-bar" x={this.props.xScale(winrate) + 45} width={this.props.xScale(lossrate)} height={10}></rect>
        </g>
      </svg>
    )
  }
});

module.exports = WinLossBar;
