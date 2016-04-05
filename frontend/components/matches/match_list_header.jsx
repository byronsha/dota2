var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col;

var MatchListHeader = React.createClass({
  render: function () {
    return (
      <Row className="list-header">
        <Col md={5}>
          <Col id="match-stats-column" md={3}><h5 className="matches-column-header">Match ID</h5></Col>
          <Col id="match-stats-column" md={3}><h5 className="matches-column-header">Mode</h5></Col>
          <Col id="match-stats-column" md={3}><h5 className="matches-column-header">Result</h5></Col>
          <Col id="match-stats-column" md={3}><h5 className="matches-column-header">Duration</h5></Col>
        </Col>

        <Col md={7}>
          <Col id="match-stats-column" md={6}><h5 className="matches-column-header">Radiant</h5></Col>
          <Col id="match-stats-column" md={6}><h5 className="matches-column-header">Dire</h5> </Col>
        </Col>
      </Row>
    )
  }
});

module.exports = MatchListHeader;
