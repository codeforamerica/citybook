import React, { Component } from 'react';
import Scroll from 'react-scroll';
import Grid from 'react-bootstrap/lib/Grid';

import Header from './instructions/Header.react.js';
import HowItWorks from './instructions/HowItWorks.react.js';
import Footer from './instructions/Footer.react.js';

import Instruction from './instructions/Instruction.react.js';
import Step1 from './instructions/steps/Step1.react.js';
import Step2 from './instructions/steps/Step2.react.js';
import Steps3and4 from './instructions/steps/Step3.react.js';

const Element = Scroll.Element;

export default class TopNav extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <HowItWorks />
          <Element name="instructions-start" className="element">
            <Instruction id='instructions-start' number='1' title='Get the Spreadsheet Template'>
              <Step1 />
            </Instruction>
          </Element>
          <Instruction number='2' title='Publish Your Spreadsheet to the Web'>
            <Step2 />
          </Instruction>
          <Steps3and4 />
          <Footer />
        </Grid>
      </div>
    );
  }
}
