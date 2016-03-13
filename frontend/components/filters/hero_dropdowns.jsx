var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    HeroDropdown = require('./hero_dropdown.jsx'),
    Row = require('react-bootstrap').Row

var HeroDropdowns = React.createClass({
  render: function () {
    var that = this;
    var slots = Object.keys(this.props.filters);

    return (
      <Row>
        {
          slots.map(function(slot, idx) {
            var hero = HeroStore.findById(that.props.filters[slot]) || {name: "empty... "};
            return (
              <div
                key={idx}><HeroDropdown
                filter="heroes"
                slot={slot}
                heroes={that.props.heroes}
                hero={hero}/>
              </div>
            )
          })
        }
      </Row>
    )
  }
});

module.exports = HeroDropdowns;
