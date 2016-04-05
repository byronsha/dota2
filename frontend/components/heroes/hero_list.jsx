var React = require('react'),
    Hero = require('./hero.jsx'),
    Row = require('react-bootstrap').Row;

ICONS = {
  "STRENGTH": "http://images.akamai.steamusercontent.com/ugc/577904070808139756/3576D33C5276E049213C6833FDFF09838ED41A32/",
  "AGILITY": "http://images.akamai.steamusercontent.com/ugc/577904070808154460/C57BDD6E75C20265FFA9F196A1299BA18BB7E289/",
  "INTELLIGENCE": "http://www.dotadatabase.net/Content/icon_int.png"
};

var HeroList = React.createClass({
  render: function () {
    var that = this;
    return (
      <Row className="hero-list">
        <h4 className="hero-list-header"><img src={ICONS[this.props.title]}></img> {this.props.title}</h4>
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
