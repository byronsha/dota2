var React = require('react'),
    Hero = require('./hero.jsx'),
    Row = require('react-bootstrap').Row;

var HeroList = React.createClass({
  render: function () {
    var that = this;
    return (
      <Row className="hero-chart">
        <h5>{this.props.title}</h5>
        {
          this.props.heroes.map(function(hero, idx) {
            return <Hero key={idx} hero={hero} filters={that.props.filters} loading={that.props.loading}/>
          })
        }
      </Row>
    )
  }
});

module.exports = HeroList;
