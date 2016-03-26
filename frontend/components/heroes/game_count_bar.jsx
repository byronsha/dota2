var React = require('react');

var GameCountBar = React.createClass({
  render: function () {
    return (
      <svg className="win-loss-bar" width={100} height={10}>
        <g>
          <rect className="game-count-bar" x={45} width={this.props.xScale(this.props.hero.games) * 1.4} height={10}></rect>
        </g>
      </svg>
    )
  }
});

module.exports = GameCountBar;
