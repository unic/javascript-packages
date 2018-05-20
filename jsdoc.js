/* eslint-disable import/no-extraneous-dependencies */
const jsdoc2md = require('jsdoc-to-markdown');
const glob = require('glob');
const fs = require('fs');

glob.sync('./packages/*/src/**/*.js').forEach(file => {
  if (file.match(/\.test\./)) {
    return;
  }

  const packagename = file.split('/')[2];
  const path = `./packages/${packagename}/.README.md`;

  if (fs.existsSync(path)) {
    const docs = jsdoc2md.renderSync({ files: file, separators: true });
    const readme = fs.readFileSync(`./packages/${packagename}/.README.md`);
    const contents = readme.toString().replace('{{API}}', docs);

    fs.writeFile(
      `./packages/${packagename}/README.md`,
      contents,
      { flag: 'w', encoding: 'utf8' },
      err => {
        if (err) throw err;
      },
    );
  }
});
