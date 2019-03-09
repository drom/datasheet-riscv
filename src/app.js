'use strict';

// const datasheet = require('datasheet');

window.matchMedia('print').addListener(e => {
  console.log('mql');
  console.log(e);
});

console.log('app is up');
