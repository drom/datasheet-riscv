'use strict';

const fs = require('fs-extra');
const path = require('path');
const asciidoctor = require('asciidoctor.js');
const browserify = require('browserify');

const template = require('../lib/template.js');
const style = require('../lib/style.js');

const inliner = root => {
  const full = path.resolve(root);
  const dir = path.dirname(full);
  const body = fs.readFileSync(full, 'utf8');
  const res = body.replace(/\ninclude::(.+)\[\]\n/g, e => {
    const inFile = e.match(/\s*include::(.+)\[\]\n*/);
    return '\n\n' + inliner(path.resolve(dir, inFile[1])) + '\n\n';
  });
  return res;
};

const a = asciidoctor({
  platform: 'node',
  runtime: {
    ioModule: 'node'
  }
});
const b = browserify();

const fonts = [
  'Open+Sans',
  'IBM+Plex+Sans',
  'Roboto+Mono'
]
  .map(e => '<link href="https://fonts.googleapis.com/css?family=' + e + '" rel="stylesheet">')
  .join('\n');

const getFront = doc => `
<div class="ftitle">
<div class="ftitle1">${doc.getTitle()}</div>
<div class="ftitle2">${doc.getAuthor()}</div>
</div>
`;

const bundler = async (app, dst) => {

  const highlightcss = await fs.readFile('./node_modules/highlight.js/styles/default.css', 'utf8');
  const abody = inliner('riscv-v-spec/v-spec.adoc');
  const dbody = a.load(abody);
  const body = dbody.convert();

  b.add(app);
  b.bundle(function (err, script) {
    if (err) {
      throw new Error(err);
    }
    const doc = template({
      title: 'Vector',
      fonts: fonts,
      style: highlightcss + style,
      front: getFront(dbody),
      body: body,
      script: script
    });
    fs.outputFile(dst, doc);
  });
};

module.exports = bundler;
