var React = require('react'),
    Row = require('react-bootstrap').Row,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js');

var OpenMatchDetails = React.createClass({
  winner: function () {
    var color = this.props.match.winner == "dire" ? "neon-red" : "neon-green";
    return <p className={color}><a id="open-match-winner">{this.props.match.winner.charAt(0).toUpperCase() + this.props.match.winner.slice(1) + " Victory"}</a></p>;
  },

  render: function () {
    var match = this.props.match;

    return (
      <div className="text-align-center">
        <Row className="list-header">
          <span>{match.steam_match_id}</span>
        </Row>

        <Row className="open-match-row"></Row>

        <Row className="open-match-row even-row">
          <br/>{this.winner()}
        </Row>

        <Row className="open-match-row pad-top">
          <span>{match.mode}</span><br/>
          <span>{Clusters[match.cluster]}</span>
        </Row>

        <Row className="open-match-row even-row pad-top">
          <span>{TimeUtil.timeAgo(match.start_time)}</span><br/>
          <span>{'Duration: ' + TimeUtil.format(match.duration)}</span>
        </Row>
      </div>
    )
  }
});

module.exports = OpenMatchDetails;
