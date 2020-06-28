/**
 * @file playButton.js
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/7
 */

import classnames from 'classnames';
import {Component, DOM, Events, util} from 'larkplayer';

const featureDetector = util.featureDetector;

export default class PlayButton extends Component {
    constructor(player, options) {
        super(player, options);

        this.togglePlay = this.togglePlay.bind(this);

        // 注意 这里需要将 context（第二个参数） 设置为 this.el，因为这时 DOM 元素还没有插入到 document 里，所以在 document 里是查不到这个元素的
        this.playBtn = DOM.$('.lark-play-button__play', this.el);
        this.pauseBtn = DOM.$('.lark-play-button__pause', this.el);

        Events.on(this.playBtn, 'click', this.togglePlay);
        Events.on(this.pauseBtn, 'click', this.togglePlay);
    }

    togglePlay(event, isPlay) {
        if (this.player.paused()) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }

    dispose() {
        Events.off(this.playBtn, 'click', this.togglePlay);
        Events.off(this.pauseBtn, 'click', this.togglePlay);
        this.playBtn = null;
        this.pauseBtn = null;

        super.dispose();
    }

    createEl() {
        const mobileClassMap = {
            container: 'lark-play-button--mobile',
            btnPlay: 'lark-play-button__play',
            btnPause: 'lark-play-button__pause'
        };
        const pcClassMap = {
            container: 'lark-play-button-pc',
            btnPlay: 'lark-icon-play lark-play-button__play',
            btnPause: 'lark-icon-pause lark-play-button__pause'
        };
        const classMap = featureDetector.touch ? mobileClassMap : pcClassMap;
        return (
            <div className={classnames('lark-play-button', classMap.container)}>
                <div className={classMap.btnPlay} title="播放"></div>
                <div className={classMap.btnPause} title="暂停"></div>
            </div>
        );
    }
}
