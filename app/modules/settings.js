const Store = require('electron-store');

const electron = require('electron')
const app = electron.app

const store = new Store();
const logger = require('./logger').getLogger();

let instance = null;

class Settings {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    get store() {
        return store;
    }

    get lang() {
        return store.get('lang') || 'zh';
    }

    set lang(value) {
        return store.set('lang', value);
    }

    get position() {
        return store.get('position');
    }

    set position(value) {
        return store.set('position', value);
    }

    get size() {
        return store.get('size');
    }

    set size(value) {
        return store.set('size', value);
    }

    get appPath() {
        return store.get('appPath');;
    }

    set appPath(value) {
        return store.set('appPath', value);
    }

    get appDataPath() {
        return store.get('appData');
    }

    set appDataPath(value) {
        return store.set('appData', value);
    }

    get HomePath() {
        return store.get('home');
    }

    set HomePath(value) {
        return store.set('home', value);
    }

    get userDataPath() {
        return store.get('userData');
    }

    set userDataPath(value) {
        return store.set('userData', value);
    }


    init() {
        logger.debug("setting init")

        this.appPath = app.getAppPath();
        this.appDataPath = app.getPath('appData');
        this.HomePath = app.getPath('home');
        this.userDataPath = app.getPath('userData');
    }

}

module.exports = new Settings();