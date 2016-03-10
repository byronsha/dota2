var React = require('react'),
    MatchStore = require('../../stores/match_store.js'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterStore = require('../../stores/filter_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    HeroFilter = require('../filters/hero_filter.jsx'),
    ModeFilter = require('../filters/mode_filter.jsx'),
    MatchList = require('./match_list.jsx');

var Matches = React.createClass({
  getInitialState: function () {
    return {
      matches: [],
      heroes: [],
      filters: FilterStore.all()
    }
  },

  componentDidMount: function () {
    this.matchListener = MatchStore.addListener(this._onChange);
    this.heroListener = HeroStore.addListener(this._onChange);
    this.filterListener = FilterStore.addListener(this._onFiltersChange);
    ApiActions.fetchAllMatches(this.state.filters);
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
    this.setState({ filters: FilterStore.all() });
    ApiActions.fetchAllMatches(this.state.filters);
  },

  render: function () {
    return (
      <div>
        <ModeFilter/>
        <HeroFilter heroes={this.state.heroes} filters={this.state.filters.heroes}/>

        {this.state.matches.length} results<br/>
        <MatchList matches={this.state.matches} filters={this.state.filters}/>
      </div>
    )
  }
});

module.exports = Matches;
