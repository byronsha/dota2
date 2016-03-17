var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js');

var OpenMatch = React.createClass({
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

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var match = this.props.match;

    if (match) {
      var radiant = this.orderPlayers(match.radiant);
      var dire = this.orderPlayers(match.dire);
      var heroes = this.heroes();

      return (
        <Row className="match-open">
          <Col md={5}>
            {
              radiant.map(function(player, idx) {
                return (
                  <Row className="radiant-details" key={idx}>
                    <Col md={4}><img className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "radiant-highlighted"} width="65px" height="65px" src={url + player.hero_image_url + '_vert.jpg'}></img></Col>
                    <Col md={4}>
                      <span>{player.hero_name}</span><br/>
                      <span>{player.kills + '/' + player.deaths + '/' + player.assists}</span>
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                )
              })
            }
          </Col>

          <Col md={2}></Col>

          <Col md={5}>
            {
              dire.map(function(player, idx) {
                return (
                  <Row className="dire-details" key={idx}>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <span>{player.hero_name}</span><br/>
                      <span>{player.kills + '/' + player.deaths + '/' + player.assists}</span>
                    </Col>
                    <Col md={4}><img className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "dire-highlighted"} width="65px" height="65px" src={url + player.hero_image_url + '_vert.jpg'}></img></Col>
                  </Row>
                )
              })
            }
          </Col>
        </Row>
      )
    } else {
      return <div></div>;
    }
  }
});

module.exports = OpenMatch;
