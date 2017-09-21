"use strict";

var mongoose = require('mongoose');

var collectionName = 'Category';
var schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  collection: collectionName
});

schema.set('toObject', {virtuals: true, getters: true});
schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model(collectionName, schema);
