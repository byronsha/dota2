var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    WinLossBar = require('./win_loss_bar.jsx');

var WinratesWithOtherHeroes = React.createClass({
  getXScale: function(props) {
    heroes = props.heroes;

    return d3.scale.linear()
      .domain([0, props.barWidth])
      .range([0, props.maxWidth]);
  },

  renderHero: function (hero, idx) {
    var xScale = this.getXScale(this.props);
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var alliedHero = HeroStore.findByName(hero.hero);

    if (typeof alliedHero !== "undefined") {
      return (
        <li key={idx}>
          <img src={url + alliedHero.image_url + '_lg.png'} height="25px"></img>
          <WinLossBar hero={hero} xScale={xScale} barWidth={this.props.barWidth}/>
          <div className="bar-text">
            <span>{hero.hero + ': '}</span>
            <span>{hero.winrate + '% '}</span>
          </div>
        </li>
      )
    } else {
      return <li key={idx}/>
    }
  },

  render: function () {
    var that = this;
    return (
      <div className="other-hero-stats" id={this.props.initial ? "initial-stats" : ""}>
        <ul>
          {this.props.heroes.map(function (hero, idx) {
            return that.renderHero(hero, idx);
          })}
        </ul>
      </div>
    )
  }
});

module.exports = WinratesWithOtherHeroes;
