import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <section className="page-header">
        <Row>
          <Col xs={4} xsOffset={4} sm={2} smOffset={5}>
            <object type="image/svg+xml" className="img-responsive diagram" data="">
              <img src="" alt="No SVG support" />
            </object>
          </Col>
        </Row>
        <h1 className="project-name">CityBook</h1>
        <h2 className="project-tagline">Tagline</h2>
        <a id="get-started-button" className="btn btn-header btn-lg">Get Started</a>
        <a href="/books/key=18YIZlfxxlffHVytbR8zY1cvmKShGOK3z_Cf9JYow4pg&title=CityBook" target="_blank" className="btn btn-header btn-lg">Demo</a>
      </section>
    );
  }
}
