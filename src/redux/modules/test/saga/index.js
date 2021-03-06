import { delay, call, put, takeEvery, select, take, fork, cancel, cancelled} from 'redux-saga/effects'
import http from '../../../../utils/axios'
import {actions} from "./../action"
import {types} from './../types'
import api from "./../api"
import {Toast} from 'antd-mobile'
export function* requestTest() {
    while(true){
        const action = yield take(types.FETCH_TEST_REQUEST);
        Toast.loading('正在加载', 0);
        const result = yield call(http.post, api.getTest, action.payload);
        if (result.status === 'succ') {
            yield delay(1000);
            Toast.hide();
            Toast.success('加载成功', 2);
        } else {
            yield delay(1000);
            Toast.hide();
            Toast.fail(result.msg, 3);
        }
        yield put({type: types.FETCH_TEST_FAILURE, result});
    }
}

