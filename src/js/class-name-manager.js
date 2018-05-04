/**
 * @file 播放器各状态 className 管理
 * @author yuhui06
 * @date 2018/5/4
 */

import larkplayer from 'larkplayer';

import ClassNames from './class-names';
import toTitleCase from './utils/to-title-case';

const Plugin = larkplayer.Plugin;

export default class ClassNameManager extends Plugin {
    constructor(player, options) {
        super(player, options);

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

        this.activeTimeoutHandler = null;
        this.activeTimeout = 3000;
    }

    dispose() {
        this.events.forEach(event => {
            this.player.off(event, this[`handle${toTitleCase(event)}`]);
        });

        super.dispose();
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
        this.player.addClass('lark-has-started');

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


