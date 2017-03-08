import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { Link } from 'react-router';

export default class BookList extends Component {
  constructor(){
    super();
    this.state = {
      books: []
    }
    this.deleteStorage = this.deleteStorage.bind(this);
  }

  deleteStorage(){
    localStorage.clear();
    this.setState({
      books: []
    })
  }

  componentWillMount(){
    let books = [];
    for(var i=0, len=localStorage.length; i<len; i++) {
      let
        key = localStorage.key(i),
        value = localStorage[key];
      books.push([key, value]);
    }
    this.setState({
      books: books
    })
  }
  render() {
    let bookList = this.state.books.map(function(result, i){
      return (
        <ListGroupItem key={i}><a href={'/#/books/' + result[1]}>{result[0]}</a></ListGroupItem>
      )
    })
    return (
      <div>
        <h1 className="text-center">CityBook</h1>
        <Col lg={4} lgOffset={4}>
          <Panel header="My Contact Lists">
            <ListGroup fill>
              {bookList}
            </ListGroup>
          </Panel>
          <Button bsStyle="danger" onClick={this.deleteStorage} block>Clear Contact Lists</Button>
          <br/>
          <Link to='/'>
            <Button bsStyle="primary" block>Make Another CityBook</Button>
          </Link>
        </Col>
      </div>
    );
  }
}
