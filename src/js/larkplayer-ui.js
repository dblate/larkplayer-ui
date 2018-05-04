/**
 * @file larkplayer custom style
 * @author yuhui06
 * @date 2018/5/4
 */

import larkplayer from 'larkplayer';
import document from 'global/document';

import ClassNameManager from './class-name-manager';
import ControlBar from './control-bar';
import Loading from './loading';
import PlayButton from './play-button';
import ProgressBarSimple from './progress-bar-simple';
import Complete from './complete';
import ControlBarPc from './control-bar-pc';
import LoadingPc from './loading-pc';
import NotSupport from './not-support';

const Component = larkplayer.Component;
const Plugin = larkplayer.Plugin;
const isMobile = 'ontouchend' in document;

Plugin.register(ClassNameManager, {name: 'classNameManager'});

if (isMobile) {
    Component.register(ControlBar, {name: 'controlBar'});
    Component.register(Loading, {name: 'loading'});
    Component.register(PlayButton, {name: 'playButton'});
    Component.register(ProgressBarSimple, {name: 'progressBarSimple'});
} else {
    Component.register(Complete, {name: 'complete'});
    Component.register(ControlBarPc, {name: 'controlBarPc'});
    Component.register(LoadingPc, {name: 'loadingPc'});
}

Component.register(NotSupport, {name: 'notSupport'});
