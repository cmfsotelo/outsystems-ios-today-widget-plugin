var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'outsystems-ios-today-widget-plugin', 'coolMethod', [arg0]);
};
