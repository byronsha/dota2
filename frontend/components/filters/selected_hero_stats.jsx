var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    GfycatNames = require('../../constants/gfycat_names.js');

var SelectedHeroStats = React.createClass({
  getInitialState: function () {
    return {
      radiantWins: '',
      direWins: '',
      gamesPlayed: '',
      winrate: ''
    }
  },

  componentDidMount: function () {
    var heroId = this.props.hero.id
    ApiActions.fetchHeroStats(heroId, this.receiveHeroStats);
  },

  receiveHeroStats: function (hero) {
    this.setState({
      radiantWins: hero.radiant_wins,
      direWins: hero.dire_wins,
      gamesPlayed: hero.games_played,
      winrate: hero.winrate
    })
  },

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var gamesWon = this.state.radiantWins + this.state.direWins;
    var gamesPlayed = this.state.gamesPlayed;
    var gamesLost = gamesPlayed - gamesWon;
    var winrate = this.state.winrate;
    var player = this.props.player;
    var match = this.props.match;

    return (
      <Row className="selected-hero-stats">
        <Col md={6}>
          <iframe className="gfycat"
            src={"https://gfycat.com/ifr/" + GfycatNames[this.props.hero.name]}
            frameBorder="0"
            scrolling="no">
          </iframe><br/>
        </Col>
        <Col md={6}>
          <h4 className="hero-name">{this.props.hero.name.toUpperCase()}</h4>
          <span>{gamesWon + ' WINS   ' + gamesLost + ' LOSSES (' + winrate + '% WON)'}</span><br/>
          <span>{gamesPlayed + ' GAMES PLAYED'}</span><br/><br/>
          <span>{player.team.toUpperCase()}</span><br/>
          <span>{player.team == match.winner ? "WON" : "LOST"}</span>
        </Col>
      </Row>
    )
  }
});

module.exports = SelectedHeroStats;
