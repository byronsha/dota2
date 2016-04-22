var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    ResetHeroesButton = require('./reset_heroes_button.jsx'),
    Row = require('react-bootstrap').Row;

var SelectedHeroes = React.createClass({
  removeHero: function (id) {
    var filterParams = {
      filter: "heroes",
      value: id
    };

    FilterActions.removeHeroFilter(filterParams);
  },

  renderHero: function(id, idx) {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    if (id == 0) {
      return <li key={idx}><div className="empty-hero-slot"></div></li>;
    } else {
      var hero = HeroStore.findById(id);
      return <li onClick={this.removeHero.bind(null, id)} key={idx}><div><img src={url + hero.image_url + '_lg.png'}></img></div></li>;
    }
  },

  render: function () {
    var that = this;
    var heroes = this.props.heroes;

    while (heroes.length < 5) {
      heroes.push(0)
    };

    return (
      <div className="selected-heroes">
        <ul className="horizontal">
          {
            heroes.map(function(id, idx) {
              return that.renderHero(id, idx);
            })
          }
          <ResetHeroesButton/>
        </ul>
      </div>
    )
  }
});

module.exports = SelectedHeroes;
