var React = require('react');

var StatsWithOtherHeroes = React.createClass({
  renderHero: function (hero, idx) {
    return (
      <li key={idx}>
        <span>{hero.hero}</span>
        <span>{hero.winrate + '%'}</span>
      </li>
    )
  },

  render: function () {
    var that = this;
    return (
      <ul>
        {this.props.heroes.map(function (hero, idx) {
          return that.renderHero(hero, idx);
        })}
      </ul>
    )
  }
});

module.exports = StatsWithOtherHeroes;
