var React = require('react'),
    StatisticsStore = require('../../stores/statistics_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    GamesWithOtherHeroes = require('./games_with_other_heroes.jsx'),
    WinratesWithOtherHeroes = require('./winrates_with_other_heroes.jsx'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col;

var InitialStats = React.createClass({
  getInitialState: function () {
    return {
      gamesPlayed: StatisticsStore.gamesPlayed(),
      winrates: StatisticsStore.winrates()
    }
  },

  componentDidMount: function () {
    this.statisticsListener = StatisticsStore.addListener(this._onChange);
    ApiActions.fetchInitialStats(this.props.patch);
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({ gamesPlayed: [], winrates: [] });
    ApiActions.fetchInitialStats(nextProps.patch);
  },

  componentWillUnmount: function () {
    this.statisticsListener.remove();
  },

  _onChange: function () {
    this.setState({
      gamesPlayed: StatisticsStore.gamesPlayed(),
      winrates: StatisticsStore.winrates()
    })
  },

  render: function () {
    return (
      <Row id="initial-stats-wrapper">
        <Row className="selected-hero-stats">
          <Col md={6} id="initial-games-played-chart">
            <h2 className="chart-header">GAMES PICKED</h2>
            <GamesWithOtherHeroes heroes={this.state.gamesPlayed.slice()} barWidth={100} maxWidth={515} initial={true}/>
          </Col>

          <Col md={6} id="initial-win-rates-chart">
            <h2 className="chart-header" id="winrates">WIN RATE</h2>
            <WinratesWithOtherHeroes heroes={this.state.winrates.slice()} barWidth={100} maxWidth={515} initial={true}/>
          </Col>
        </Row>
      </Row>
    )
  }
});

module.exports = InitialStats;
