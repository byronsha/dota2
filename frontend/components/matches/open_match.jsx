var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js'),
    OpenMatchDetails = require('./open_match_details.jsx');

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

  getPlayerItems: function (player) {
    var items = player.items.slice();
    while (items.length < 6) {
      items.push(0);
    }

    return items;
  },

  getItemImage: function (item) {
    if (item == 0) {
      return <img className="item-slot" src="http://hydra-media.cursecdn.com/dota2.gamepedia.com/thumb/6/6b/Unknown_icon.png/128px-Unknown_icon.png?version=0e96d6b76f5c83fd05ceb93e9a0f52b6"></img>;
    } else {
      return <img className="item-slot" src={"http://cdn.dota2.com/apps/dota2/images/items/" + item.image_url + "_lg.png"}></img>;
    }
  },

  render: function () {
    var that = this;
    var url = "http://cdn.dota2.com/apps/dota2/images/";
    var match = this.props.match;

    if (match) {
      var radiant = this.orderPlayers(match.players.slice(0,5));
      var dire = this.orderPlayers(match.players.slice(5,10));
      var heroes = this.heroes();

      return (
        <Row className="match-open" id={match.winner + "-win"}>
          <h2 className="section-title">{'MATCH ' + match.steam_match_id}</h2>
          <Col md={5}>
            {
              radiant.map(function(player, idx) {
                var items = that.getPlayerItems(player);
                return (
                  <Row key={idx}>
                    <Col className="radiant-portraits" md={3}>
                      <div className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "radiant-highlighted-open"}>
                        <img width="65px" height="65px" src={url + 'heroes/' + player.hero_image_url + '_vert.jpg'}></img>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="pad-top">
                        <div>
                          <span className="radiant-hero-name">{player.hero_name}</span>
                          <span className="float-right">{"Lvl " + player.level}</span>
                        </div>
                        <ul className="horizontal float-left">
                          {
                            items.map(function(item, idx) {
                              return <li key={idx}>{that.getItemImage(item)}</li>
                            })
                          }
                        </ul>
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="pad-top">
                        <span className="green">{player.kills + '/' + player.deaths + '/' + player.assists}</span><br/>
                        <span>{player.last_hits + '/' + player.denies}</span>
                      </div>
                    </Col>
                  </Row>
                )
              })
            }
          </Col>

          <Col md={2}>
            <OpenMatchDetails match={match}/>
          </Col>

          <Col md={5}>
            {
              dire.map(function(player, idx) {
                var items = that.getPlayerItems(player);
                return (
                  <Row key={idx}>
                    <Col md={3}>
                      <div className="float-right pad-top">
                        <span className="red">{player.kills + '/' + player.deaths + '/' + player.assists}</span><br/>
                        <span className="float-right">{player.last_hits + '/' + player.denies}</span>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="pad-top">
                        <div>
                          <span>{"Lvl " + player.level}</span>
                          <span className="dire-hero-name">{player.hero_name}</span>
                        </div>
                        <ul className="horizontal float-right">
                          {
                            items.map(function(item, idx) {
                              return <li key={idx}>{that.getItemImage(item)}</li>
                            })
                          }
                        </ul>
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "dire-highlighted-open"}>
                        <img width="65px" height="65px" src={url + 'heroes/' + player.hero_image_url + '_vert.jpg'}></img>
                      </div>
                    </Col>
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
