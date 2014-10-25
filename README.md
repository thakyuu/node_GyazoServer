node_GyazoServer
===============

Gyazo互換さーばっぽいの

##使い方

Require

node.js
`npm install formidable`

Settings

`cp ./config.js.default ./config.js`

`vi ./config.js`

Run

`node ./server.js`

gyazowin+とかからIP:port/uploadに投げるとデータを保存するよ！

http://IP:port/images/[md5].pngで画像を表示するよ！
