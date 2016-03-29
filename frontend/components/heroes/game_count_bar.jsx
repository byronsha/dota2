var React = require('react');

var GameCountBar = React.createClass({
  render: function () {
    return (
      <svg className="win-loss-bar" width={this.props.barWidth} height={10}>
        <g>
          <rect className="game-count-bar" x={45} width={this.props.xScale(this.props.hero.games)} height={10}></rect>
        </g>
      </svg>
    )
  }
});

module.exports = GameCountBar;
