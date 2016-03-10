var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    browserHistory = require("react-router").browserHistory,
    App = require('./components/app.jsx'),
    Home = require('./components/home/home.jsx'),
    Matches = require('./components/matches/matches.jsx'),
    Heroes = require('./components/heroes/heroes.jsx');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="matches" component={Matches}/>
    <Route path="heroes" component={Heroes}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={browserHistory}>{routes}</Router>, document.getElementById('root')
  );
});
