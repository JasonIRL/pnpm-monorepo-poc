const chalk = require('chalk');

const logo = `
${chalk.green('symplr')}
${chalk.red.bold('    ___    __    __    ______  __')}
${chalk.green.bold('   /   |  / /   / /   / __ \\ \\/ /')}
${chalk.yellow.bold('  / /| | / /   / /   / / / /\\  /')}
${chalk.blue.bold(' / ___ |/ /___/ /___/ /_/ / / / ')}
${chalk.magenta.bold('/_/  |_/_____/_____/_____/ /_/')}
`;

const sysInfo = `
Alloy CLI: v${require('../package.json').version}
Node: ${process.version}
OS: ${process.platform} ${process.arch}
`;

const helpInfo = `
${logo}
${sysInfo}
`;

module.exports = helpInfo;
