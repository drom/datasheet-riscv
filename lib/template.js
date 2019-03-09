'use strict';

module.exports = props => `<!DOCTYPE html>
<html>
  <head>
    <title>${props.title}</title>
${props.fonts || ''}
    <style>
${props.style}
    </style>
  </head>
  <body>
    <div class="container">
      <div id="spacer"></div>
      <div id="content">
${props.body}
      </div>
    </div>
    <script>
${props.script}
    </script>
  </body>
</html>
`;
