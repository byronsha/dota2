var React = require('react'),
    Row = require('react-bootstrap').Row;

var HeroList = React.createClass({
  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    return (
      <Row className="hero-chart">
        <h5>{this.props.title}</h5>
        {
          this.props.heroes.map(function(hero, idx) {
            return (
              <div key={idx} style={{background: "url(" + url + hero.image_url + '_lg.png' + ") no-repeat center", backgroundSize: "cover"}}></div>
            )
          })
        }
      </Row>
    )
  }
});

module.exports = HeroList;
