'use strict';
const co = require('co');
const phantom = require('phantom');

function capture(page, url, path) {
    return co(function*() {
        try {
            const status = yield page.open(url);
            console.log(status);
            yield page.render(path);
            console.log(path);
        } catch (e) {
            console.log('Error found: ' + e.message);
        }
    });
}

const array = [
    {
        url: 'http://www.yahoo.co.jp',
        path: 'yahoo.png'
    },
    {
        url: 'http://www.google.co.jp',
        path: 'google.png'
    },
    {
        url: 'http://www.youtube.com',
        path: 'youtube.png'
    }
];
co(function *() {
    const instance = yield phantom.create();
    const page = yield instance.createPage();
    for (var i = 0; i < array.length; i++) {
        try {
            yield capture(page, array[i].url, array[i].path);
        } catch(e) {
            console.log(e);
        }
    }
    instance.exit();
});
