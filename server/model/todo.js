"use strict";

var mongoose = require('mongoose');

var collectionName = 'Todo';
var schema = mongoose.Schema({
  category: {
    type: mongoose.Schema.ObjectId
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now
  }
}, {
  collection: collectionName
});

schema.set('toObject', {virtuals: true, getters: true});
schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model(collectionName, schema);
