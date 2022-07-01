const pathModule = require('path');
const fs = require('fs/promises');
const chalk = require('chalk');

const defaultComponentContent = name => `<script setup lang="ts">

</script>

<template>
    <p>${name} works!</p>
</template>
`;
const defaultComponentSpecContent =
	name => `import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ${name} from './${name}.vue'

describe('${name}', () => {
  it('renders properly', () => {
    const wrapper = mount(${name})
    expect(wrapper.isVisible()).toBe(true)
  })
})
`;

const createComponent = async function (pathArg, specFile) {
	const foldersToCreate = pathArg.split('/');
	path = pathModule.join(__dirname, pathArg);

	const lastFolderUnformatted = foldersToCreate[foldersToCreate.length - 1];
	const lastFolder =
		lastFolderUnformatted[0].toUpperCase() +
		lastFolderUnformatted.substring(1, lastFolderUnformatted.length).replace('-', '_');
	foldersToCreate[foldersToCreate.length - 1] = lastFolder;

	const componentName = lastFolder;
	const componentFileName = lastFolder + '.vue';
	const componentSpecName = lastFolder + '.spec.ts';

	await fs.mkdir(path, { recursive: true });

	fs.writeFile(
		pathModule.join(path, componentFileName),
		defaultComponentContent(componentName),
		{ flag: 'a' }
	)
		.then(() =>console.log(chalk.greenBright(`✔ Created Vue component in ${foldersToCreate.join('/')}!`))) // prettier-ignore
		.catch(() =>console.log(chalk.red('𐄂 Something went wrong creating the component.'))); // prettier-ignore

	if (specFile)
		fs.writeFile(
			pathModule.join(path, componentSpecName),
			defaultComponentSpecContent(componentName),
			{ flag: 'a' }
		)
			.then(() =>console.log(chalk.greenBright(`✔ Created spec file in ${foldersToCreate.join('/')}!`))) // prettier-ignore
			.catch(() => console.log(chalk.red('𐄂 Something went wrong creating the spec file.'))); // prettier-ignore
};

module.exports = { createComponent };
