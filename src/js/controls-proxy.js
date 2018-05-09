/**
 * @file 代理 player.controls 方法
 * @author yuhui06
 * @date 2018/5/6
 */

import {Plugin} from 'larkplayer';

import ClassNames from './class-names';

export default class ControlsProxy extends Plugin {
    constructor(player, options) {
        super(player, options);
        
        this.controls = this.controls.bind(this);
        this.player.tech.el.removeAttribute('controls');
        this.player.controls = this.controls;
    }

    controls(showControls) {
        if (showControls !== undefined) {
            if (showControls) {
                this.player.removeClass(ClassNames.CONTROLS_HIDE);
            } else {
                this.player.addClass(ClassNames.CONTROLS_HIDE);
            }
        }

        return !this.player.hasClass(ClassNames.CONTROLS_HIDE);
    }
}