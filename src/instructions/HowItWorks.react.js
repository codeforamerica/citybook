import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import '../../styles/instructions.scss';

export default class HowItWorks extends Component {
  render() {
    return (
      <section className="how-it-works">
        <Row>
          <Col md={6} mdOffset={3}>
            <h2 id="how-it-works" className="text-center">How it works:</h2>
            <h3>No sign-up, no cost. Start building a contact list that your team will love in 2 minutes or less.</h3>
          </Col>
        </Row>
        <Row>
          <Col md={8} mdOffset={2}>
            <object type="image/svg+xml" className="img-responsive diagram" data="../../img/how-it-works.svg">
              <img src="../../img/how-it-works.png" alt="No SVG support"/>
            </object>
          </Col>
        </Row>
      </section>
    );
  }
}
