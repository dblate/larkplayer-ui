# larkplayer-ui

为 larkplayer 提供自定义样式

## 简介

* 组件化
* 支持 jsx 语法
* 自适应 pc 与移动端

## 截图

PC

<img src="./screenshots/larkplayer-pc" width="640" height="360" />

MOBILE

<img src="./screenshots/larkplayer-mobile" width="640" height="360" />

## 下载

NPM

```shell
npm install larkplayer-ui
```

CDN

```javascript
<link rel="stylesheet" href="https://unpkg.com/larkplayer-ui@latest/dist/larkplayer-ui.css" />
<script src="https://unpkg.com/larkplayer-ui@latest/dist/larkplayer-ui.js"></script>
```

## 使用

```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>larkplayer custom style</title>
    <link rel="stylesheet" href="https://unpkg.com/larkplayer-ui@latest/dist/larkplayer-ui.css" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no">
</head>
<body>
    <video id="video-el" src="https://baikebcs.bdimg.com/baike-other/big-buck-bunny.mp4"></video>

    <script src="https://unpkg.com/larkplayer@latest/dist/larkplayer.js"></script>
    <script src="https://unpkg.com/larkplayer-ui@latest/dist/larkplayer-ui.js"></script>

    <script type="text/javascript">
        var width = Math.min(document.body.clientWidth, 640);
        var player = larkplayer('video-el', {
            width: width,
            height: width * 9 / 16
        });
    </script>
</body>
</html>
```

## License

larkplayer-ui is [MIT licensed](./LICENSE)