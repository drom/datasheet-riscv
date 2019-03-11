#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const asciidoctor = require('asciidoctor.js');
const browserify = require('browserify');

const template = require('../lib/template.js');
const style = require('../lib/style.js');

const a = asciidoctor();
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

const main = async () => {
  // const abody = await fs.readFile('./riscv-v-spec/v-spec.adoc', 'utf8');

  const highlightcss = await fs.readFile('./node_modules/highlight.js/styles/default.css', 'utf8');

  const dbody = a.loadFile('./riscv-v-spec/v-spec.adoc');
  // dbody.pushInclude('./riscv-v-spec/vmem-format.adoc');
  // console.log(dbody.getTitle(), dbody.getAuthor());
  const body = dbody.convert();
  b.add('./src/app.js');
  b.bundle(function (err, script) {
    if (err) {
      throw new Error(err);
    }
    const doc = template({
      title: 'Vector',
      fonts: fonts,
      style: style + highlightcss,
      front: getFront(dbody),
      body: body,
      script: script
    });
    fs.writeFile('./page/index.html', doc);
  });
};

main();
