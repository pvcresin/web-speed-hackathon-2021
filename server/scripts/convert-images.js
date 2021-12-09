const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, '../../public/images/pictures');
const outputDir = path.resolve(__dirname, '../../public/images/pictures-small');

fs.readdir(dir, {}, function (err, files) {
  if (err) throw err;

  const filePaths = files
    .filter((filePath) => filePath.split('.').pop() === 'jpg')
    .map((file) => path.resolve(__dirname, '../../public/images/pictures', file));

  filePaths.forEach((filePath) => {
    console.log(filePath);
    execSync(`npx @squoosh/cli --avif auto ${filePath} --resize '{"width":600}' -d ${outputDir}`);
  });
});
