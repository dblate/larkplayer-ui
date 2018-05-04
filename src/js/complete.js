/**
 * @file 播放完成样式
 * @author yuhui06
 * @date 2018/4/17
 */


import classnames from 'classnames';
import {Component} from 'larkplayer';

export default class Complete extends Component {
    createEl() {
        return (
            <div className={classnames('lark-complete', this.options.className)}>
                <div className="lark-complete__replay lark-icon-replay"></div>
            </div>
        );
    }
}