var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    TimeUtil = require('../../util/time_util.js'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    GfycatNames = require('../../constants/gfycat_names.js');

var SelectedHeroStats = React.createClass({
  getInitialState: function () {
    return {
      radiantWins: '',
      direWins: '',
      gamesPlayed: '',
      winrate: ''
    }
  },

  componentDidMount: function () {
    var heroId = this.props.hero.id
    ApiActions.fetchHeroStats(heroId, this.receiveHeroStats);
  },

  receiveHeroStats: function (hero) {
    this.setState({
      radiantWins: hero.radiant_wins,
      direWins: hero.dire_wins,
      gamesPlayed: hero.games_played,
      winrate: hero.winrate
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
    var url = "http://cdn.dota2.com/apps/dota2/images/items/";
    var gamesWon = this.state.radiantWins + this.state.direWins;
    var gamesPlayed = this.state.gamesPlayed;
    var winrate = this.state.winrate;
    var player = this.props.player;
    var match = this.props.match;

    return (
      <Row className="selected-hero-stats">
        <Col md={4}>
          <iframe className="gfycat"
            src={"https://gfycat.com/ifr/" + GfycatNames[this.props.hero.name]}
            frameBorder="0"
            scrolling="no">
          </iframe><br/>
        </Col>

        <Col md={8}>
          <Row>
            <h4 className="hero-name">{this.props.hero.name.toUpperCase()}</h4>
            <span>{winrate + '% WIN RATE '}</span>
            <span>{gamesWon + ' WINS '}</span>
            <span>{gamesPlayed + ' GAMES PLAYED'}</span>
          </Row>
          <Row>
            <h5>LATEST MATCH </h5>
            <ul className="horizontal">
              <li>
                <span>{this.winOrLoss()}</span><br/>
                <span>Duration: {TimeUtil.format(match.duration)}</span><br/>
                <span>{'KDA ' + player.kills + '/' + player.deaths + '/' + player.assists}</span>
              </li>
              <li className="item-list">
                {
                  player.items.map(function(item, idx) {
                    return <img key={idx} src={url + item.image_url + '_lg.png'}></img>
                  })
                }
              </li>
            </ul>
          </Row>
        </Col>
      </Row>
    )
  }
});

module.exports = SelectedHeroStats;
