var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterStore = require('../../stores/filter_store.js'),
    HeroDropdowns = require('./hero_dropdowns.jsx'),
    SelectedHeroes = require('./selected_heroes.jsx'),
    SelectedHeroStats = require('./selected_hero_stats.jsx'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    Button = require('react-bootstrap').Button;

var HeroFilter = React.createClass({
  resetAllFilters: function () {
    FilterActions.resetAllFilters();
  },

  filterHeroIds: function () {
    var ids = [];
    for (var slot in this.props.filters) {
      ids.push(this.props.filters[slot])
    };
    return ids;
  },

  getSelectedHeroId: function () {
    for (var slot in this.props.filters) {
      if (this.props.filters[slot] != 0) {
        return this.props.filters[slot];
      }
    };
  },

  getHeroPlayer: function () {
    if (this.props.match) {
      var id = this.getSelectedHeroId();
      var players = this.props.match.radiant.concat(this.props.match.dire);

      for (var i = 0; i < players.length; i++) {
        if (players[i].hero_id == id) {
          return players[i];
        }
      }
    }
  },

  renderSelectedHeroStats: function () {
    var player = this.getHeroPlayer();

    if (typeof player == "undefined") {
      return <div/>;
    } else {
      var hero = HeroStore.findById(player.hero_id);
      return (
        <SelectedHeroStats hero={hero} player={player} match={this.props.match}/>
      );
    }
  },

  render: function () {
    var that = this;

    return (
      <div>
        <Row className="hero-dropdowns">
          <Col md={6}>
            <SelectedHeroes heroes={this.filterHeroIds()}/>
            <HeroDropdowns heroes={this.props.heroes} filters={this.props.filters}/>
          </Col>
          <Col md={6}>
            {this.renderSelectedHeroStats()}
          </Col>
        </Row><br/>

        <Button
          onClick={this.resetAllFilters}
          bsStyle="danger"
          bsSize="xsmall">reset all
        </Button>
      </div>
    )
  }
});

module.exports = HeroFilter;
