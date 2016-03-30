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
      gamesPlayed: [],
      winrates: []
    }
  },

  componentDidMount: function () {
    this.statisticsListener = StatisticsStore.addListener(this._onChange);
    ApiActions.fetchInitialStats();
  },

  _onChange: function () {
    this.setState({
      gamesPlayed: StatisticsStore.gamesPlayed(),
      winrates: StatisticsStore.winrates()
    })
  },

  render: function () {
    return (
      <Row>
        <Row className="selected-hero-stats">
          <Col md={12}>
            <h2>Games played:</h2>
            <GamesWithOtherHeroes heroes={this.state.gamesPlayed.slice()} barWidth={100} maxWidth={350} initial={true}/>
          </Col>
        </Row><br/>

        <Row className="selected-hero-stats">
          <Col md={12}>
            <h2>Win rates:</h2>
            <WinratesWithOtherHeroes heroes={this.state.winrates.slice()} barWidth={100} maxWidth={350} initial={true}/>
          </Col>
        </Row>
      </Row>
    )
  }
});

module.exports = InitialStats;