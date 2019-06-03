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
const fs = require('fs');


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
    .put((req, res) => {
      console.log("Check reported thread button")
      messageBoard.findOneAndUpdate(req.body.thread_id, { reported: true }, (err, docs) => {
        if (err) {
          console.log(err)
        } else {
          res.send("Thread has been reported")
        }
      })
    })

  app.route('/api/replies/:board')
    .post((req, res) => {

      messageBoard.findOneAndUpdate(req.body.thread_id, {
        $push: {
          replies: {
            text: req.body.text,
            delete_password: req.body.delete_password
          }
        }
      }, function (err, result) {

        if (err) {
          console.log(err)
        } else {
          res.send("comment is added")
        }

      })
    })

    .put((req, res) => {
      console.log("thread id: " + req.body.thread_id)
      console.log("reply id: " + req.body.reply_id)

     
      messageBoard.findOne({ _id: req.body.thread_id }, 
        function (err, result) {
          if (err) {
            console.log(err)
          } else {
            //console.log(result);
            let index = result.replies.map(function (x, i) {
              if (x._id === req.body.reply_id) {
                return i;
              }//end of if statement
            })//end of map 
            const lastNum = JSON.stringify(index).length - 1;
          
            const chkNum = JSON.stringify(index).substring(1, lastNum)
            const arrLoc = parseInt(chkNum.split(',').filter((x,i,a) => {
              return x !== 'null'
            }))
        
           console.log("chkNum: " + chkNum)    
           

            const fkIndex = 6
            let chnQuery = "replies." + arrLoc + "._id"
            let chnQuery1 = "replies." + arrLoc + ".reported"

             var query = {
              '_id': req.body.thread_id,
              [chnQuery]: req.body.reply_id
            }
        
            var event = {
              [chnQuery1]: true
            }
          
            console.log(query);
            console.log(event)

          
            messageBoard.findOneAndUpdate(query,    
              event,
              {new: true}, function (err, docs) {
              if (err) {
                console.log(err)
              } else {
                console.log('no error')
                console.log("DOCS: " + docs)
              }
              })
         
            /*
            result.replies.findOneAndUpdate({
             {
               i: {
                
               }
             },  
              function (err, docs) {
                console.log(docs)
              }             
       
            })
            */
          }//end of else   
        })//end of err, result funct   
        })//end of put route  

};
