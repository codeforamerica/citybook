import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../styles/instructions.scss';

export default class Footer extends Component {
  render() {
    return (
      <section className="page-footer">
        <p>CityBook is a project created by <a href="https://codeforamerica.org">Code for America</a>.</p>
      </section>
    );
  }
}
