'use strict';
const co = require('co');
const phantom = require('phantom');

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
            const status = yield page.open(array[i].url);
            console.log(status);
            yield page.render(array[i].path);
            console.log(array[i].path);
        } catch (e) {
            console.log('Error found: ' + e.message);
        }
    }
    instance.exit();
});

//TODO URLリスト外部ファイル化
       //GETだけ?POST?cookie...?
//TODO ファイル名自動生成
//TODO キャプチャサイズ指定
       //レスポンシブの場合は同一URLに対してサイズが複数存在する
       //タイトルバー(HPタイトル)がキャプチャされない--> タイトルを取得する?
       //UserAgent?

// 例外について考える
//  URLが不正-->事前チェック or エラー表示
//  アクセス先が応答なし。404。500など。-->再実行するか求める or エラー表示

// https://liginc.co.jp/198683