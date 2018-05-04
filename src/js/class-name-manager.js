/**
 * @file 播放器各状态 className 管理
 * @author yuhui06
 * @date 2018/5/4
 */

import {Plugin, DOM} from 'larkplayer';

import ClassNames from './class-names';
import toTitleCase from './utils/to-title-case';
import featureDetector from './utils/feature-detector';

export default class ClassNameManager extends Plugin {
    constructor(player, options) {
        super(player, options);

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.activeTimeoutHandler = null;
        this.activeTimeout = 3000;
        this.events = [
            'loadstart',
            'canplay',
            'canplaythrough',
            'error',
            'playing',
            'waiting',
            'seeking',
            'seeked',
            'ended',
            'play',
            'pause'
        ];

        this.events.forEach(event => {
            const callbackName = `handle${toTitleCase(event)}`;
            this[callbackName] = this[callbackName].bind(this);
            this.player.on(event, this[callbackName]);
        });

        if (featureDetector.touch) {
            this.player.on('touchstart', this.handleTouchStart);
            this.player.on('touchend', this.handleTouchEnd);
        } else {
            this.player.on('mouseenter', this.handleMouseEnter);
            this.player.on('mousemove', this.handleMouseMove);
            this.player.on('mouseleave', this.handleMouseLeave);
        }
    }

    dispose() {
        if (featureDetector.touch) {
            this.player.off('touchstart', this.handleTouchStart);
            this.player.off('touchend', this.handleTouchEnd);
        } else {
            this.player.off('mouseenter', this.handleMouseEnter);
            this.player.off('mousemove', this.handleMouseMove);
            this.player.off('mouseleave', this.handleMouseLeave);
        }
        this.events.forEach(event => {
            this.player.off(event, this[`handle${toTitleCase(event)}`]);
        });

        super.dispose();
    }

    handleTouchStart(event) {
        // 当控制条显示并且手指放在控制条上时
        if (this.player.hasClass(ClassNames.ACTIVE)) {
            if (DOM.parent(event.target, 'lark-play-button')
                || DOM.parent(event.target, 'lark-control-bar')) {

                clearTimeout(this.activeTimeoutHandler);
            }
        }
    }

    handleTouchEnd(event) {
        clearTimeout(this.activeTimeoutHandler);

        // 点在播放按钮或者控制条上，（继续）展现控制条
        let clickOnControls = false;
        // @todo 处理得不够优雅
        if (DOM.parent(event.target, 'lark-play-button')
            || DOM.parent(event.target, 'lark-control-bar')) {

            clickOnControls = true;
        }

        if (!clickOnControls) {
            this.player.toggleClass(ClassNames.ACTIVE);
        }

        if (this.player.hasClass(ClassNames.ACTIVE)) {
            this.activeTimeoutHandler = setTimeout(() => {
                this.player.removeClass(ClassNames.ACTIVE);
            }, this.activeTimeout);
        }
    }

    handleMouseEnter(event) {
        clearTimeout(this.activeTimeoutHandler);

        if (!this.player.hasClass(ClassNames.ACTIVE)) {
            this.player.addClass(ClassNames.ACTIVE);
        }

        this.activeTimeoutHandler = setTimeout(() => {
            this.player.removeClass(ClassNames.ACTIVE);
        }, this.activeTimeout);
    }

    handleMouseMove(event) {
        this.handleMouseEnter(event);
    }

    handleMouseLeave(event) {
        clearTimeout(this.activeTimeoutHandler);
        this.player.removeClass(ClassNames.ACTIVE);
    }

    /**
     * 处理 loadstart 事件
     *
     * @private
     * @fires Player#loadstart
     * @listens Html5#loadstart
     * @see https://html.spec.whatwg.org/#mediaevents
     */
    handleLoadstart() {
        this.player.addClass(ClassNames.LOADSTART);
    }

    /**
     * 处理 play 事件
     *
     * @private
     * @fires Player#play
     * @see https://html.spec.whatwg.org/#mediaevents
     */
    handlePlay() {
        // @todo player.removeClass 支持一次 remove 多个 class
        this.player.removeClass(ClassNames.LOADSTART);
        this.player.removeClass(ClassNames.ENDED);
        this.player.removeClass(ClassNames.PAUSED);
        this.player.removeClass(ClassNames.ERROR);
        this.player.removeClass(ClassNames.SEEKING);
        this.player.removeClass(ClassNames.WAITING);
        this.player.addClass(ClassNames.PLAYING);

        clearTimeout(this.activeTimeoutHandler);
        this.player.addClass(ClassNames.ACTIVE);
        this.activeTimeoutHandler = setTimeout(() => {
            this.player.removeClass(ClassNames.ACTIVE);
        }, this.activeTimeout);
    }

    /**
     * 处理 waiting 事件
     *
     * @private
     * @fires Player#waiting
     * @see https://html.spec.whatwg.org/#mediaevents
     */
    handleWaiting() {
        this.player.addClass(ClassNames.WAITING);
    }

    /**
     * 处理 canplay 事件
     *
     * @private
     * @fires Player#canplay
     */
    handleCanplay() {
        this.player.removeClass(ClassNames.WAITING);
        this.player.removeClass(ClassNames.LOADSTART);

        if (this.player.paused()) {
            this.player.removeClass(ClassNames.PLAYING);
            this.player.addClass(ClassNames.PAUSED);
        }
    }

    /**
     * 处理 canplaythrough 事件
     *
     * @private
     * @fires Player#canplaythrough
     */
    handleCanplaythrough() {
        this.player.removeClass(ClassNames.WAITING);
    }

    /**
     * 处理 playing 事件
     *
     * @private
     * @fires Player#playing
     */
    handlePlaying() {
        this.player.removeClass(ClassNames.WAITING);
        this.player.removeClass(ClassNames.LOADSTART);
    }

    /**
     * 处理 seeking 事件
     *
     * @private
     * @fires Player#seeking
     */
    handleSeeking() {
        this.player.addClass(ClassNames.SEEKING);
    }

    /**
     * 处理 seeked 事件
     *
     * @private
     * @fires Player#seeked
     */
    handleSeeked() {
        this.player.removeClass(ClassNames.SEEKING);
        this.player.removeClass(ClassNames.WAITING);
    }

    /**
     * 处理自定义的 firstplay 事件
     * 该事件与 play 事件的不同之处在于 firstplay 只会在第一次播放时触发一次
     *
     * @private
     * @fires Player#firstplay
     */
    handleFirstplay() {
        // @todo 不清楚有什么用
        this.player.addClass(ClassNames.HAS_START);

        clearTimeout(this.activeTimeoutHandler);
        this.player.addClass(ClassNames.ACTIVE);
        this.activeTimeoutHandler = setTimeout(() => {
            this.player.removeClass(ClassNames.ACTIVE);
        }, this.activeTimeout);
    }

    /**
     * 处理 pause 事件
     *
     * @private
     * @fires Player#pause
     */
    handlePause() {
        this.player.removeClass(ClassNames.PLAYING);
        this.player.addClass(ClassNames.PAUSED);
    }

    /**
     * 处理 ended 事件
     *
     * @private
     * @fires Player#ended
     */
    handleEnded() {
        this.player.addClass(ClassNames.ENDED);
    }

    /**
     * 处理 error 事件
     *
     * @fires Player#error
     * @private
     */
    handleError() {
        this.player.removeClass(ClassNames.PLAYING);
        this.player.removeClass(ClassNames.SEEKING);
        this.player.addClass(ClassNames.ERROR);
    }
}


