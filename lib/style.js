'use strict';

module.exports = `
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #eee;
}
pre {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  display: block;
  padding: 10px 0px 10px 0px;
}
body {
  font-size: 16px;
  /* font-family: 'Open Sans', sans-serif; */
  font-family: 'IBM Plex Sans', sans-serif;
}
.note {
  font-size: 0.8em;
}
.icon {
  transform: rotate(270deg);
  font-size: 0.8em;
  padding: 5px;
  color: #fff;
}
#toctitle {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
}
.ftitle {
  margin: 4em;
}
.ftitle1 {
  margin: 2em;
  font-size: 2em;
}
.ftitle2 {
  margin: 2em;
  font-size: 1.5em;
}

table {
  width: 100%;
  max-width: 100%;
}

.tableblock td {
  border-top: 1px solid #dee2e6;
  padding: 0.3rem;
}

.tableblock {
  margin: 0px;
}

.halign-left {
  text-align: left;
}

@media screen {
  .container {
    max-width: 968px;
    margin: 0 auto;
  }
}

@media print {
  a {
    text-decoration-line: none;
    color: #000;
  }
  body {
    font-size: 20px;
  }

  h1 {
    string-set: header content();
  }

  @page {
    @top-center { content: "top-center"; border: solid green; }
    @bottom-center { content: "bottom-center"; border: solid green; }
  }
  @page {
    margin-top: 15mm;
    margin-bottom: 15mm;
    border: solid green;
  }
  @page :left {
    margin-left: 25mm;
    margin-right: 15mm;
  }
  @page :right {
    margin-left: 15mm;
    margin-right: 25mm;
  }
  @page :first {
    margin-left: 20mm;
    margin-right: 20mm;
  }

  h2 {
    break-before: page;
    page-break-before: page;
  }
  h2, h3, h4, h5 {
    break-after: avoid-page;
    page-break-after: avoid-page;
  }
  pre {
    font-size: 18px;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .listingblock {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .note, p {
    text-align: justify;
    hyphens: auto;
  }
  .ftitle {
    text-align: center;
    margin-top: 50%;
    break-after: always;
    page-break-after: always;
  }
  .note {
    break-inside: avoid;
    page-break-inside: avoid;
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
