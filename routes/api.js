/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const mongoose = require('mongoose');
var expect = require('chai').expect;
const Schema = require('mongoose').Schema;
const shortid = require('shortid');
const fs = require('fs')

const __dirnames = 'C:/Users/Steve/Documents/GitHub/message-board-project'

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
      //https://flaviocopes.com/pug/#interpolating-variables-in-pug
      res.render(__dirnames + '/views/board.pug', {title: 'TestingFORTOOLONG'});     
    })



    

  app.route('/api/replies/:board')
    .post((req, res) => {
      console.log("POST comment to thread: " + req.body.board)
      console.log("board: " + req.body.board)
      console.log("thread: " + req.body.thread_id)
      console.log("text: " + req.body.text)
      console.log("delete_password " + req.body.delete_password)

      /*
      var post = new messageBoard({
        replies[text]: ,
        replies[delete_password]: ,
      })

      //post.findByIdAndUpdate({
       
      //})
      */
      res.send("POST a comment")
    })

};
