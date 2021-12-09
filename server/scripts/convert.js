const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, '../../public/images/profiles');
const outputDir = path.resolve(__dirname, '../../public/images/profiles-small');

fs.readdir(dir, function (err, files) {
  if (err) throw err;

  const filePaths = files.map((file) => path.resolve(__dirname, '../../public/images/profiles', file));

  filePaths.forEach((filePath) => {
    execSync(`npx @squoosh/cli --avif auto ${filePath} --resize '{"width":128,"height":128}' -d ${outputDir}`);
  });
});
