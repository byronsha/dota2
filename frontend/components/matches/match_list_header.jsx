var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col;

var MatchListHeader = React.createClass({
  render: function () {
    return (
      <Row className="list-header">
        <Col md={5}>
          <Col md={3}><h5>Match ID</h5></Col>
          <Col md={3}><h5>Mode</h5></Col>
          <Col md={3}><h5>Result</h5></Col>
          <Col md={3}><h5>Duration</h5></Col>
        </Col>

        <Col md={7}>
          <Col md={6}><h5>Radiant</h5></Col>
          <Col md={6}><h5>Dire</h5> </Col>
        </Col>
      </Row>
    )
  }
});

module.exports = MatchListHeader;
