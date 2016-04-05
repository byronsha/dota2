var React = require('react'),
    IntroVideo = require('./intro_video.jsx');

var Home = React.createClass({
  render: function () {
    var url = "https://www.youtube.com/embed/4lRZ4Z6o-6U?controls=0&showinfo=0&autoplay=1&loop=1&iv_load_policy=3&playlist=4lRZ4Z6o-6U";
    return (
      <div>
        <IntroVideo url={url}/>
      </div>
    )
  }
});

module.exports = Home;
