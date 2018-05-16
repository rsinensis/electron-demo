const electron = require('electron');
// import {
//     app
// } from 'electron';
const nunjucks = require('electron-nunjucks');
const isDev = require('electron-is-dev');

const lang = require('./lang');
const logger = require('./logger').getLogger();

class Template {

    get nunjucks() {
        return nunjucks
    }

    init() {

        logger.debug("Template init");

        nunjucks.install(electron.app, {
            path: '../view/',
            noCache: true,
            protocol: 'file',
            ext: ['.html', '.njk', '.nunjucks'],
            debug: isDev,
            filters: [{
                name: 'i18n',
                func: function (str) {
                    return lang.i18n.t(str);
                }
            }],
            globals: {
                'myglobal': 'Look ma! I\'m global!'
            }


        });

    }
}

module.exports = new Template();