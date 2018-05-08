/**
 * @file 播放器 UI loading pc 版
 * @author yuhui06
 * @date 2018/3/8
 */

import classnames from 'classnames';
import {Component} from 'larkplayer';

export default class LoadingPc extends Component {
    createEl() {
        return (
            <div className={classnames(
                'lark-loading',
                'lark-loading--pc',
                this.options.className)}
            >
                <div className="lark-loading-spinner"></div>
            </div>
        );
    }
}
