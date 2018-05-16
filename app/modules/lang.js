// import isDev from 'electron-is-dev'
// import path from 'path'
// import i18next from 'i18next'
// import NodeFsBackend from 'i18next-node-fs-backend'
//import LanguageDetector from 'i18next-electron-language-detector'

const i18n = require('i18next');
//const i18nextBackend = require('i18next-node-fs-backend');
const path = require('path')
const isDev = require('electron-is-dev')

const logger = require('./logger').getLogger();
const settings = require('./settings')


const i18nextOptions = {
    debug: isDev,
    // backend: {
    //     // path where resources get loaded from
    //     loadPath: `${__dirname}/../lang/lang.{{lng}}.json`,

    //     // path to post missing resources
    //     addPath: `${__dirname}/../lang/lang.{{lng}}.missing.json`,

    //     // jsonIndent to use when storing json files
    //     jsonIndent: 4,
    // },
    resources: null,
    whitelist: ['zh', 'en'],
    lng: 'zh',
    //saveMissing: true,
    //preload: true,
    fallbackLng: 'zh'
};

const resources = {
    dev: {
        translation: require('../lang/lang.en.json')
    }
};

i18nextOptions.whitelist.forEach(lang => {
    resources[lang] = {
        translation: require(`../lang/lang.${lang}.json`)
    };
});

i18nextOptions.resources = resources

// initialize if not already initialized

class Lang {
    get i18n() {
        return i18n
    }

    init() {
        if (!i18n.isInitialized) {
            logger.debug("i18n init")
            //i18n.use(i18nextBackend);
            //i18n.use(LanguageDetector);
            i18n.init(i18nextOptions);
        }
    }
}


module.exports = new Lang();