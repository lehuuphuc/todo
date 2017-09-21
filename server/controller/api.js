'use strict';

let models = null;
module.exports = function (app) {
  models = app.models;
  app.get('/api/category/list', listCagetory);
  app.post('/api/category/add', addCategory);
  app.get('/api/todo/list', listTodo);
  app.post('/api/todo/add', addTodo);
};

function listCagetory (req, res, next) {
  models.Category.find({}, function (err, categories) {
    res.json(err ? null : categories);
  });
}

function addCategory (req, res, next) {
  models.Category.create(req.body, function (err, category) {
    res.json(err ? null : category);
  });
}

function listTodo (req, res, next) {
  let filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  models.Todo.find(filter, function (err, todos) {
    res.json(err ? null : todos);
  });
}

function addTodo (req, res, next) {
  models.Todo.create(req.body, function (err, todo) {
    res.json(err ? null : todo);
  });
}