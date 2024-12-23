import {
  NOTICE_LIST_FAILURE,
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
  NOTICE_PRE_LIST_FAILURE,
  NOTICE_PRE_LIST_REQUEST,
  NOTICE_PRE_LIST_SUCCESS,
  NOTICE_PRE_TOGGLE_FAILURE,
  NOTICE_PRE_TOGGLE_REQUEST,
  NOTICE_PRE_TOGGLE_SUCCESS,
  NOTICE_UPDATE_FAILURE,
  NOTICE_UPDATE_REQUEST,
  NOTICE_UPDATE_SUCCESS,
} from "@/reducers/notice";
import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticePreListAPI(data) {
  const { page } = data;
  return await axios.get(`/admin/thunder/announcements/premium?page=${page}`, {
    headers: {
      Authorization: "Bearer b",
      "X-HEADER-SESSION": "123",
    },
  });
}

function* noticePreList(action) {
  try {
    const result = yield call(noticePreListAPI, action.data);
    yield put({
      type: NOTICE_PRE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_PRE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeListAPI(data) {
  const { page } = data;

  return await axios.get(`/admin/thunder/announcements?page=${page}`, {
    headers: {
      Authorization: "Bearer b",
      "X-HEADER-SESSION": "123",
    },
  });
}

function* noticeList(action) {
  try {
    const result = yield call(noticeListAPI, action.data);
    yield put({
      type: NOTICE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticeUpdateAPI(data) {
  return await axios.post(`/api/notice/update`, data);
}

function* noticeUpdate(action) {
  try {
    const result = yield call(noticeUpdateAPI, action.data);
    yield put({
      type: NOTICE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function noticePreToggleAPI(data) {
  return await axios.post(
    `/thunder/announcements/togglePremium?id=${data.id}`,
    data,
    {
      headers: {
        Authorization: "Bearer b",
        "X-HEADER-SESSION": "123",
      },
    }
  );
}

function* noticePreToggle(action) {
  try {
    const result = yield call(noticePreToggleAPI, action.data);
    yield put({
      type: NOTICE_PRE_TOGGLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_PRE_TOGGLE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchNoticePreList() {
  yield takeLatest(NOTICE_PRE_LIST_REQUEST, noticePreList);
}

function* watchNoticeList() {
  yield takeLatest(NOTICE_LIST_REQUEST, noticeList);
}

function* watchNoticeUpdate() {
  yield takeLatest(NOTICE_UPDATE_REQUEST, noticeUpdate);
}

function* watchNoticePreToggle() {
  yield takeLatest(NOTICE_PRE_TOGGLE_REQUEST, noticePreToggle);
}

//////////////////////////////////////////////////////////////
export default function* noticeSaga() {
  yield all([
    fork(watchNoticePreList),
    fork(watchNoticeList),
    fork(watchNoticeUpdate),
    fork(watchNoticePreToggle),

    //
  ]);
}
