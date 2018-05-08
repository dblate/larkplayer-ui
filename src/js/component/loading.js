/**
 * @file 播放器 UI loading
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/9
 */


import classnames from 'classnames';
import {Component} from 'larkplayer';

export default class Loading extends Component {
    createEl() {
        return (
            <div className={classnames(
                'lark-loading',
                'lark-loading--mobile',
                this.options.className)}
            >
                <div className="lark-loading-cnt">
                    <span className="lark-loading-cnt__spinner lark-icon-loading"></span>
                    <span className="lark-loading-cnt__text">正在加载</span>
                </div>
            </div>
        );
    }
}