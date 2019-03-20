#!/usr/bin/env node
'use strict';

const bundler = require('../lib/bundler.js');

bundler('./lib/nwapp.js', './nwapp/index.html');
