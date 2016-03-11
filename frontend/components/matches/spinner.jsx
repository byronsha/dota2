var React = require('react');

var Spinner = React.createClass({
  render: function () {
    return (
      <svg width="1000" height="1000" viewBox="0 0 1000 1000">
      	<g transform="translate(500,250)">
      		<rect className="rotate-45 rotate-back" x="-5" y="-5" width="10" height="10" stroke="black" strokeWidth="20" fill="none"/>
      		<rect className="rotate-45 rotate" x="-50" y="-50" width="100" height="100" stroke="black" strokeWidth="20" strokeLinejoin="bevel" fill="none"/>
      		<g transform="translate(-50,0) rotate(-45)"><polyline className="left" points="40,-40 50,-50 -40,-50 -50,-40 -50,50 -40,40" stroke="black" strokeWidth="20" fill="none"/></g>
      		<g transform="translate(50,0) rotate(135)"><polyline className="right" points="40,-40 50,-50 -40,-50 -50,-40 -50,50 -40,40" stroke="black" strokeWidth="20" fill="none"/></g>
      		<text y="-140" textAnchor="middle" fontWeight="bold" fontSize="3em" fontFamily="sans-serif">loading...</text>
      	</g>
      </svg>
    )
  }
});

module.exports = Spinner;
