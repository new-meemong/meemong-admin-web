import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BANNER_CREATE_FAILURE,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAILURE,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_LIST_FAILURE,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_UPDATE_FAILURE,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  IMAGE_ADD_FAILURE,
  IMAGE_ADD_REQUEST,
  IMAGE_ADD_SUCCESS,
  IMAGE_DELETE_FAILURE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
} from "@/reducers/banner";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function bannerListAPI(data) {
  return await axios.get(`/admin/getBanners`, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* bannerList(action) {
  try {
    const result = yield call(bannerListAPI, action.data);
    yield put({
      type: BANNER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_LIST_FAILURE,
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
async function bannerCreateAPI(data) {
  return await axios.post(`/admin/addBanner`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* bannerCreate(action) {
  try {
    const result = yield call(bannerCreateAPI, action.data);
    yield put({
      type: BANNER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_CREATE_FAILURE,
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
async function bannerUpdateAPI(data) {
  return await axios.post(`/admin/editBanner`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* bannerUpdate(action) {
  try {
    const result = yield call(bannerUpdateAPI, action.data);
    yield put({
      type: BANNER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_UPDATE_FAILURE,
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
async function bannerDeleteAPI(data) {
  return await axios.post(`/admin/deleteBanner`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* bannerDelete(action) {
  try {
    const result = yield call(bannerDeleteAPI, action.data);
    yield put({
      type: BANNER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BANNER_DELETE_FAILURE,
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
async function imageAddAPI(data) {
  return await axios.post(`/admin/uploadBannerImage`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* imageAdd(action) {
  try {
    const result = yield call(imageAddAPI, action.data);
    yield put({
      type: IMAGE_ADD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IMAGE_ADD_FAILURE,
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
async function imageDeleteAPI(data) {
  return await axios.post(`/admin/deleteBannerImage`, data, {
    headers: {
      Authorization: "Bearer 222",
      "X-HEADER-SESSION": "234234234",
    },
  });
}

function* imageDelete(action) {
  try {
    const result = yield call(imageDeleteAPI, action.data);
    yield put({
      type: IMAGE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IMAGE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchBannerList() {
  yield takeLatest(BANNER_LIST_REQUEST, bannerList);
}
function* watchBannerCreate() {
  yield takeLatest(BANNER_CREATE_REQUEST, bannerCreate);
}
function* watchBannerUpdate() {
  yield takeLatest(BANNER_UPDATE_REQUEST, bannerUpdate);
}
function* watchBannerDelete() {
  yield takeLatest(BANNER_DELETE_REQUEST, bannerDelete);
}
function* watchImageAdd() {
  yield takeLatest(IMAGE_ADD_REQUEST, imageAdd);
}
function* watchImageDelete() {
  yield takeLatest(IMAGE_DELETE_REQUEST, imageDelete);
}

//////////////////////////////////////////////////////////////
export default function* bannerSaga() {
  yield all([
    fork(watchBannerList),
    fork(watchBannerCreate),
    fork(watchBannerUpdate),
    fork(watchBannerDelete),
    fork(watchImageAdd),
    fork(watchImageDelete),

    //
  ]);
}
