/**
 * @file error.js 播放器出错时显示
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/16
 */


import classnames from 'classnames';
import {Component, DOM} from 'larkplayer';

export default class Error extends Component {
    constructor(player, options) {
        super(player, options);

        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.textEl = DOM.$('.lark-error-cnt__text', this.el);

        this.player.on('error', this.handleError);
        this.on('click', this.handleClick);
    }

    handleError(event) {
        /* eslint-disable no-console */
        console.log(event, event.detail);
        /* eslint-enable no-console */

        const error = this.player.tech.el.error;
        const defaultText = '加载失败，点击重试';
        let text;
        switch (parseInt(error.code, 10)) {
            // MEDIA_ERR_ABORTED
            case 1:
                text = `${defaultText}(ERR_ABORTED)`;
                break;
            // MEDIA_ERR_NETWORK
            case 2:
                text = `${defaultText}(ERR_NETWORK)`;
                break;
            // MEDIA_ERR_DECODE
            case 3:
                text = `${defaultText}(ERR_DECODE)`;
                break;
            // MEDIA_ERR_SRC_NOT_SUPPORTED
            case 4:
                text = `${defaultText}(ERR_SRC)`;
                break;
            default:
                text = defaultText;
        }

        DOM.replaceContent(this.textEl, text);
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
        this.textEl = null;

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



