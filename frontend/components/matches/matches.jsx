var React = require('react'),
    MatchStore = require('../../stores/match_store.js'),
    HeroStore = require('../../stores/hero_store.js'),
    FilterStore = require('../../stores/filter_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    ModeFilter = require('../filters/mode_filter.jsx'),
    HeroFilter = require('../filters/hero_filter.jsx'),
    MatchListHeader = require('./match_list_header.jsx'),
    MatchList = require('./match_list.jsx'),
    Spinner = require('./spinner.jsx'),
    HeroChart = require('../heroes/hero_chart.jsx');

var Matches = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      matches: [],
      heroes: [],
      filters: FilterStore.all()
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

  renderMatchList: function () {
    if (this.state.loading) {
      return <Spinner/>;
    } else {
      return <MatchList matches={this.state.matches} filters={this.state.filters}/>;
    }
  },

  removeSpinner: function () {
    this.setState({ loading: false });
  },

  render: function () {
    return (
      <div>
        <br/>
        <ModeFilter mode={this.state.filters.mode}/><br/><br/>
        <HeroFilter heroes={this.state.heroes} filters={this.state.filters.heroes} match={this.state.matches[0]}/><br/>

        {this.state.matches.length} results<br/><br/>
        <MatchListHeader/>
        {this.renderMatchList()}
      </div>
    )
  }
});

module.exports = Matches;
// <HeroChart heroes={this.state.heroes}/><br/>
