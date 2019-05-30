/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const Schema = require('mongoose').Schema;
const shortid = require('shortid');
const mongoose = require('mongoose');

var messageThreadSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate(),
  },
  board: String,
  text: String,
  created_on: {
    type: Date,
    default: new Date(),
  },
  bumped_on: {
    type: Date,
    default: new Date(),
  },
  reported: {
    type: Boolean,
    default: false,
  },
  delete_password: String,
  replies: [{
    _id: {
      type: String,
      default: shortid.generate(),
    },
    text: String,
    created_on: {
      type: Date,
      default: new Date(),
    },
    delete_password: String,
    reported: {
      type: Boolean,
      default: false,
    }
  }],
});

var messageBoard = mongoose.model('messagethread', messageThreadSchema);

module.exports = function (app) {

  app.route('/api/threads/:board')
    .post((req, res) => {
      console.log("board: " + req.body.board)
      console.log("text: " + req.body.text)
      console.log("password: " + req.body.delete_password)

      var thread = new messageBoard({        
        board: req.body.board,
        text: req.body.text,
        delete_password: req.body.delete_password
      });

      thread.save(function (err) {
        if (err) {
          return err
        } else {
          console.log("save worked")
        };
        // saved!
      });

      res.send("POST board is working")
    })

  app.route('/api/replies/:board');

};
