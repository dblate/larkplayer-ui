/**
 * @file 音量 UI 组件
 * @author yuhui06
 * @date 2018/3/9
 * @date 2018/4/25 现在通过 js 修改音量也会触发 UI 改变（yuhui06）
 * @date 2020/6/28 优化音量图标样式
 */


import classnames from 'classnames';
/* eslint-disable no-unused-vars */
import {Component, Events, DOM} from 'larkplayer';
/* eslint-enable no-unused-vars */

import Slider from './slider';
import tooltip from './tooltip';


export default class Volume extends Slider {
    constructor(player, options) {
        super(player, options);

        this.volumeRecord = {
            last: 1,
            current: this.player.volume()
        };

        this.onSlideStart = this.onSlideStart.bind(this);
        this.onSlideMove = this.onSlideMove.bind(this);
        this.onSlideEnd = this.onSlideEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.update = this.update.bind(this);
        this.iconClick = this.iconClick.bind(this);
        this.handleIconMouseOver = this.handleIconMouseOver.bind(this);
        this.handleIconMouseOut = this.handleIconMouseOut.bind(this);
        this.switchStatus = this.switchStatus.bind(this);
        this.clearStatus = this.clearStatus.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);

        this.line = DOM.$('.lark-volume-line__line', this.el);
        this.ball = DOM.$('.lark-volume-line__ball', this.el);
        this.icon = DOM.$('.lark-volume-pc', this.el);

        Events.on(this.icon, 'click', this.iconClick);
        Events.on(this.icon, 'mouseover', this.handleIconMouseOver);
        Events.on(this.icon, 'mouseout', this.handleIconMouseOut);
        Events.on(this.line, 'click', this.handleClick);
        Events.on(this.ball, 'mousedown', this.handleSlideStart);
        Events.on(this.ball, 'touchstart', this.handleSlideStart);

        this.player.on('volumechange', this.handleVolumeChange);
        this.player.on('play', this.handleVolumeChange);
    }

    onSlideStart(event) {
        this.isSliding = true;
    }

    onSlideMove(event) {
        event.preventDefault();
        const pos = DOM.getPointerPosition(this.line, event);
        // this.update(pos.x);
        this.player.volume(pos.x);

        if (this.player.volume() !== 0) {
            this.player.muted(false);
        }
    }

    onSlideEnd(event) {
        this.isSliding = false;
        this.updateVolumeRecord();
    }

    updateVolumeRecord() {
        this.volumeRecord = {
            last: this.volumeRecord.current,
            current: this.player.volume()
        };
    }

    handleVolumeChange() {
        if (this.player.muted()) {
            this.update(0);
        } else {
            this.update(this.player.volume());
        }

        if (!this.isSliding) {
            this.updateVolumeRecord();
        }
    }

    onClick(event) {
        const pos = DOM.getPointerPosition(this.line, event);
        this.player.volume(pos.x);

        if (this.player.volume() !== 0) {
            this.player.muted(false);
        }
    }

    update(percent) {
        const lineWidth = this.line.offsetWidth;

        this.ball.style.left = percent * lineWidth + 'px';
        this.switchStatus(percent);
    }

    iconClick(event) {
        if (this.player.volume() && !this.player.muted()) {
            this.player.volume(0);
        } else {
            this.player.volume(this.volumeRecord.last || 1);
            this.player.muted(false);
        }

        this.showTooltip();
    }

    showTooltip() {
        tooltip.show({
            hostEl: this.icon,
            margin: 16,
            content: (this.player.volume() && !this.player.muted()) ? '静音' : '取消静音'
        });
    }

    handleIconMouseOver() {
        this.showTooltip();
    }

    handleIconMouseOut(event) {
        tooltip.hide();
    }

    switchStatus(volume) {
        this.clearStatus();

        let status;
        if (volume === 0) {
            status = 'muted';
        } else if (volume <= 0.6 && volume > 0) {
            status = 'small';
        } else if (volume > 0.6) {
            status = 'large';
        }

        DOM.addClass(this.icon, `lark-volume-pc--${status}`);
    }

    clearStatus() {
        const statusClass = ['lark-volume-pc--muted', 'lark-volume-pc--small', 'lark-volume-pc--large'];
        statusClass.forEach(className => {
            DOM.removeClass(this.icon, className);
        });
    }

    dispose() {
        Events.off(this.icon, 'click', this.iconClick);
        Events.off(this.icon, 'mouseover', this.handleIconMouseOver);
        Events.off(this.icon, 'mouseout', this.handleIconMouseOut);
        Events.off(this.line, 'click', this.handleClick);
        Events.off(this.ball, 'mousedown', this.handleSlideStart);
        Events.off(this.ball, 'touchstart', this.handleSlideStart);

        this.icon = null;
        this.line = null;
        this.ball = null;

        this.player.off('volumechange', this.handleVolumeChange);
        this.player.off('play', this.handleVolumeChange);

        super.dispose();
    }

    createEl() {
        return (
            <div className={classnames('lark-volume', this.options.className)}>
                <div className="lark-volume-pc lark-volume-pc--large"></div>
                <div className="lark-volume-line">
                    <div className="lark-volume-line__line">
                        <div className="lark-volume-line__line-padding"></div>
                    </div>
                    <div className="lark-volume-line__ball"></div>
                </div>
            </div>
        );
    }
}
