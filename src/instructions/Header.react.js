import React, { Component } from 'react';
import { Row, Col, Glyphicon, Container } from 'react-bootstrap';
import '../../styles/instructions.scss';
import { Link } from 'react-router';
export default class Header extends Component {
  render() {
    return (
      <section className="page-header">
        <div className="container">
          <Row>
            <Col xs={12} sm={3}>
              <object type="image/svg+xml" className="img-responsive main-logo" data="../../img/CityBookLogo.svg">
                <img src="../../img/CityBookLogo.png" alt="No SVG support" />
              </object>
              <h1 className="project-name">CityBook</h1>
              <h2 className="project-tagline">Create a contact list from a Google Spreadsheet.</h2>
              <a id="get-started-button" href="#/books/6e45a6e5-d6b5-4b71-a6d8-16138f9b4ad2" target="_blank" className="btn btn-header btn-lg btn-block" block>Citybook Demo <Glyphicon glyph='new-window' /></a>
              <a id="get-started-button" href="/#instructions-start" className="btn btn-header btn-lg btn-block" block>Make a CityBook <Glyphicon glyph='flash' /></a>
            </Col>
            <Col xsHidden smHidden xs={12} sm={8} smOffset={1}>
              <span className='demo-iframe-button red'></span>
              <span className='demo-iframe-button yellow'></span>
              <span className='demo-iframe-button green'></span>
              <iframe className='demo-iframe' src="https://www.citybook.io/#/books/6e45a6e5-d6b5-4b71-a6d8-16138f9b4ad2" width="100%" height="500px" frameBorder="0"></iframe>
              <span className='demo-iframe-bottom-line'></span>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}
