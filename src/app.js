'use strict';

// const datasheet = require('datasheet');
const hljs = require('highlight.js/lib/highlight');
const riscvasm = require('../lib/riscvasm.js');
const cpp = require('highlight.js/lib/languages/cpp.js');
const wavedrom = require('wavedrom');
// import 'highlight.js/styles/github.css';

hljs.registerLanguage('riscvasm', riscvasm);
hljs.registerLanguage('cpp', cpp);

window.matchMedia('print').addListener(e => {
  console.log('mql');
  console.log(e);
});

document.addEventListener('DOMContentLoaded', event => {
  document.querySelectorAll('pre code').forEach(block => {
    const lang = block.getAttribute('data-lang');
    if (lang === 'datasheet') {
      const source = eval('(' + block.innerHTML + ')');
      if (source.isa !== undefined) {
        const s = {
          reg: source.isa,
          config: {lanes: 1, hspace: ((980 - 8) >> 5) << 5}
        };
        const newNode = document.createElement('div');
        wavedrom.renderWaveElement(0, s, newNode, wavedrom.waveSkin.default);
        const parent = block.parentNode;
        const grandparent = parent.parentNode;
        grandparent.replaceChild(newNode, parent);
      }
    } else {
      hljs.highlightBlock(block);
    }
  });
});

console.log('app is up');
/* eslint-env browser */
