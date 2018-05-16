const log4js = require('log4js');

const electron = require('electron')
const app = electron.app

const isDev = require('electron-is-dev')

function getLogPath() {
    return app.getPath('userData') + '/all.log';
}

log4js.configure({
    appenders: {
        prod: {
            type: 'file',
            filename: getLogPath()
        },
        dev: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['dev'],
            level: 'debug'
        }
    }
});


exports.getLogger = function () {

    if (isDev) {
        return log4js.getLogger('dev')
    }

    return log4js.getLogger('prod')
}