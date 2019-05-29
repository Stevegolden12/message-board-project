/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

module.exports = function (app) {

  app.route('/api/threads/:board')
    .post((req, res) => {

      /*
      var thread = new messageThread({
        //Change the properties of the Schema and the data passed in it.
        size: 'small'
      });
      thread.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
      */
      res.send("POST board is working")
    })

  app.route('/api/replies/:board');

};
