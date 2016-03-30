var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    ApiActions = require('../../actions/api_actions.js'),
    GfycatNames = require('../../constants/gfycat_names.js'),
    HeroSelector = require('./hero_selector.jsx'),
    Image = require('react-bootstrap').Image;

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
        <HeroSelector heroes={this.state.heroes}/>

        <section>
          {
            this.state.heroes.map(function(hero, idx) {
              return (
                <div key={idx}>
                  <h3>{hero.name}</h3>
                  <img width="100px" src={url + hero.image_url + '_lg.png'}></img>
                </div>
              )
            })
          }
        </section>
      </div>
    )
  }
});

module.exports = Heroes;

// <ul className="horizontal">
//   {
//     hero.abilities.map(function(ability, idx) {
//       return (
//         <li key={idx}>
//           <span>{ability.name}</span><br/>
//           <img width="75px" src={ability.image_url}></img>
//         </li>
//       )
//     })
//   }
// </ul>
