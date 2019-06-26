/**
 * @file larkplayer 移动端声音按钮
 * @author yuhui06@baidu.com
 * @date 2019/6/16
 */

import {Component, DOM} from 'larkplayer';

const MUTED_CLASS_NAME = 'lark-volume-mobile--muted';
const NORMAL_CLASS_NAME = 'lark-volume-mobile--normal';

export default class Volume extends Component {
    constructor(player, options) {
        super(player, options);

        this.handleClick = this.handleClick.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);

        this.on('click', this.handleClick);
        this.player.on('volumechange', this.handleVolumeChange);
        this.player.on('ready', this.handleVolumeChange);
    }

    handleVolumeChange() {
        DOM.removeClass(this.el, MUTED_CLASS_NAME);
        DOM.removeClass(this.el, NORMAL_CLASS_NAME);

        const isMuted = this.player.muted();
        const className = isMuted ? MUTED_CLASS_NAME : NORMAL_CLASS_NAME;
        DOM.addClass(this.el, className);
    }

    handleClick() {
        const isMuted = this.player.muted();
        this.player.muted(!isMuted);
    }

    createEl() {
        return (
            <div className="lark-volume-mobile"></div>
        );
    }
}

