var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col;

var MatchListHeader = React.createClass({
  render: function () {
    return (
      <Row className="list-header">
        <Col md={5}>
          <Col id="match-stats-column" md={3}><span className="matches-column-header">Match ID</span></Col>
          <Col id="match-stats-column" md={3}><span className="matches-column-header">Mode</span></Col>
          <Col id="match-stats-column" md={3}><span className="matches-column-header">Result</span></Col>
          <Col id="match-stats-column" md={3}><span className="matches-column-header">Duration</span></Col>
        </Col>

        <Col md={7}>
          <Col id="match-stats-column" md={6}><span className="matches-column-header">Radiant</span></Col>
          <Col id="match-stats-column" md={6}><span className="matches-column-header">Dire</span></Col>
        </Col>
      </Row>
    )
  }
});

module.exports = MatchListHeader;
