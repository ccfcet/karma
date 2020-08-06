const path = require('path');
const fs = require('fs');
module.exports = {
  readFiles: (dir) => {
    const directoryPath = path.join(dir, '.');
    const filenames = fs.readdirSync(directoryPath);
    let outputFiles = filenames.map((filename) => {
      return filename.split('.')[0];
    });
    outputFiles = outputFiles.filter((filename) => filename !== 'index');
    return outputFiles;
  },
};
