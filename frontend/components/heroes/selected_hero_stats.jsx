var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    TimeUtil = require('../../util/time_util.js'),
    StatsWithOtherHeroes = require('./stats_with_other_heroes.jsx'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    GfycatNames = require('../../constants/gfycat_names.js');

var SelectedHeroStats = React.createClass({
  getInitialState: function () {
    return {
      radiantWins: 0,
      direWins: 0,
      gamesPlayed: 0,
      winrate: 0,
      allies: [],
      opponents: []
    }
  },

  componentDidMount: function () {
    var heroId = this.props.hero.id
    ApiActions.fetchHeroStats(heroId, this.receiveHeroStats);
  },

  componentWillReceiveProps: function(nextProps) {
    ApiActions.fetchHeroStats(nextProps.hero.id, this.receiveHeroStats);
  },

  receiveHeroStats: function (hero) {
    this.setState({
      radiantWins: hero.radiant_wins,
      direWins: hero.dire_wins,
      gamesPlayed: hero.games_played,
      winrate: hero.winrate,
      allies: hero.allied_win_loss,
      opponents: hero.versus_win_loss
    })
  },

  winOrLoss: function () {
    if (this.props.player.team == this.props.match.winner) {
      return <p className="neon-green"><a>WIN</a></p>;
    } else {
      return <p className="neon-red"><a>LOSS</a></p>;
    }
  },

  render: function () {
    var state = this.state;
    var url = "http://cdn.dota2.com/apps/dota2/images/items/";
    var gamesWon = this.state.radiantWins + this.state.direWins;

    return (
      <div>
        <Row className="selected-hero-stats">
          <Col md={6}>
            <iframe className="gfycat"
              src={"https://gfycat.com/ifr/" + GfycatNames[this.props.hero.name]}
              frameBorder="0"
              scrolling="no">
            </iframe>
          </Col>

          <Col md={6}>
            <Row>
              <h2 className="hero-name">{this.props.hero.name}</h2>
              <span>{state.winrate + '% WIN RATE'}</span><br/>
              <span>{gamesWon + ' WINS'}</span><br/>
              <span>{(state.gamesPlayed - gamesWon) + ' LOSSES'}</span><br/>
              <span>{state.gamesPlayed + ' GAMES PLAYED'}</span>
            </Row>
          </Col>
        </Row>

        <Row className="selected-hero-stats">
          <Col md={6}>
            <h3>Best with</h3>
            <StatsWithOtherHeroes heroes={state.allies.slice(0,5)}/>
          </Col>

          <Col md={6}>
            <h3>Best against</h3>
            <StatsWithOtherHeroes heroes={state.opponents.slice(0,5)}/>
          </Col>
        </Row>

        <Row className="selected-hero-stats">
          <Col md={6}>
            <h3>Worst with</h3>
            <StatsWithOtherHeroes heroes={state.allies.reverse().slice(0,5)}/>
          </Col>

          <Col md={6}>
            <h3>Worst against</h3>
            <StatsWithOtherHeroes heroes={state.opponents.reverse().slice(0,5)}/>
          </Col>
        </Row>
      </div>
    )
  }
});

module.exports = SelectedHeroStats;
