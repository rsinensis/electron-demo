const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const windows = require('../modules/windows');

const settings = require('../modules/settings');

const logger = require('../modules/logger').getLogger();

module.exports = (i18n) => {

    let menu = [{
            label: i18n.t('menu.file.label'),
            submenu: [{
                label: i18n.t('menu.file.exit'),
                role: 'quit'
            }]
        },
        {
            label: i18n.t('menu.lang.label'),
            submenu: [{
                    label: i18n.t('menu.lang.zh'),
                    type: 'radio',
                    checked: i18n.language === 'zh',
                    click() {
                        logger.debug("change langeuage to zh");
                        i18n.changeLanguage('zh');
                        settings.lang = 'zh'
                    }
                },
                {
                    label: i18n.t('menu.lang.en'),
                    type: 'radio',
                    checked: i18n.language === 'en',
                    click() {
                        logger.debug("change langeuage to en");
                        i18n.changeLanguage('en');
                        settings.lang = 'en'
                    }
                }
            ]
        },
        {
            label: i18n.t('menu.view.label'),
            submenu: [{
                    label: i18n.t('menu.view.minimize'),
                    role: 'minimize'
                },
                {
                    label: i18n.t('menu.view.fullscreen'),
                    role: 'togglefullscreen'
                }
            ]
        },
        {
            label: i18n.t('menu.help.label'),
            submenu: [{
                    label: i18n.t('menu.help.home'),
                    click() {
                        require('electron').shell.openExternal('https://github.com/rsinensis/electron-demo');
                    }
                },
                {
                    label: i18n.t('menu.help.about'),
                    click() {
                        windows.create('/view/about.html', 500, 210)
                    }
                }
            ]
        }
    ];

    return menu
}