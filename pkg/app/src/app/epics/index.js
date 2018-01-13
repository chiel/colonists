import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/switchMap';

import { combineEpics } from 'redux-observable';

import { joinQueueEpic, openEpic } from './socket';

export default combineEpics(
	joinQueueEpic,
	openEpic,
);
