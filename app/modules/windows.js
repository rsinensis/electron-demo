const path = require('path')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const settings = require('./settings');
const logger = require('./logger').getLogger();

const HashMap = require('hashmap');

const windowsMap = new HashMap();

class Windows {

    create(name, w, h) {

        var findWin = get(name);

        if (findWin != undefined) {
            logger.debug("find windows:", name)
            findWin.focus();
            return
        }

        logger.debug("create windows:", name)

        const modalPath = path.join('file://', settings.appPath, 'app', name);

        //Menu.setApplicationMenu();
        let win = new BrowserWindow({
            width: w,
            height: h
        });

        set(name, win)

        win.setMenu(null);

        win.on('close', function () {
            logger.debug("del windows:", name)
            del(name)
            win = null;
        });

        win.loadURL(modalPath);

        win.show();
    }

}

function get(name) {
    return windowsMap.get(name);
}

function set(name, win) {
    windowsMap.set(name, win);
}

function del(name) {
    windowsMap.delete(name);
}


module.exports = new Windows();