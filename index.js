#!/usr/bin/env node

/**
 * vue-scaffold
 * scaffolds vue components
 *
 * @author Floyd Haremsa <none>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const { createComponent } = require('./create-component');

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	createComponent(input[0], flags.spec);

	debug && log(flags);
})();
