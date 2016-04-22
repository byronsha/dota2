var React = require('react'),
    MatchStore = require('../../stores/match_store.js'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterStore = require('../../stores/filter_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    ModeFilter = require('../filters/mode_filter.jsx'),
    MatchListHeader = require('./match_list_header.jsx'),
    MatchList = require('./match_list.jsx'),
    HeroSelector = require('../heroes/hero_selector.jsx'),
    SelectedHero = require('../heroes/selected_hero.jsx'),
    Row = require('react-bootstrap').Row;
    Col = require('react-bootstrap').Col;

var Matches = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      matches: [],
      heroes: [],
      filters: FilterStore.all(),
      tab: "RECENT MATCHES"
    }
  },

  componentDidMount: function () {
    this.matchListener = MatchStore.addListener(this._onChange);
    this.heroListener = HeroStore.addListener(this._onChange);
    this.filterListener = FilterStore.addListener(this._onFiltersChange);
    ApiActions.fetchAllMatches(this.state.filters, this.removeSpinner);
    ApiActions.fetchAllHeroes();
  },

  componentWillUnmount: function () {
    FilterActions.resetAllFilters();
    this.matchListener.remove();
    this.heroListener.remove();
    this.filterListener.remove();
  },

  _onChange: function () {
    this.setState({ matches: MatchStore.all(), heroes: HeroStore.all() });
  },

  _onFiltersChange: function () {
    this.setState({ loading: true, filters: FilterStore.all() });
    ApiActions.fetchAllMatches(FilterStore.all(), this.removeSpinner);
  },

  removeSpinner: function () {
    this.setState({ loading: false });
  },

  selectTab: function (e) {
    this.setState({ tab: e.target.innerHTML });
  },

  renderStatsOrMatches: function () {
    if (this.state.tab == "RECENT MATCHES") {
      return (
        <div className="recent-matches">
          <MatchListHeader/>
          <MatchList matches={this.state.matches} filters={this.state.filters} loading={this.state.loading}/>
        </div>
      )
    } else if (this.state.tab == "STATISTICS") {
      return (
        <div>
          <SelectedHero heroes={this.state.heroes} filters={this.state.filters} loading={this.state.loading} match={this.state.matches[0]}/>
        </div>
      )
    }
  },

  render: function () {
    var hero = HeroStore.findById(this.state.filters.heroes[this.state.filters.heroes.length - 1]);
    return (
      <div>
        <div className="sections">
          <span onClick={this.selectTab}>RECENT MATCHES</span>
          <span onClick={this.selectTab}>STATISTICS</span>
        </div>

        <HeroSelector heroes={this.state.heroes} filters={this.state.filters} loading={this.state.loading} match={this.state.matches[0]}/>
        <br/>

        {this.renderStatsOrMatches()}
      </div>
    )
  }
});

module.exports = Matches;

// <ModeFilter mode={this.state.filters.mode}/>
