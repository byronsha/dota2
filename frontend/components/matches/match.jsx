var React = require('react'),
    ReactDOM = require('react-dom'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js'),
    DurationBar = require('./duration_bar.jsx');

var Match = React.createClass({
  orderPlayers: function (players) {
    var playerArray = players;
    var orderedPlayers = [];

    for (var slot in this.props.filters.heroes) {
      for (var i = 0; i < playerArray.length; i++) {
        if (this.props.filters.heroes[slot] == playerArray[i].hero_id) {
          orderedPlayers.push(playerArray[i]);
          playerArray.splice(i, 1);
        }
      }
    };
    return orderedPlayers.concat(playerArray);
  },

  heroes: function () {
    var heroes = [];

    for (var slot in this.props.filters.heroes) {
      heroes.push(parseInt(this.props.filters.heroes[slot]))
    };
    return heroes;
  },

  winner: function () {
    return this.props.match.winner.charAt(0).toUpperCase() + this.props.match.winner.slice(1);
  },

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var match = this.props.match;
    var radiant = this.orderPlayers(match.radiant);
    var dire = this.orderPlayers(match.dire);
    var heroes = this.heroes();

    return (
      <Row>
        <Col md={4}>
          <Col md={4}>
            <span>{match.steam_match_id}</span><br/>
            <span className="subtext">{TimeUtil.timeAgo(match.start_time)}</span>
          </Col>

          <Col md={4}>
            <span>{match.mode}</span><br/>
            <span className="subtext">{match.match_type === "Public Matchmaking" ? "Normal" : match.match_type}</span>
          </Col>

          <Col md={4}>
            <span>{this.winner() + " victory"}</span><br/>
            <span className="subtext">{Clusters[match.cluster]}</span>
          </Col>
        </Col>

        <Col md={1}>
          <span>{TimeUtil.format(match.duration)}</span>
          <DurationBar duration={match.duration} xScale={this.props.xScale}/>
        </Col>

        <Col md={7}>
          <Col md={6}>
            <ul className="horizontal">
              {
                radiant.map(function(player, idx) {
                  return (
                    <li className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "radiant-highlighted"} key={idx}>
                      <img width="55px" src={url + player.hero_image_url + '_sb.png'}></img>
                    </li>
                  )
                })
              }
            </ul>
          </Col>

          <Col md={6}>
            <ul className="horizontal">
              {
                dire.map(function(player, idx) {
                  return (
                    <li className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "dire-highlighted"} key={idx}>
                      <img width="55px" src={url + player.hero_image_url + '_sb.png'}></img>
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
