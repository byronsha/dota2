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
      return <img className="item-slot" src="http://www.htmlcsscolor.com/preview/gallery/101010.png"></img>;
    } else {
      return <img className="item-slot" src={"http://cdn.dota2.com/apps/dota2/images/items/" + item.image_url + "_lg.png"}></img>;
    }
  },

  render: function () {
    var that = this;
    var url = "http://cdn.dota2.com/apps/dota2/images/";
    var match = this.props.match;

    if (match) {
      var radiant = this.orderPlayers(match.radiant);
      var dire = this.orderPlayers(match.dire);
      var heroes = this.heroes();

      return (
        <Row className="match-open">
          <Col md={5}>
            <Row className="list-header text-align-center">
              <span className="green">Radiant</span>
            </Row>
            {
              radiant.map(function(player, idx) {
                var items = that.getPlayerItems(player);
                return (
                  <Row className={idx % 2 == 0 ? "" : "even-row"} key={idx}>
                    <Col className="radiant-portraits" md={3}>
                      <div className={heroes.indexOf(player.hero_id) === -1 ? "unhighlighted" : "radiant-highlighted-open"}>
                        <img width="65px" height="65px" src={url + 'heroes/' + player.hero_image_url + '_vert.jpg'}></img>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="pad-top">
                        <div>
                          <span className="green">{player.hero_name}</span>
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
            <Row className="list-header text-align-center">
              <span className="red">Dire</span>
            </Row>
            {
              dire.map(function(player, idx) {
                var items = that.getPlayerItems(player);
                return (
                  <Row className={idx % 2 == 0 ? "" : "even-row"} key={idx}>
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
                          <span className="red float-right">{player.hero_name}</span>
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
