import React, { Component } from 'react';
import Scroll from 'react-scroll';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import '../../styles/instructions.scss';

const ScrollLink = Scroll.Link;
export default class Header extends Component {
  render() {
    return (
      <section className="page-header">
        <div className="container">
          <Row>
            <Col xs={12} sm={3}>
              <object type="image/svg+xml" className="img-responsive main-logo" data="../../img/CityBookLogo.svg">
                <img src="../../img/CityBookLogo.png" alt="CityBook Logo" />
              </object>
              <h1 className="project-name">CityBook</h1>
              <h2 className="project-tagline">Create a contact list from a Google Spreadsheet.</h2>
              <a href="#/books/6e45a6e5-d6b5-4b71-a6d8-16138f9b4ad2" target="_blank" className="btn btn-header btn-lg btn-block">Citybook Demo <Glyphicon glyph='new-window' /></a>
              <ScrollLink
                to="instructions-start"
                smooth={true}
                duration={500}
                id="get-started-button"
                className="btn btn-header btn-lg btn-block">Make a CityBook <Glyphicon glyph='flash' /></ScrollLink>
            </Col>
            <Col xsHidden smHidden sm={8} smOffset={1} className="iframe-container">
              <Col sm={6} smOffset={3}>
                <span className='demo-phone-camera'></span>
                <span className='demo-phone-speaker'></span>
                <iframe className='demo-iframe' src="https://www.citybook.io/#/books/6e45a6e5-d6b5-4b71-a6d8-16138f9b4ad2" width="100%" height="550px" frameBorder="0"></iframe>
                <span className='demo-iframe-bottom-line'></span>
              </Col>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}
