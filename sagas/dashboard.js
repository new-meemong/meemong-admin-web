import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  USER_COUNT_FAILURE,
  USER_COUNT_REQUEST,
  USER_COUNT_SUCCESS,
} from "@/reducers/dashboard";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userCountAPI(data) {
  return await axios.get(`/un/count`, data);
}

function* userCount(action) {
  try {
    const result = yield call(userCountAPI, action.data);
    yield put({
      type: USER_COUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_COUNT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchUserCount() {
  yield takeLatest(USER_COUNT_REQUEST, userCount);
}

//////////////////////////////////////////////////////////////
export default function* dashboardSaga() {
  yield all([
    fork(watchUserCount),

    //
  ]);
}
