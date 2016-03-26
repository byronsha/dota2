var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    GameCountBar = require('./game_count_bar.jsx');

var WinratesWithOtherHeroes = React.createClass({
  getXScale: function(props) {
    heroes = props.heroes;

    var xMax = d3.max(heroes, function(hero) { return hero.games });

    return d3.scale.linear()
      .domain([0, xMax])
      .range([0, 100]);
  },

  sortedHeroes: function () {
    return this.props.heroes.sort(function(a, b) {
      if (a.games < b.games) {
        return 1;
      } else if (a.games > b.games) {
        return -1;
      } else {
        return 0;
      }
    });
  },

  renderHero: function (hero, idx) {
    var xScale = this.getXScale(this.props);
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var alliedHero = HeroStore.findByName(hero.hero);

    return (
      <li key={idx}>
        <img src={url + alliedHero.image_url + '_lg.png'} height="25px"></img>
        <GameCountBar hero={hero} xScale={xScale}/>
        <div className="bar-text">
          <span>{hero.hero + ': '}</span>
          <span>{hero.games}</span>
        </div>
      </li>
    )
  },

  render: function () {
    var that = this;
    var heroes = this.sortedHeroes();

    return (
      <div className="other-hero-stats">
        <ul>
          {heroes.map(function (hero, idx) {
            return that.renderHero(hero, idx);
          })}
        </ul>
      </div>
    )
  }
});

module.exports = WinratesWithOtherHeroes;
