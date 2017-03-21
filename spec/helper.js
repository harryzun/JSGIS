var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'JSGIS.app', 'Contents', 'MacOS', 'JSGIS');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'JSGIS');
      default:
        throw 'Unsupported platform';
    }
  }
};
