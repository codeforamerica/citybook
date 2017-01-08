import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import Header from './instructions/Header.react.js';
import HowItWorks from './instructions/HowItWorks.react.js';
import Footer from './instructions/Footer.react.js';

import Instruction from './instructions/Instruction.react.js';
import Step1 from './instructions/steps/Step1.react.js';
import Step2 from './instructions/steps/Step2.react.js';
import Steps3and4 from './instructions/steps/Step3.react.js';

export default class TopNav extends Component {
  render() {
    return (
      <div>
      <Header />
      <Grid>
        <HowItWorks />
        <Instruction id='instructions-start' number='1' title='Get the Template'>
          <Step1 />
        </Instruction>
        <Instruction number='2' title='Publish to the Web'>
          <Step2 />
        </Instruction>
        <Steps3and4 />
        <Footer />
      </Grid>
      </div>
    );
  }
}
