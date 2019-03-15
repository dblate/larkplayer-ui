/**
 * @file 触发自定义 CONTROLS_SHOW CONTROLS_HIDE 事件
 * @author yuhui06
 * @date 2019/3/15
 */

import {Plugin, util} from 'larkplayer';

import {ClassNames, Events, ACTIVE_DURATION} from './constants';

const {toTitleCase, featureDetector, includes} = util;

export default class ControlsEvent extends Plugin {
    constructor(player, options) {
        super(player, options);

        const eventsOnlyMobile = ['touchstart', 'touchend'];
        const eventsOnlyPc = ['mouseenter', 'mousemove', 'mouseleave'];
        const allEvents = ['play', 'pause', 'ended', ...eventsOnlyMobile, ...eventsOnlyPc];
        allEvents.forEach(eventName => {
            const callbackName = `handle${toTitleCase(eventName)}`;
            this[callbackName] = this[callbackName].bind(this);
            if (includes(eventsOnlyMobile, eventName)) {
                if (featureDetector.touch) {
                    this.player.on(eventName, this[callbackName]);
                }
            } else if (includes(eventsOnlyPc, eventName)) {
                if (!featureDetector.touch) {
                    this.player.on(eventName, this[callbackName]);
                }
            } else {
                this.player.on(eventName, this[callbackName]);
            }
        });
    }

    setTimeoutTriggerControlsHide() {
        this.timeoutHandler = setTimeout(() => {
            this.player.trigger(Events.CONTROLS_HIDE);
        }, ACTIVE_DURATION);
    }

    handlePlay() {
        clearTimeout(this.timeoutHandler);
        this.player.trigger(Events.CONTROLS_SHOW);
        this.setTimeoutTriggerControlsHide();
    }

    handleTouchstart() {
        clearTimeout(this.timeoutHandler);
    }

    handleTouchend() {
        clearTimeout(this.timeoutHandler);

        if (this.player.hasClass(ClassNames.ACTIVE)) {
            this.player.trigger(Events.CONTROLS_SHOW);
            this.setTimeoutTriggerControlsHide();
        } else if (!this.player.paused()) {
            this.player.trigger(Events.CONTROLS_HIDE);
        }
    }

    handleMouseenter() {
        clearTimeout(this.timeoutHandler);

        this.player.trigger(Events.CONTROLS_SHOW);
        this.setTimeoutTriggerControlsHide();
    }

    handleMousemove() {
        this.handleMouseenter();
    }

    handleMouseleave() {
        clearTimeout(this.timeoutHandler);
        if (!this.player.paused()) {
            this.player.trigger(Events.CONTROLS_HIDE);
        }
    }

    handlePause() {
        clearTimeout(this.timeoutHandler);
        this.player.trigger(Events.CONTROLS_SHOW);
    }

    handleEnded() {
        clearTimeout(this.timeoutHandler);
        this.player.trigger(Events.CONTROLS_SHOW);
    }
}
