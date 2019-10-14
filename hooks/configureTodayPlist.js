var fs = require('fs');
var path = require('path');
var plist = require('plist');

function getCordovaParameter(variableName, contents) {

    var variable;
    if(process.argv.join("|").indexOf(variableName + "=") > -1) {
      var re = new RegExp(variableName + '=(.*?)(\||$))', 'g');
      variable = process.argv.join("|").match(re)[1];
    } else {
      variable = getPreferenceValue(contents, variableName);
    }
    return variable;
}

function getPreferenceValue (config, name) {
    var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"));
    if(value && value[1]) {
      return value[1];
    } else {
      return null;
    }
  }
  
module.exports = function (context) {

    var contents = fs.readFileSync(
        path.join(context.opts.projectRoot, 'config.xml'),
        'utf-8'
    );

    var iosFolder = context.opts.cordova.project
    ? context.opts.cordova.project.root
    : path.join(context.opts.projectRoot, 'platforms/ios/');

    var todayPlistPath = path.join(iosFolder, "CordovaToday", 'Info.plist');

    var xml = fs.readFileSync(todayPlistPath, 'utf8');
    var obj = plist.parse(xml);

    obj.WebViewUrl =  getCordovaParameter("WEBVIEW_URL",contents);

    xml = plist.build(obj);
    fs.writeFileSync(todayPlistPath, xml, { encoding: 'utf8' });
}

