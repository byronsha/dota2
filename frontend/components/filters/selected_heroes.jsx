var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    Row = require('react-bootstrap').Row;

var SelectedHeroes = React.createClass({
  renderHero: function(id, idx) {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    if (id == 0) {
      return <img key={idx} src={"http://i.imgur.com/rlx1Kb2.png"}></img>;
    } else {
      var hero = HeroStore.findById(id);
      return <img key={idx} src={url + hero.image_url + '_vert.jpg'}></img>;
    }
  },

  render: function () {
    var that = this;
    return (
      <Row className="selected-heroes">
        {
          this.props.heroes.map(function(id, idx) {
            return that.renderHero(id, idx);
          })
        }
      </Row>
    )
  }
});

module.exports = SelectedHeroes;
