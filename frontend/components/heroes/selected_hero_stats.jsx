var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    StatisticsStore = require('../../stores/statistics_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    TimeUtil = require('../../util/time_util.js'),
    GamesWithOtherHeroes = require('./games_with_other_heroes.jsx'),
    WinratesWithOtherHeroes = require('./winrates_with_other_heroes.jsx'),
    LoadingDots = require('./loading_dots.jsx'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    GfycatNames = require('../../constants/gfycat_names.js');

var SelectedHeroStats = React.createClass({
  getInitialState: function () {
    return { heroStats: StatisticsStore.heroStats(this.props.hero.id) }
  },

  componentDidMount: function () {
    var heroId = this.props.hero.id
    this.statisticsListener = StatisticsStore.addListener(this._onChange);
    ApiActions.fetchHeroStats(heroId);
  },

  componentWillUnmount: function () {
    this.statisticsListener.remove();
  },

  _onChange: function () {
    this.setState({ heroStats: StatisticsStore.heroStats(this.props.hero.id) });
  },

  winOrLoss: function () {
    if (this.props.player.team == this.props.match.winner) {
      return <p className="neon-green"><a>WIN</a></p>;
    } else {
      return <p className="neon-red"><a>LOSS</a></p>;
    }
  },

  renderStats: function () {
    var state = this.state.heroStats;
    var gamesWon = state.radiant_wins + state.dire_wins;

    if (typeof state.winrate == "undefined") {
      return (
        <Col md={3} sm={3} xs={3} className="overall-stats">
          <br/>
          <LoadingDots/>
        </Col>
      )
    } else {
      return (
        <Col md={3} sm={3} xs={3} className="overall-stats">
          <span>{state.winrate + '%'}</span><br/>
          <span>{gamesWon}</span><br/>
          <span>{state.games_played - gamesWon}</span><br/>
          <span>{state.games_played}</span>
        </Col>
      )
    }
  },

  render: function () {
    var state = this.state.heroStats;
    var url = "http://cdn.dota2.com/apps/dota2/images/items/";
    var allies = state.allied_win_loss || [];
    var opponents = state.versus_win_loss || [];
    var gamesWon = state.radiant_wins + state.dire_wins;
    var wikiName = this.props.hero.name;

    wikiName = wikiName.replace(/\s/,"_");

    return (
      <Row>
        <Row className="selected-hero-stats">
          <Col md={4} sm={4} xs={4}/>

          <Col md={4} sm={4} xs={4}>
            <Row className="selected-hero-name-wrapper">
              <span id="selected-hero-name">{this.props.hero.name}</span>
            </Row><br/>

            <Row>
              <Col md={6} sm={6} xs={6}>
                <iframe className="gfycat"
                  src={"https://gfycat.com/ifr/" + GfycatNames[this.props.hero.name]}
                  frameBorder="0"
                  scrolling="no">
                </iframe>
              </Col>

              <Col md={3} sm={3} xs={3} className="overall-stats">
                <span>{'WIN RATE'}</span><br/>
                <span>{'WINS'}</span><br/>
                <span>{'LOSSES'}</span><br/>
                <span>{'GAMES'}</span>
              </Col>

              {this.renderStats()}
            </Row>

          </Col>

          <Col md={4} sm={4} xs={4}/>
        </Row>

        <br/><br/>

        <Row className="selected-hero-stats">
          <Col md={3} sm={6} id="selected-hero-chart">
            <h3 className="chart-header">GAMES WITH:</h3>
            <GamesWithOtherHeroes heroes={allies.slice()} barWidth={40} maxWidth={230} initial={false}/>
          </Col>

          <Col md={3} sm={6} id="selected-hero-chart">
            <h3 className="chart-header">GAMES AGAINST:</h3>
            <GamesWithOtherHeroes heroes={opponents.slice()} barWidth={40} maxWidth={230} initial={false}/>
          </Col>

          <Col md={3} sm={6} id="selected-hero-chart">
            <h3 className="chart-header">WIN RATE WITH:</h3>
            <WinratesWithOtherHeroes heroes={allies.slice()} barWidth={100} maxWidth={230} initial={false}/>
          </Col>

          <Col md={3} sm={6} id="selected-hero-chart">
            <h3 className="chart-header">WIN RATE AGAINST:</h3>
            <WinratesWithOtherHeroes heroes={opponents.slice()} barWidth={100} maxWidth={230} initial={false}/>
          </Col>
        </Row>

        <Row>
          <div className="wiki-wrapper">
            <iframe className="wiki" src={"http://www.dota2.com/hero/" + wikiName} frameBorder="0"></iframe>
          </div>
        </Row>
      </Row>
    )
  }
});

module.exports = SelectedHeroStats;
