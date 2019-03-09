#!/usr/bin/env node

const util = require('util');
const stream = require('stream');
const fs = require('fs-extra');
const asciidoctor = require('asciidoctor.js');
const template = require('../lib/template.js')
const browserify = require('browserify');

const a = asciidoctor();
const b = browserify();

const fonts = `
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
`;

const style = `
body {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}
.note {
  font-size: 0.8em;
}

.icon {
  padding: 5px;
  color: #fff;
  border-right: 1px solid #aaa;
}
#toctitle {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
}

@media print {
  a {
    text-decoration-line: none;
    color: #000;
  }
  body {
    font-size: 20px;
  }
  @page {
    margin: 25mm;
  }
  h2 {
    page-break-before: always;
  }
}
`;
// `
// #spacer {
//   shape-outside: polygon(0 0, 800px 0, 800px 50px, 0 50px, 0 700px, 800px 700px, 800px 750px, 0 750px, 0 1500px, 800px 1500px, 800px 1550px, 0 1550px);
//   width: 800px;
//   height: 3200px;
//   float: left;
// }
// `;

const main = async () => {
  const abody = await fs.readFile('./riscv-v-spec/v-spec.adoc', 'utf8');
  const body = a.convert(abody);
  b.add('./src/app.js');
  b.bundle(function (err, script) {
    if (err) {
      throw new Error(err);
    }
    const doc = template({
      title: 'Vector',
      fonts: fonts,
      style: style,
      body: body,
      script: script
    });
    fs.writeFile('./page/index.html', doc);
  });
};

main();
