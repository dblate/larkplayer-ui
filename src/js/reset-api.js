/**
 * @file 增加 player.reset 方法，重置 UI
 * @author yuhui06
 * @date 2019/5/9
 */

import {Plugin, DOM} from 'larkplayer';

import timeFormat from './util/time-format';

export default class ControlsProxy extends Plugin {
    constructor(player, options) {
        super(player, options);

        this.reset = this.reset.bind(this);
        this.player.reset = this.reset;
    }

    reset() {
        this.resetBufferBar();
        this.resetCurrentTime();
        this.resetDuration();
        this.resetProgressBar();
        this.resetProgressBarSimple();
    }

    resetBufferBar() {
        const lineEl = DOM.$('.lark-buffer-bar__line', this.player.el);
        lineEl.style.width = 0;
    }

    resetCurrentTime() {
        const timeEl = DOM.$('.lark-current-time', this.player.el);
        DOM.textContent(timeEl, timeFormat(0));
    }

    resetDuration() {
        const durationEl = DOM.$('.lark-duration', this.player.el);
        DOM.textContent(durationEl, '');
    }

    // TODO 验证 CSS 选择器
    resetProgressBar() {
        const lineEl = DOM.$('.lark-progress-bar .lark-progress-bar__line', this.player.el);
        lineEl.style.width = 0;
    }

    // TODO 验证 CSS 选择器
    resetProgressBarSimple() {
        const lineEl = DOM.$('.lark-progress-bar--simple .lark-progress-bar__line', this.player.el);
        lineEl.style.width = 0;
    }
}
