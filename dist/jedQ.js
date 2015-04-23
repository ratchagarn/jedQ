/*!
 * jedQ version 0.1.0
 * Copyright 2015-Preset
 * Author: Ratchagarn Naewbuntad
 * Licensed under MIT
 */
(function() {

'use strict';

// define global variale dynamic by context
var global = this;


/**
 * Base queue function
 * ------------------------------------------------------------
 * @name jedQ
 * @param {Function} function for call first
 * @return {Object} jedQ core instance
 */

function jedQ(cb) {
  return new jedQCore(cb);
}

// define curret version
jedQ.version = '0.2.0';


/**
 * Core queue function
 * ------------------------------------------------------------
 * @name jedQCore
 * @param {Function} function for call first
 */

function jedQCore(_callback) {
  this.stacks = [{
    _callback: _callback
  }];
}


/**
 * Stack callback function into queue
 * ------------------------------------------------------------
 * @name jedQ.then
 * @param {Function} callback function for add to queue
 * @return {Object} jedQCore object for chaining method
 */

jedQCore.prototype.then = function(callback) {
  // add to stack
  this.stacks.push({
    _callback: callback
  });

  return this;
};


/**
 * Execute all callback in queue
 * ------------------------------------------------------------
 * @name jedQ.done
 */

jedQCore.prototype.done = function() {

  var allStacks = this.stacks;

  /**
   * Create sub function for execute all callback function in queue
   * by recursive function
   * (this is `next` first argument of `then` method)
   * ------------------------------------------------------------
   * @name _resolveStack
   * @param {Any} data for pass to next queue
   */
  
  var _resolveStack = function(data) {

    // get first callback stack
    var stack = allStacks.shift();

    if (stack != null && typeof stack._callback === 'function') {
      // execute queue
      stack._callback(_resolveStack, data);
    }

    return _resolveStack;

  };
  _resolveStack();

};


/**
 * ------------------------------------------------------------
 * Assign to global scope
 * ------------------------------------------------------------
 */

// in browser `global` it must be `window` object
global.jedQ = jedQ;

}).call(this);