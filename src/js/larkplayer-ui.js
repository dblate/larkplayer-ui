/**
 * @file larkplayer custom style
 * @author yuhui06
 * @date 2018/5/4
 */

import '../css/larkplayer-ui.less';
import {Component, Plugin, util} from 'larkplayer';

import ClassNameManager from './class-name-manager';
import ControlsProxy from './controls-proxy';
import ControlsEvent from './controls-event';
import ControlsMobile from './container/controls-mobile';
import ControlsPc from './container/controls-pc';

Plugin.register(ClassNameManager, {name: 'classNameManager'});
Plugin.register(ControlsProxy, {name: 'controlsProxy'});
Plugin.register(ControlsEvent, {name: 'controlsEvent'});

util.featureDetector.touch
? Component.register(ControlsMobile, {name: 'controlsMobile'})
: Component.register(ControlsPc, {name: 'controlsPc'});
