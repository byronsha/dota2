var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js'),
    Row = require('react-bootstrap').Row;

var Hero = React.createClass({
  selectHero: function () {
    var filterParams = {
      filter: "heroes",
      value: this.props.hero.id
    };

    FilterActions.setHeroFilter(filterParams);
  },

  removeHero: function () {
    var filterParams = {
      filter: "heroes",
      value: this.props.hero.id
    };

    FilterActions.removeHeroFilter(filterParams);
  },

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var onClick = this.selectHero;
    var style = {};

    if (this.props.filters.heroes.indexOf(this.props.hero.id) != -1) {
      style.outline = "2px solid gold";
      onClick = this.removeHero;
    }

    if (this.props.loading) {
      style.opacity = "0.75";
      onClick = null;
    }

    return (
      <div onClick={onClick} style={style}>
        <img src={url + this.props.hero.image_url + '_lg.png'}></img>
      </div>
    )
  }
});

module.exports = Hero;
