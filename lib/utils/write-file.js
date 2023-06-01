const fs = require('fs');

function writeFile (fileName, data) {
  return fs.writeFileSync(fileName, data);
}

module.exports = writeFile;