var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    GfycatNames = require('../../constants/gfycat_names.js');

var HeroChart = React.createClass({
  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    return (
      <Row className="hero-chart">
          {
            this.props.heroes.map(function(hero, idx) {
              return (
                <div key={idx} style={{background: "url(" + url + hero.image_url + '_vert.jpg' + ") no-repeat center", backgroundSize: "cover"}}></div>
              )
            })
          }
      </Row>
    )
  }
});

module.exports = HeroChart;
