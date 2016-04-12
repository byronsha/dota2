var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    TimeUtil = require('../../util/time_util.js'),
    Clusters = require('../../constants/clusters.js'),
    OpenMatchDetails = require('./open_match_details.jsx'),
    MatchStore = require('../../stores/match_store.js'),
    ApiActions = require('../../actions/api_actions.js');

var OpenMatch = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      players: MatchStore.matchDetails(this.props.match.id) || []
    }
  },

  componentDidMount: function () {
    this.matchListener = MatchStore.addListener(this._onChange);
    ApiActions.fetchMatchDetails(this.props.match.id);
  },

  _onChange: function () {
    this.setState({
      loading: false,
      players: MatchStore.matchDetails(this.props.match.id)
    })
  },

  componentWillUnmount: function () {
    this.matchListener.remove();
  },

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
    for (var i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].id == player.id) {
        var items = this.state.players[i].items.slice();
        while (items.length < 6) {
          items.push(0);
        }
        return items;
      }
    }
    return [];
  },

  getItemImage: function (item) {
    if (item == 0) {
      return <img className="item-slot" src="http://hydra-media.cursecdn.com/dota2.gamepedia.com/thumb/6/6b/Unknown_icon.png/128px-Unknown_icon.png?version=0e96d6b76f5c83fd05ceb93e9a0f52b6"></img>;
    } else {
      return <img className="item-slot" src={"http://cdn.dota2.com/apps/dota2/images/items/" + item.image_url + "_lg.png"}></img>;
    }
  },

  renderItems: function (items) {
    var that = this;
    if (items == []) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )
    } else {
      return (
        <ul className="horizontal float-left" id="items">
          {
            items.map(function(item, idx) {
              return <li key={idx}>{that.getItemImage(item)}</li>
            })
          }
        </ul>
      )
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
      var portraitWidth = window.innerWidth * 0.033;

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
                        <img width={portraitWidth} height={portraitWidth} src={url + 'heroes/' + player.hero_image_url + '_vert.jpg'}></img>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="pad-top">
                        <div>
                          <span className="radiant-hero-name">{player.hero_name}</span>
                          <span className="gold float-right">{"Lvl " + player.level}</span>
                        </div>
                        {that.renderItems(items)}
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
                          <span className="gold">{"Lvl " + player.level}</span>
                          <span className="dire-hero-name">{player.hero_name}</span>
                        </div>
                        <ul className="horizontal float-right" id="items">
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
                        <img width={portraitWidth} height={portraitWidth} src={url + 'heroes/' + player.hero_image_url + '_vert.jpg'}></img>
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
