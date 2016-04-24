var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    ResetHeroesButton = require('./reset_heroes_button.jsx'),
    Row = require('react-bootstrap').Row,
    GfycatNames = require('../../constants/gfycat_names.js');

var SelectedHeroes = React.createClass({
  removeHero: function (id) {
    var filterParams = {
      filter: "heroes",
      value: id
    };

    FilterActions.removeHeroFilter(filterParams);
  },

  renderHero: function(id, idx) {
    if (id == 0) {
      return (
        <Col md={2} className="hero-slot" key={idx}>
          <div className="gfycat-wrapper"></div>
        </Col>
      )
    } else {
      var hero = HeroStore.findById(id);
      return (
        <Col md={2} className="hero-slot" key={idx}>
          <div className="gfycat-wrapper">
            <iframe className="gfycat fade-in"
              src={"https://gfycat.com/ifr/" + GfycatNames[hero.name]}
              frameBorder="0"
              scrolling="no">
            </iframe>
            <span className="gfycat-hero-name" onClick={this.removeHero.bind(null, id)}>{hero.name}</span>
          </div>
        </Col>
      )
    }
  },

  render: function () {
    var that = this;
    var heroes = this.props.heroes;

    if (heroes.length == 0) {
      return <Row></Row>
    } else {

      while (heroes.length < 5) {
        heroes.push(0)
      };

      return (
        <Row className="selected-heroes">
          {
            heroes.map(function(id, idx) {
              return that.renderHero(id, idx);
            })
          }
          <ResetHeroesButton/>
        </Row>
      )
    }
  }
});

module.exports = SelectedHeroes;
