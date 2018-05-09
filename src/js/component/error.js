/**
 * @file error.js 播放器出错时显示
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/16
 */


import classnames from 'classnames';
import {Component} from 'larkplayer';

export default class Error extends Component {
    constructor(player, options) {
        super(player, options);

        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.player.on('error', this.handleError);
        this.on('click', this.handleClick);
    }

    handleError(event) {
        /* eslint-disable no-console */
        console.log(event, event.detail);
        /* eslint-enable no-console */
    }

    handleClick() {
        const src = this.player.src();
        this.player.reset();
        setTimeout(() => {
            this.player.src(src);
            this.player.play();
        }, 0);
    }

    dispose() {
        this.player.off('error', this.handleError);
        this.off('click', this.handleClick);

        super.dispose();
    }

    createEl() {
        return (
            <div className={classnames(
                'lark-error',
                'lark-error--mobile',
                this.options.className)}
            >
                <div className="lark-error-cnt">
                    <span className="lark-error-cnt__spinner lark-icon-loading"></span>
                    <span className="lark-error-cnt__text">加载失败，点击重试</span>
                </div>
            </div>
        );
    }
}



