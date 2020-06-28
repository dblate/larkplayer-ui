/**
 * @file ControlBarPc 播放器操作按钮
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/9
 */

import classnames from 'classnames';
import {Component} from 'larkplayer';

import ProgressBar from './progress-bar';
import CurrentTime from '../component/current-time';
import Duration from '../component/duration';
import PlayButton from '../component/play-button';
import FullscreenButton from '../component/fullscreen-button';
import GradientBottom from '../component/gradient-bottom';
import Volume from '../component/volume';

export default class ControlBarPc extends Component {
    reset() {
        this.children.forEach(child => {
            child && child.reset && child.reset();
        });
    }

    createEl() {
        return (
            <div className={classnames('lark-control-bar-pc', this.options.className)}>
                <GradientBottom />
                <ProgressBar className="lark-progress-bar-pc" />
                <div className="lark-control__left">
                    <PlayButton className="lark-play-button-pc" />
                    <Volume />
                    <div className="lark-time">
                        <CurrentTime />
                        <span className="lark-time-separator">/</span>
                        <Duration />
                    </div>
                </div>
                <div className="lark-control__right">
                    <FullscreenButton />
                </div>
            </div>
        );
    }
}
