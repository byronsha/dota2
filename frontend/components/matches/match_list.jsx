var React = require('react'),
    Match = require('./match.jsx'),
    Row = require('react-bootstrap').Row;

var MatchList = React.createClass({
  getXScale: function(props) {
    matches = props.matches;

    var xMax = d3.max(matches, function(match) { return match.duration });

    return d3.scale.linear()
      .domain([0, xMax])
      .range([0, 98]);
  },

  render: function () {
    var props = this.props;
    var filters = props.filters;
    var xScale = this.getXScale(props);

    return (
      <Row className="match-list">
        {
          this.props.matches.map(function(match, idx) {
            return (
              <Match even={idx % 2 === 0} key={idx} match={match} filters={filters} xScale={xScale}/>
            )
          })
        }
      </Row>
    )
  }
});

module.exports = MatchList;
