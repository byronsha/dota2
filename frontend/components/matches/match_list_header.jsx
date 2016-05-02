var React = require('react'),
    ModeFilter = require('../filters/mode_filter.jsx'),
    RegionFilter = require('../filters/region_filter.jsx'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col;

var MatchListHeader = React.createClass({
  render: function () {
    return (
      <Row className="list-header">
        <Col md={5} sm={5}>
          <Col id="match-stats-column" md={3} sm={3}>
            <span className="matches-column-header">Match ID</span>
          </Col>

          <Col id="match-stats-column" md={3} sm={3}>
            <ModeFilter mode={this.props.filters["mode"]}/>
          </Col>

          <Col id="match-stats-column" md={3} sm={3}>
            <RegionFilter region={this.props.filters["region"]}/>
          </Col>

          <Col id="match-stats-column" md={3} sm={3}>
            <span className="matches-column-header">Duration</span>
          </Col>
        </Col>

        <Col md={7} sm={7}>
          <Col id="match-stats-column" md={6} sm={6}>
            <span className="matches-column-header">Radiant</span>
          </Col>

          <Col id="match-stats-column" md={6} sm={6}>
            <span className="matches-column-header">Dire</span>
          </Col>
        </Col>
      </Row>
    )
  }
});

module.exports = MatchListHeader;

          // <Col id="match-stats-column" md={3} sm={3}><span className="matches-column-header">Mode</span></Col>
