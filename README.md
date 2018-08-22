# larkplayer-ui

为 [larkplayer](https://github.com/dblate/larkplayer) 提供自定义样式

* 组件化
* 支持 jsx 语法
* 自适应 pc 与移动端

*注意：此插件会修改 controls 方法：*

* *修改前：player.controls() 返回或控制 video 标签的 controls 属性*
* *修改后：player.controls() 返回或控制当前自定义样式是否展示。video 标签上的 controls 属性会被移除*

## 截图

PC

<img src="./screenshots/larkplayer-pc.png" width="640" height="360" />

MOBILE

<img src="./screenshots/larkplayer-mobile.png" width="640" height="360" />

## 下载

NPM

```shell
npm install larkplayer-ui
```

CDN

```javascript
<script src="https://unpkg.com/larkplayer-ui@latest/dist/larkplayer-ui.js"></script>
```

## 使用


#### script

```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>larkplayer custom style</title>
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

#### 模块化

```javascript
import larkplayer from 'larkplayer';
import 'larkplayer-ui';

const player = larkplayer('video-el-id');
```

## License

larkplayer-ui is [MIT licensed](./LICENSE)
