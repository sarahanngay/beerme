'use strict';

var config = {
  url: process.env.MONGO_URL || 'mongodb://localhost/beerme'
};

module.exports = config;
