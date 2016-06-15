'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');
var uuid = require('uuid');

router.post('/', function(req, res) {

    if(!req.body.link){
      return res.status(400).json({success: false, message: 'Link is required.'});
    }

    //If the spreadsheet already exists in the database, send its uuid, otherwise create a new one.
    models.BookReferences.findOne({ where: {google_spreadsheet_link: req.body.link}}).then(function(row){
      if(row){
        res.json(row.uuid);
      } else {
        var book_uuid = uuid.v4();
        models.BookReferences.create({
          google_spreadsheet_link: req.body.link,
          uuid: book_uuid,
          number_entries: 0,
          view_count: 0
        }).then(function(book) {
          res.json(book.uuid);
        });
      }
    });
});

router.get('/:uuid', function(req, res){
  var uuid = req.params.uuid;
  models.BookReferences.findOne({ where: {uuid: uuid}}).then(function(row){
    if(row){
      var counter = row.get('view_count');
      counter++;
      row.updateAttributes({
        'view_count': counter
      }).then(function(){
        res.json(row);
      });
    } else {
      res.status(404).json({success: false, message: 'Book not found.'});
    }
  });
});

module.exports = router;
