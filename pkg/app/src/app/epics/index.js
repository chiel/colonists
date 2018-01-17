import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { combineEpics } from 'redux-observable';

import { queueJoinEpic, queueReadyEpic } from './queue';
import { openEpic } from './socket';

export default combineEpics(
	queueJoinEpic,
	queueReadyEpic,
	openEpic,
);
