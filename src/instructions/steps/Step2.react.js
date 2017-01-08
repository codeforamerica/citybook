import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../../../styles/instructions.scss';

export default class Step2 extends Component {
  render(){
    return(
      <Row>
        <Col md={4}>
          <p>Under the File menu in your spreadsheet, select “Publish to the Web.”</p>
          <img className="img-responsive" src="../../img/publish_to_web_small-1.png" />
        </Col>
        <Col md={4}>
          <p>In the next window, click the blue "publish" button. When asked, "Are you sure…?" click OK.</p>
          <img className="img-responsive" src="../../img/publish_to_web_button_small.png" />
        </Col>
        <Col md={4}>
          <p>Now, copy the URL that appears in the center of the window. You'll use this in the next step.</p>
          <img className="img-responsive" src="../../img/publish_to_web_url_small.png" />
        </Col>
      </Row>
    )
  }
}
