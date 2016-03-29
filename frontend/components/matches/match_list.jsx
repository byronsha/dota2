var React = require('react'),
    Match = require('./match.jsx'),
    OpenMatch = require('./open_match.jsx'),
    Row = require('react-bootstrap').Row;

var MatchList = React.createClass({
  getInitialState: function () {
    return { openMatch: 0 }
  },

  renderMatch: function (match, idx) {
    if (this.state.openMatch == idx) {
      return <OpenMatch key={idx} filters={this.props.filters} match={match}/>
    } else {
      var xScale = this.getXScale(this.props);
      return <Match key={idx} match={match} filters={this.props.filters} xScale={xScale} changeOpenMatch={this.changeOpenMatch} matchIndex={idx}/>
    }
  },

  changeOpenMatch: function (idx) {
    this.setState({ openMatch: idx })
  },

  getXScale: function (props) {
    matches = props.matches;

    var xMax = d3.max(matches, function(match) { return match.duration });

    return d3.scale.linear()
      .domain([0, xMax])
      .range([0, 98]);
  },

  render: function () {
    var that = this;

    return (
      <Row className="match-list">
        {
          this.props.matches.map(function(match, idx) {
            return that.renderMatch(match, idx)
          })
        }
      </Row>
    )
  }
});

module.exports = MatchList;
