import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PICTURE_CREATE_FAILURE,
  PICTURE_CREATE_REQUEST,
  PICTURE_CREATE_SUCCESS,
  PICTURE_DELETE_FAILURE,
  PICTURE_DELETE_REQUEST,
  PICTURE_DELETE_SUCCESS,
  PICTURE_LIST_FAILURE,
  PICTURE_LIST_REQUEST,
  PICTURE_LIST_SUCCESS,
  PICTURE_UPDATE_FAILURE,
  PICTURE_UPDATE_REQUEST,
  PICTURE_UPDATE_SUCCESS,
} from "@/reducers/picture";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function pictureCreateAPI(data) {
  return await axios.post(`/api/picture/create`, data);
}

function* pictureCreate(action) {
  try {
    const result = yield call(pictureCreateAPI, action.data);
    yield put({
      type: PICTURE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PICTURE_CREATE_FAILURE,
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
async function pictureListAPI(data) {
  const { limit, offset, userId, userType } = data;

  const _userId = userId || "";
  const _userType = userType === 0 ? "" : userType;

  console.log(_userType);

  return await axios.get(
    `/adm/api/files?limit=${limit}&offset=${offset}&userid=${_userId}&userType=${_userType}`,
    {
      headers: {
        Authorization: "Bearer b",
        "X-HEADER-SESSION": "123",
      },
    }
  );
}

function* pictureList(action) {
  try {
    const result = yield call(pictureListAPI, action.data);
    yield put({
      type: PICTURE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PICTURE_LIST_FAILURE,
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
async function pictureUpdateAPI(data) {
  return await axios.post(`/api/picture/update`, data);
}

function* pictureUpdate(action) {
  try {
    const result = yield call(pictureUpdateAPI, action.data);
    yield put({
      type: PICTURE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PICTURE_UPDATE_FAILURE,
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
async function pictureDeleteAPI(data) {
  return await axios.post(`/admin/deletePhoto`, data, {
    headers: {
      Authorization: "Bearer dddd",
      "X-HEADER-SESSION": "X-HEADER-SESSION",
    },
  });
}

function* pictureDelete(action) {
  try {
    const result = yield call(pictureDeleteAPI, action.data);
    yield put({
      type: PICTURE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PICTURE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchPictureCreate() {
  yield takeLatest(PICTURE_CREATE_REQUEST, pictureCreate);
}

function* watchPictureList() {
  yield takeLatest(PICTURE_LIST_REQUEST, pictureList);
}

function* watchPictureUpdate() {
  yield takeLatest(PICTURE_UPDATE_REQUEST, pictureUpdate);
}

function* watchPictureDelete() {
  yield takeLatest(PICTURE_DELETE_REQUEST, pictureDelete);
}

//////////////////////////////////////////////////////////////
export default function* pictureSaga() {
  yield all([
    fork(watchPictureCreate),
    fork(watchPictureList),
    fork(watchPictureUpdate),
    fork(watchPictureDelete),

    //
  ]);
}
