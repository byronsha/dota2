var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js');

var Heroes = React.createClass({
  getInitialState: function () {
    return {
      heroes: [],
    }
  },

  componentDidMount: function () {
    this.heroListener = HeroStore.addListener(this._onChange);
    ApiActions.fetchAllHeroes();
  },

  componentWillUnmount: function () {
    this.heroListener.remove();
  },

  _onChange: function () {
    this.setState({ heroes: HeroStore.all() });
  },

  render: function () {
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    return (
      <div>
        {
          this.state.heroes.map(function(hero, idx) {
            return (
              <div key={idx}>
                <h3>{hero.name}</h3>
                <img src={url + hero.image_url + '_lg.png'}></img>
                <ul className="horizontal">
                  {
                    hero.abilities.map(function(ability, idx) {
                      return (
                        <li key={idx}>
                          <span>{ability.name}</span><br/>
                          <img src={ability.image_url}></img>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
});

module.exports = Heroes;
