var React = require('react'),
    MatchStore = require('../../stores/match_store.js'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterStore = require('../../stores/filter_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    MatchListHeader = require('./match_list_header.jsx'),
    MatchList = require('./match_list.jsx'),
    HeroSelector = require('../heroes/hero_selector.jsx'),
    Statistics = require('../heroes/statistics.jsx'),
    SelectedHeroes = require('../heroes/selected_heroes.jsx'),
    PatchFilter = require('../filters/patch_filter.jsx'),
    Row = require('react-bootstrap').Row;
    Col = require('react-bootstrap').Col;

var Matches = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      matches: [],
      heroes: [],
      filters: FilterStore.all(),
      tab: "MATCHES"
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
    if (this.state.tab == "MATCHES") {
      return (
        <div className="recent-matches">
          <MatchListHeader filters={this.state.filters}/>
          <MatchList matches={this.state.matches} filters={this.state.filters} loading={this.state.loading}/>
        </div>
      )
    } else if (this.state.tab == "STATS") {
      return (
        <div>
          <Statistics heroes={this.state.heroes} filters={this.state.filters} match={this.state.matches[0]}/>
        </div>
      )
    }
  },

  render: function () {
    var filters = this.state.filters;
    var hero = HeroStore.findById(filters.heroes[filters.heroes.length - 1]);

    return (
      <div className="container" id="matches-main">
        <br/><br/>
        <HeroSelector heroes={this.state.heroes} filters={filters} loading={this.state.loading} match={this.state.matches[0]}/>

        <SelectedHeroes heroes={filters.heroes.slice()}/><br/>

        <div>
          <span id="tab-selector">
            <span className={this.state.tab == "MATCHES" ? "selected-tab" : ""} onClick={this.selectTab}>MATCHES</span>
            <span className={this.state.tab == "STATS" ? "selected-tab" : ""} onClick={this.selectTab}>STATS</span>
          </span>

          <PatchFilter patch={filters.patch}/>
        </div><br/>

        {this.renderStatsOrMatches()}
      </div>
    )
  }
});

module.exports = Matches;

// <ModeFilter mode={this.state.filters.mode}/>
