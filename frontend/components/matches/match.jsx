var React = require('react'),
    ReactDOM = require('react-dom'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js'),
    DurationBar = require('./duration_bar.jsx');

var Match = React.createClass({
  orderPlayers: function (players) {
    var playerArray = players.slice();
    var orderedPlayers = [];
    var heroes = this.props.filters.heroes;

    for (var i = 0; i < heroes.length; i++) {
      for (var j = 0; j < playerArray.length; j++) {
        if (heroes[i] == playerArray[j].hero_id) {
          orderedPlayers.push(playerArray[j]);
          playerArray.splice(j, 1);
        }
      }
    }

    return orderedPlayers.concat(playerArray);
  },

  heroes: function () {
    var heroes = [];
    for (var i = 0; i < this.props.filters.heroes.length; i++) {
      heroes.push(parseInt(this.props.filters.heroes[i]));
    };
    return heroes;
  },

  winner: function () {
    var color = this.props.match.winner == "dire" ? "red" : "green";
    return <span className={color}>{this.props.match.winner.charAt(0).toUpperCase() + this.props.match.winner.slice(1) + " victory"}</span>;
  },

  changeOpenMatch: function () {
    this.props.changeOpenMatch(this.props.matchIndex);
  },

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var match = this.props.match;
    var radiant = this.orderPlayers(match.players.slice(0,5));
    var dire = this.orderPlayers(match.players.slice(5,10));
    var heroes = this.heroes();

    return (
      <Row className="match-row" onClick={this.changeOpenMatch}>
        <Col md={5} sm={5} xs={5}>
          <Col id="match-stats-column" md={3} sm={3} xs={3}>
            <span className="gold">{match.steam_match_id}</span><br/>
            <span>{TimeUtil.timeAgo(match.start_time)}</span>
          </Col>

          <Col id="match-stats-column" md={3} sm={3} xs={3}>
            <span className="blue">{match.mode}</span><br/>
            <span className="grey">{match.match_type === "Public Matchmaking" ? "Normal" : match.match_type} {match.season}</span>
          </Col>

          <Col id="match-stats-column" md={3} sm={3} xs={3}>
            {this.winner()}<br/>
          <span className="grey">{typeof Clusters[match.cluster] == "undefined" ? match.cluster : Clusters[match.cluster]}</span>
          </Col>

          <Col id="match-stats-column" md={3} sm={3} xs={3}>
            <span className="grey">{TimeUtil.format(match.duration)}</span>
            <DurationBar duration={match.duration} xScale={this.props.xScale}/>
          </Col>
        </Col>

        <Col md={7} sm={7}>
          <Col id="match-stats-column" md={6} sm={6} xs={6}>
            <ul className="horizontal">
              {
                radiant.map(function(player, idx) {
                  return (
                    <li className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "radiant-highlighted"} key={idx}>
                      <img width="55px" src={url + player.hero_image_url + '_lg.png'}></img>
                    </li>
                  )
                })
              }
            </ul>
          </Col>

          <Col id="match-stats-column" md={6} sm={6} xs={6}>
            <ul className="horizontal">
              {
                dire.map(function(player, idx) {
                  return (
                    <li className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "dire-highlighted"} key={idx}>
                      <img width="55px" src={url + player.hero_image_url + '_lg.png'}></img>
                    </li>
                  )
                })
              }
            </ul>
          </Col>
        </Col>
      </Row>
    )
  }
});

module.exports = Match;
