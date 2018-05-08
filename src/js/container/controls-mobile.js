



import classnames from 'classnames';
import {Component, util} from 'larkplayer';

import ControlBar from './control-bar';
import ProgressBarSimple from './progress-bar-simple';
import Loading from '../component/loading';
import PlayButton from '../component/play-button';
import NotSupport from '../component/not-support';
import Error from '../component/error';

export default class ControlsMobile extends Component {
    createEl() {
        return (
            <div className={classnames(
                'lark-custom-controls',
                'lark-custom-controls--mobile',
                this.options.className)}
            >
                <ControlBar />
                <PlayButton />
                <Loading />
                <Error />
                <ProgressBarSimple />
                <NotSupport />
            </div>
        );
    }
}