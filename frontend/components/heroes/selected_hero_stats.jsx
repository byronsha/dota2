var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    TimeUtil = require('../../util/time_util.js'),
    GamesWithOtherHeroes = require('./games_with_other_heroes.jsx'),
    WinratesWithOtherHeroes = require('./winrates_with_other_heroes.jsx'),
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
      <Row>
        <Row className="selected-hero-stats">
          <h2 className="hero-name">{this.props.hero.name}</h2>
          <Col md={4}>
            <iframe className="gfycat"
              src={"https://gfycat.com/ifr/" + GfycatNames[this.props.hero.name]}
              frameBorder="0"
              scrolling="no">
            </iframe>
          </Col>

          <Col md={8} className="overall-stats">
            <br/><span>{'Win rate: ' + state.winrate + '%'}</span><br/>
            <span>{'Wins: ' + gamesWon}</span><br/>
            <span>{'Losses: ' + (state.gamesPlayed - gamesWon)}</span><br/>
            <span>{'Total games: ' + state.gamesPlayed}</span>
          </Col>
        </Row><br/>

        <Row className="selected-hero-stats">
          <Col md={6} id="selected-hero-chart">
            <h3>Games with:</h3>
            <GamesWithOtherHeroes heroes={state.allies.slice()} barWidth={40} maxWidth={145} initial={false}/>
          </Col>

          <Col md={6} id="selected-hero-chart">
            <h3>Games against:</h3>
            <GamesWithOtherHeroes heroes={state.opponents.slice()} barWidth={40} maxWidth={145} initial={false}/>
          </Col>
        </Row><br/>

        <Row className="selected-hero-stats">
          <Col md={6} id="selected-hero-chart">
            <h3>Win rate with:</h3>
            <WinratesWithOtherHeroes heroes={state.allies.slice()} barWidth={100} maxWidth={145} initial={false}/>
          </Col>

          <Col md={6} id="selected-hero-chart">
            <h3>Win rate against:</h3>
            <WinratesWithOtherHeroes heroes={state.opponents.slice()} barWidth={100} maxWidth={145} initial={false}/>
          </Col>
        </Row><br/>
      </Row>
    )
  }
});

module.exports = SelectedHeroStats;
