var React = require('react');

var IntroVideo = React.createClass({
  render: function () {
    return (
      <iframe src={this.props.url}
              width="100%"
              height={window.innerHeight}
              frameBorder="0"
              allowFullScreen>
      </iframe>
    )
  }
});

module.exports = IntroVideo;
