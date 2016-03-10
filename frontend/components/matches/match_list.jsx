var React = require('react'),
    Match = require('./match.jsx'),
    MatchListHeader = require('./match_list_header.jsx');

var MatchList = React.createClass({
  render: function () {
    var props = this.props;
    var filters = props.filters;
    var xScale = this.getXScale(props);

    return (
      <div>
        <MatchListHeader/>
        {
          this.props.matches.map(function(match, idx) {
            return (
              <Match key={idx} match={match} filters={filters} xScale={xScale}/>
            )
          })
        }
      </div>
    )
  },

  getXScale: function(props) {
    matches = props.matches;

    var xMax = d3.max(matches, function(match) { return match.duration });

    return d3.scale.linear()
      .domain([0, xMax])
      .range([0, 100]);
  }
});

module.exports = MatchList;
