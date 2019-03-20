#!/usr/bin/env node
'use strict';

const bundler = require('../lib/bundler.js');

bundler('./lib/app.js', './page/index.html');
