'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ShowPiece = require('./../models/ShowPiece.js');

/**
 * Create a ShowPiece
 */
exports.create = function(req, res) {
  var showPiece = new ShowPiece(req.body);
  showPiece.save(function(err, data) {
    if (err) {
      res.status(501).send();
    } else {
      res.status(200).send(data);
    }
  });
}


/**
 * Update a showpiece
 */
exports.update = function(req, res) {
  //implement update




};

/**
 * Delete a showpiece
 */
exports.delete = function(req, res) {
  ShowPiece.find({
      _id: req.params.id
    })
    .remove(function() {
      res.status(202)
        .send();
    });
};

/**
 * List of Showpieces
 */
exports.list = function(req, res) {
  ShowPiece.find(function(error, doc) {
    res.send(doc);
  })
};

/**
 * ShowPiece get by id
 */
exports.read = function(req, res) {
  ShowPiece.find({
    _id: req.params.id
  }, function(error, doc) {
    if (error) {
      return res.status(404).send();
    }

    res.status(200)
      .send(doc);
  })
};
