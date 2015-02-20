jedQ
====

JavaScript Library for handle process queue for mitigate “Pyramid of Doom”


## VERSION 0.1.0


## Change log


### 0.1.0

- Init project.


### Example

```javascript

jedQ(function(next) {
    console.log('First call');
    next(1000); // first call use `next` function for go to next queue
  })
  // use `then` function for stack queue
  // and if not `async` you not to use next function to go next queue
  // `jedQ` automatic handle `sync` queue for you
  .then(function(data) {
    console.log('Queue 1,', 'Data from `first call` =>', data);
    return 2000; // send `data` to next queue
  })
  .then(function(next, data) {
    setTimeout(function() {
      console.log('Queue 2,', 'Data from `queue 1` =>', data);
      // `async` must use `next` function for go to next queue
      // and send `data` to next queue
      next(3000);
    }, 1000);
  }, true) // set `true` for tell this queue is `async`
  .then(function(data) {
    console.log('Queue 3,', 'Data from `queue 2` =>', data);
  })
  .done(); // use `done` function for execute all queue in stack

/*
  Output will be
  First call
  Queue 1, Data from `first call` => 1000
  Queue 2, Data from `queue 1` => 2000
  Queue 3, Data from `queue 2` => 3000
 */

```