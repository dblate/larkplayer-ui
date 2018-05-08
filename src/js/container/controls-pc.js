



import classnames from 'classnames';
import {Component, util} from 'larkplayer';

import ControlBarPc from './control-bar-pc';
import Complete from '../component/complete';
import LoadingPc from '../component/loading-pc';
import NotSupport from '../component/not-support';
import ErrorPc from '../component/error-pc';

export default class ControlsPc extends Component {
    createEl() {
        return (
            <div className={classnames(
                'lark-custom-controls',
                'lark-custom-controls--pc',
                this.options.className)}
            >
                <ControlBarPc />
                <LoadingPc />
                <ErrorPc />
                <Complete />
                <NotSupport />
            </div>
        );
    }
}