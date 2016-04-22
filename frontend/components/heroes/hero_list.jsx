var React = require('react'),
    Hero = require('./hero.jsx'),
    Row = require('react-bootstrap').Row;

var HeroList = React.createClass({
  render: function () {
    var that = this;
    return (
      <div className="hero-list" id="hero-selector">
        {
          this.props.heroes.map(function(hero, idx) {
            return <Hero key={idx} hero={hero} filters={that.props.filters} loading={that.props.loading}/>
          })
        }
      </div>
    )
  }
});

module.exports = HeroList;
