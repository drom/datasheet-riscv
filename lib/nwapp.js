'use strict';

// const datasheet = require('datasheet');
const renderAll = require('./render-all');
// import 'highlight.js/styles/github.css';

window.matchMedia('print').addListener(e => {
  console.log('mql');
  console.log(e);
});

function nwPrint () {
  if (nw === undefined) {
    return;
  }

  // var dumpFileName = nw.path.resolve(process.env.PWD, 'vector.pdf');

  var win = nw.Window.get();

  // setTimeout(function () {
  win.print({
    pdf_path: 'page/vector.pdf', // nw.path.resolve(dumpFileName),
    scaleFactor: 100,
    headerFooterEnabled: false,
    // headerString: 'RISC-V',
    // footerString: '"V" Vector Extension'
  });
  setTimeout(function () {
    nw.process.exit(0);
  }, 500);
  // }, 3000);
}

document.addEventListener('DOMContentLoaded', event => {
  renderAll();
  nwPrint();
});

/* eslint-env browser */
