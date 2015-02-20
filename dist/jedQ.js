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
jedQ.version = '0.1.0';


/**
 * Core queue function
 * ------------------------------------------------------------
 * @name jedQCore
 * @param {Function} function for call first
 */

function jedQCore(cb) {
  /*jshint validthis:true */  
  this.stacks = [{
    _type: 'async',
    _cb: cb
  }];
}


/**
 * Stack callback function into queue
 * ------------------------------------------------------------
 * @name jedQ.then
 * @param {Function} callback function for add to queue
 * @return {Object} jedQCore object for chaining method
 */

jedQCore.prototype.then = function(cb, is_async) {
  // check callback type
  var type = 'sync';
  if (is_async) { type = 'async'; }

  // add to stack
  this.stacks.push({
    _type: type,
    _cb: cb
  });

  return this;
};


/**
 * Execute all callback in queue
 * ------------------------------------------------------------
 * @name jedQ.done
 */

jedQCore.prototype.done = function() {

  var all_stacks = this.stacks;

  /**
   * Create sub function for execute all callback function in queue
   * by recursive function
   * ------------------------------------------------------------
   * @name _resolveStack
   * @param {Any} data for pass to next queue
   */
  
  var _resolveStack = function(data) {

    // get first callback stack
    var stack = all_stacks.shift();

    if (stack != null && typeof stack._cb === 'function') {

      // execute callback type `sync` and auto go to next queue
      if (stack._type === 'sync') {
        _resolveStack( stack._cb(data) );
      }
      // execute callback type `async` and send function for
      // manual go to next queue
      else if (stack._type === 'async') {
        stack._cb(_resolveStack, data);
      }

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