var React = require('react'),
    Match = require('./match.jsx'),
    OpenMatch = require('./open_match.jsx'),
    Spinner = require('../heroes/spinner.jsx'),
    Row = require('react-bootstrap').Row;

var MatchList = React.createClass({
  getInitialState: function () {
    return { openMatch: null }
  },

  closeMatch: function () {
    this.setState({ openMatch: null })
  },

  renderMatch: function (match, idx) {
    if (this.state.openMatch == idx) {
      return <OpenMatch close={this.closeMatch} key={match.id} filters={this.props.filters} match={match}/>
    } else {
      var xScale = this.getXScale(this.props);
      return <Match key={match.id} match={match} filters={this.props.filters} xScale={xScale} changeOpenMatch={this.changeOpenMatch} matchIndex={idx}/>
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

    if (this.props.loading) {
      return (
        <Row className="matches-loading">
          <Spinner/>
        </Row>
      )
    } else {
      return (
        <Row className="match-list fade-in">
          {
            this.props.matches.map(function(match, idx) {
              return that.renderMatch(match, idx)
            })
          }
        </Row>
      )
    }
  }
});

module.exports = MatchList;

// return (
//   <div className="loading-screen">
//     <video autoPlay loop>
//       <source src="https://gfycat.com/ifr/YoungRelievedAfricancivet" type="video/webm" />
//       <source src="https://giant.gfycat.com/YoungRelievedAfricancivet.mp4" type="video/mp4" />
//     </video>
//     <div className="loader"/>
//   </div>
// )
