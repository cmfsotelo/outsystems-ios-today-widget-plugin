// @ts-check
var path = require('path');
var Q = require('q');

module.exports = function (context) {
  var deferral = new Q.defer();
  var fs = require('fs')
  var file = path.join(context.opts.projectRoot, "build.json")
  console.log('Fixing build.json');

  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('build.json found, fixing it')
    var fileContent = JSON.parse(data);
    delete fileContent.ios.debug.provisioningProfile;
    delete fileContent.ios.release.provisioningProfile;

    fileContent.ios.debug.automaticProvisioning = true;
    fileContent.ios.release.automaticProvisioning = true;

    fs.writeFile(file,JSON.stringify(fileContent), 'utf8', function (err) {
      if (err) return console.log(err);
      console.log('build.json changed successfully')
      deferral.resolve();
    });
  });
  return deferral.promise;
};
